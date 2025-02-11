const API_TOKEN = "774c580b39b6f5503afcbf57f2249aa2"; // Travelpayouts API Token

async function searchFlights() {
    const origin = document.getElementById("origin").value.toUpperCase();
    const destination = document.getElementById("destination").value.toUpperCase();
    const departureDate = document.getElementById("departure").value;

    if (!origin || !destination || !departureDate) {
        alert("Please fill in all fields.");
        return;
    }

    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_at=${departureDate}&currency=USD&token=${API_TOKEN}`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            displayFlights(data.data);
        } else {
            document.getElementById("flight-results").innerHTML = "<p>No flights found.</p>";
        }
    } catch (error) {
        console.error("Error fetching flight data:", error);
        alert("Failed to fetch flight data. Please check your API key and try again later.");
    }
}

function displayFlights(flights) {
    let resultsHtml = "<h3>Available Flights</h3><ul>";
    flights.forEach(flight => {
        resultsHtml += `
            <li>
                <strong>${flight.origin} → ${flight.destination}</strong>  
                <br>Price: ${flight.price} USD
                <br>Departure: ${new Date(flight.departure_at).toLocaleString()}
            </li>
        `;
    });
    resultsHtml += "</ul>";
    document.getElementById("flight-results").innerHTML = resultsHtml;
}
