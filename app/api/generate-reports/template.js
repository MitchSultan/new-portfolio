export function generateHTMLTemplate(clientName, period, gscData) {
  // Aggregate metrics
  const totalClicks = gscData?.reduce((acc, row) => acc + row.clicks, 0) || 0;
  const totalImpressions = gscData?.reduce((acc, row) => acc + row.impressions, 0) || 0;
  const avgCtr = gscData?.length
    ? (gscData.reduce((acc, row) => acc + row.ctr, 0) / gscData.length * 100).toFixed(2)
    : 0;
  const avgPos = gscData?.length
    ? (gscData.reduce((acc, row) => acc + row.position, 0) / gscData.length).toFixed(1)
    : 0;

  // Generate table rows
  const tableRows = (gscData?.slice(0, 10) || []).map(row => `
    <tr class="border-b border-gray-200 hover:bg-gray-50">
      <td class="py-3 px-6 text-left whitespace-nowrap">
        <div class="flex items-center">
            <span class="font-medium text-gray-900">${row.keys.join(', ')}</span>
        </div>
      </td>
      <td class="py-3 px-6 text-right">
        <span>${row.clicks.toLocaleString()}</span>
      </td>
      <td class="py-3 px-6 text-right">
        <span>${row.impressions.toLocaleString()}</span>
      </td>
      <td class="py-3 px-6 text-right">
        <span>${row.position.toFixed(1)}</span>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO Report - ${clientName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: white; }
        @page { size: A4; margin: 0; }
        .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 40px; background: white; box-sizing: border-box; }
    </style>
</head>
<body class="text-gray-800 antialiased">
    <div class="page flex flex-col">
        <!-- Header -->
        <header class="border-b pb-6 mb-8 mt-4">
            <div class="flex justify-between items-end">
                <div>
                    <h1 class="text-4xl font-bold text-gray-900 tracking-tight">SEO Performance</h1>
                    <p class="text-xl text-gray-500 mt-2">Executive Summary</p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-semibold text-gray-800">${clientName}</p>
                    <p class="text-sm text-gray-500 mt-1">${period}</p>
                </div>
            </div>
        </header>

        <!-- Key Metrics -->
        <div class="mb-10">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">Key Metrics</h2>
            <div class="grid grid-cols-2 gap-6">
                <!-- Card 1 -->
                <div class="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Clicks</p>
                    <p class="text-4xl font-bold text-blue-600 mt-2">${totalClicks.toLocaleString()}</p>
                </div>
                <!-- Card 2 -->
                <div class="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Impressions</p>
                    <p class="text-4xl font-bold text-blue-600 mt-2">${totalImpressions.toLocaleString()}</p>
                </div>
                <!-- Card 3 -->
                <div class="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Average CTR</p>
                    <p class="text-4xl font-bold text-blue-600 mt-2">${avgCtr}%</p>
                </div>
                <!-- Card 4 -->
                <div class="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Average Position</p>
                    <p class="text-4xl font-bold text-blue-600 mt-2">${avgPos}</p>
                </div>
            </div>
        </div>

        <!-- Top Keywords -->
        <div class="flex-grow">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">Top Performing Keywords</h2>
            <div class="bg-white border rounded-lg shadow-sm overflow-hidden">
                <table class="min-w-full w-full table-auto">
                    <thead>
                        <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th class="py-3 px-6 text-left font-medium tracking-wider">Query</th>
                            <th class="py-3 px-6 text-right font-medium tracking-wider">Clicks</th>
                            <th class="py-3 px-6 text-right font-medium tracking-wider">Impressions</th>
                            <th class="py-3 px-6 text-right font-medium tracking-wider">Avg. Position</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700 text-sm">
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Footer -->
        <footer class="border-t pt-6 mt-12 text-center text-sm text-gray-400">
            <p>Generated automatically for ${clientName}</p>
        </footer>
    </div>
</body>
</html>
  `;
}
