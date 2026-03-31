import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import twilio from 'twilio';
import puppeteer from 'puppeteer';
import { generateHTMLTemplate } from './template';

// Initialize Supabase Admin Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Initialize Twilio Client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request) {
  try {
    // 1. Basic Authorization (Protect the endpoint)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Setup Google Auth
    let credentialsPayload = undefined;
    if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
      try {
        credentialsPayload = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
      } catch (e) {
        console.warn('Failed to parse GSC_SERVICE_ACCOUNT_JSON, falling back to GOOGLE_APPLICATION_CREDENTIALS');
      }
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentialsPayload,
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || undefined,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    
    const webmasters = google.webmasters({ version: 'v3', auth });

    // 3. Fetch all clients from Supabase
    const { data: clients, error: clientError } = await supabase
      .from('clients')
      .select('*');

    if (clientError) throw clientError;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const reportPeriod = `${currentMonth < 10 ? '0' : ''}${currentMonth}/${currentYear}`;
    
    // Set dates for GSC API (last 30 days)
    const endDate = now.toISOString().split('T')[0];
    const startDateDate = new Date();
    startDateDate.setDate(now.getDate() - 30);
    const startDate = startDateDate.toISOString().split('T')[0];

    const results = [];

    // Launch puppeteer based on environment
    let browser;
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      const chromium = require('@sparticuz/chromium');
      const puppeteerCore = require('puppeteer-core');
      
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } else {
      // Local fallback
      const localPuppeteer = require('puppeteer');
      browser = await localPuppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    // 4. Loop through clients and generate
    for (const client of clients) {
      try {
        console.log(`Processing report for ${client.name}...`);
        
        // --- A. Fetch GSC Data ---
        const gscRes = await webmasters.searchanalytics.query({
          siteUrl: client.gsc_property_url,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['query'],
            rowLimit: 10,
          },
        });
        const gscData = gscRes.data.rows || [];

        // --- B. Generate PDF using Puppeteer ---
        const htmlContent = generateHTMLTemplate(client.name, reportPeriod, gscData);
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });
        await page.close();

        // --- C. Upload to Supabase Storage ---
        const fileName = `${client.id}_${reportPeriod.replace('/', '-')}.pdf`;
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('client-reports')
          .upload(fileName, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true,
          });

        if (uploadErr) throw uploadErr;

        // Create Signed URL (valid for 30 days)
        const { data: signedUrlData, error: signedUrlErr } = await supabase.storage
          .from('client-reports')
          .createSignedUrl(fileName, 60 * 60 * 24 * 30);

        if (signedUrlErr) throw signedUrlErr;
        const pdfUrl = signedUrlData.signedUrl;

        // --- D. Update DB to get Report ID for branded link ---
        const { data: reportInsert, error: insertErr } = await supabase.from('reports').insert({
          client_id: client.id,
          report_period: reportPeriod,
          storage_url: pdfUrl,
          status: 'Generated', // Will update to Sent after Twilio
        }).select('id').single();

        if (insertErr) throw insertErr;

        // Branded URL (e.g. https://madebymitch.com/reports/uuid)
        const baseUrl = new URL(request.url).origin;
        const brandedUrl = `${baseUrl}/reports/${reportInsert.id}`;

        // --- E. Send via Twilio WhatsApp ---
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; 
        await twilioClient.messages.create({
          body: `Hi ${client.name},\n\nHere is your Monthly SEO Report for ${reportPeriod}. Our team is working hard to grow your traffic!\n\nView Report: ${brandedUrl}`,
          from: fromNumber,
          to: `whatsapp:${client.whatsapp_number}`,
        });

        // Update status to 'Sent' securely
        await supabase.from('reports').update({ status: 'Sent' }).eq('id', reportInsert.id);

        results.push({ clientId: client.id, status: 'Success' });
      } catch (err) {
        console.error(`Failed to process client ${client.id}:`, err);
        await supabase.from('reports').insert({
          client_id: client.id,
          report_period: reportPeriod,
          status: 'Failed',
          error_logs: err.message || JSON.stringify(err),
        });
        results.push({ clientId: client.id, status: 'Failed', error: err.message });
      }
    }

    await browser.close();

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Master Process Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Allow Vercel Cron Jobs (which use GET requests) to trigger the same logic
export const GET = POST;
