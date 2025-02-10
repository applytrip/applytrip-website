const API_TOKEN = "774c580b39b6f5503afcbf57f2249aa2"; // Your API token
const PARTNER_ID = "604751"; // Your Partner ID

async function searchFlights() {
    const origin = document.getElementById("origin").value.toUpperCase();
    const destination = document.getElementById("destination").value.toUpperCase();
    const departureDate = document.getElementById("departure").value;

    if (!origin || !destination || !departureDate) {
        alert("Please fill in all fields.");
        return;
    }

    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_at=${departureDate}&token=${API_TOKEN}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            displayFlights(data.data);
        } else {
            document.getElementById("flight-results").innerHTML = "<p>No flights found.</p>";
        }
    } catch (error) {
        console.error("Error fetching flight data:", error);
        alert("Failed to fetch flight data. Please try again later.");
    }
}

function displayFlights(flights) {
    let resultsHtml = "<h3>Available Flights</h3><ul>";
    flights.forEach(flight => {
        resultsHtml += `
            <li>
                Flight: ${flight.origin} → ${flight.destination} | 
                Price: ${flight.price} USD | 
                Date: ${flight.departure_at} |
                <a href="https://www.aviasales.com/${flight.origin}${flight.destination}${flight.departure_at.replace(/-/g, "")}?marker=${PARTNER_ID}" target="_blank">
                    Book Now
                </a>
            </li>`;
    });
    resultsHtml += "</ul>";
    document.getElementById("flight-results").innerHTML = resultsHtml;
}
