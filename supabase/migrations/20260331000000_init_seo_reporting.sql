-- Enable pg_cron for scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 1. Create the clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  site_url TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  gsc_property_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create the reports table
CREATE TYPE report_status AS ENUM ('Generated', 'Sent', 'Failed');

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  report_period TEXT NOT NULL, -- e.g., "03/2026"
  storage_url TEXT,
  status report_status DEFAULT 'Generated',
  error_logs TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying client reports quickly
CREATE INDEX idx_reports_client_id ON reports(client_id);

-- 3. Create the Storage Bucket for PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-reports', 'client-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Enable read access for authenticated users to client-reports"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'client-reports');

CREATE POLICY "Enable insert access for service role to client-reports"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'client-reports');
