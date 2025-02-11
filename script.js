
const FLIGHT_API_KEY = "774c580b39b6f5503afcbf57f2249aa2"; // Travelpayouts API Token
const TOUR_API_KEY = "76128de6-9ad3-4c21-bc64-f4dc359b111c"; // Viator API Key

// Function to search flights
async function searchFlights() {
    const origin = document.getElementById("origin").value.toUpperCase();
    const destination = document.getElementById("destination").value.toUpperCase();
    const departureDate = document.getElementById("departure").value;

    if (!origin || !destination || !departureDate) {
        alert("Please fill in all fields.");
        return;
    }

    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_at=${departureDate}&currency=USD&token=${FLIGHT_API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API request failed: ${response.status} ${response.statusText}`);

        const data = await response.json();
        if (data.data && data.data.length > 0) {
            displayFlights(data.data);
        } else {
            document.getElementById("flight-results").innerHTML = "<p>No flights found.</p>";
        }
    } catch (error) {
        console.error("Error fetching flight data:", error);
        document.getElementById("flight-results").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

// Function to display flight results
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

// Function to search tours
async function searchTours() {
    const destination = document.getElementById("tour-destination").value.trim();
    if (!destination) {
        alert("Please enter a destination.");
        return;
    }

    const apiUrl = `https://api.viator.com/partner/v1/tours/search?query=${encodeURIComponent(destination)}&topX=10`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "exp-api-key": TOUR_API_KEY
            }
        });

        if (!response.ok) throw new Error(`API request failed: ${response.status} ${response.statusText}`);

        const data = await response.json();
        if (data.data && data.data.length > 0) {
            displayTours(data.data);
        } else {
            document.getElementById("tour-results").innerHTML = "<p>No tours found.</p>";
        }
    } catch (error) {
        console.error("Error fetching tours:", error);
        document.getElementById("tour-results").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}
