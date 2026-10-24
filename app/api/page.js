import Image from 'next/image';

export const dynamic = 'force-dynamic';

async function getDrivers() {
  try {
    const driversResponse = await fetch(
      'https://api.openf1.org/v1/drivers?session_key=latest'
    );
    if (!driversResponse.ok) {
      throw new Error(`Drivers fetch failed: ${driversResponse.status}`);
    }
    const drivers = await driversResponse.json();

    if (!Array.isArray(drivers)) {
      throw new Error('Drivers response was not a list.');
    }

    return drivers.map((driver) => ({
      ...driver,
      image_url: driver.headshot_url || null,
    }));
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return [];
  }
}

export default async function Page() {
  const drivers = await getDrivers();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {new Date().getFullYear()} F1 Drivers
      </h1>
      
      {drivers.length === 0 ? (
        <p className="text-center">No drivers found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {drivers.map((driver) => (
            <div
              key={driver.driver_number}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {driver.image_url ? (
                <div className="relative h-64 mb-4">
                  <Image
                    src={driver.image_url}
                    alt={`${driver.full_name}`}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-64 bg-gray-200 rounded-t-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
              
              <h2 className="text-xl font-bold mb-2">{driver.full_name}</h2>
              <p className="text-gray-600 mb-1">
                Team: {driver.team_name || 'Unknown'}
              </p>
              <p className="text-gray-600">Number: {driver.driver_number}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}