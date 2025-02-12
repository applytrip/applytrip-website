// API Keys
const AVIA_SALES_API_KEY = '774c580b39b6f5503afcbf57f2249aa2'; // TravelPayouts (Aviasales)
const VIATOR_API_KEY = '7540f4c2-cc22-4ce1-87d2-6d34585ceda8'; // Viator API
const HOTEL_LOOK_API_KEY = '774c580b39b6f5503afcbf57f2249aa2'; // Hotellook API
const BUS_BUD_API_KEY = 'your_busbud_api_key'; // Replace with your Busbud API key

// Function to convert dd-mm-yyyy to yyyy-MM-dd
function formatDate(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // Converts dd-mm-yyyy to yyyy-MM-dd
    }
    return dateStr; // Return as is if already formatted correctly
}

// Flight Search (Aviasales API)
document.getElementById('flight-search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('flight-from').value;
    const to = document.getElementById('flight-to').value;
    const departure = formatDate(document.getElementById('flight-departure').value); // Ensure correct date format

    const url = `https://api.travelpayouts.com/v2/prices/latest?currency=usd&origin=${from}&destination=${to}&depart_date=${departure}&token=${AVIA_SALES_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('flight-results').innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching flight data:', error);
    }
});

// Hotel Search (Hotellook API)
document.getElementById('hotel-search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('hotel-location').value;
    let checkin = formatDate(document.getElementById('hotel-checkin').value);
    let checkout = formatDate(document.getElementById('hotel-checkout').value);

    const url = `https://engine.hotellook.com/api/v2/cache.json?location=${location}&checkIn=${checkin}&checkOut=${checkout}&token=${HOTEL_LOOK_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('hotel-results').innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching hotel data:', error);
    }
});

// Tour Search (Viator API)
document.getElementById('tour-search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('tour-location').value;

    const url = `https://api.viator.com/partner/products?destination=${location}&apiKey=${VIATOR_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('tour-results').innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching tour data:', error);
    }
});

// Bus Search (Busbud API)
document.getElementById('bus-search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('bus-from').value;
    const to = document.getElementById('bus-to').value;
    const date = formatDate(document.getElementById('bus-date').value); // Ensure correct date format

    const url = `https://napi.busbud.com/x-departures/${from}/${to}/${date}?adult=1&child=0&senior=0&lang=en&currency=USD`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': BUS_BUD_API_KEY
            }
        });
        const data = await response.json();
        document.getElementById('bus-results').innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching bus data:', error);
    }
});
