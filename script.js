// API Keys
const AVIA_SALES_API_KEY = '774c580b39b6f5503afcbf57f2249aa2';
const VIATOR_API_KEY = '7540f4c2-cc22-4ce1-87d2-6d34585ceda8';

// Flight Search (Aviasales API)
document.getElementById('flight-search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('flight-from').value;
    const to = document.getElementById('flight-to').value;
    const departure = document.getElementById('flight-departure').value;

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
    const checkin = document.getElementById('hotel-checkin').value;
    const checkout = document.getElementById('hotel-checkout').value;

    const url = `https://engine.hotellook.com/api/v2/cache.json?location=${location}&checkIn=${checkin}&checkOut=${checkout}&token=${AVIA_SALES_API_KEY}`;

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