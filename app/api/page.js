import Image from 'next/image';

async function getDrivers() {
  const currentYear = new Date().getFullYear();
  
  try {
    // Get drivers list
    const driversResponse = await fetch(
      `https://api.openf1.org/v1/drivers?year=2023
      // `
    );
    const drivers = await driversResponse.json();

    // Get latest session key for driver images
    const sessionsResponse = await fetch(
      `https://api.openf1.org/v1/sessions?year=${currentYear}&order=date_desc&page=1`
    );
    const [latestSession] = await sessionsResponse.json();

    // Add image URLs to drivers
    const driversWithImages = await Promise.all(
      drivers.map(async (driver) => {
        try {
          const imageResponse = await fetch(
            `https://api.openf1.org/v1/images?driver_number=${driver.driver_number}&session_key=${latestSession.session_key}`
          );
          const [imageData] = await imageResponse.json();
          
          return {
            ...driver,
            image_url: imageData?.url || null,
          };
        } catch (error) {
          return {
            ...driver,
            image_url: null,
          };
        }
      })
    );

    return driversWithImages;
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