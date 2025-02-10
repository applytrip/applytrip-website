const apiToken = "774c580b39b6f5503afcbf57f2249aa2"; // Your Aviasales API Token

function searchFlights() {
    let origin = document.getElementById("origin").value.toUpperCase();
    let destination = document.getElementById("destination").value.toUpperCase();

    if (origin === "" || destination === "") {
        alert("Please enter both Origin and Destination airport codes.");
        return;
    }

    let url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${destination}&currency=INR&token=${apiToken}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let flights = data.data[destination];
            let flightList = document.getElementById("flight-results");
            flightList.innerHTML = "<h3>Available Flights</h3>"; // Clear previous results

            if (flights) {
                Object.keys(flights).forEach(key => {
                    let flight = flights[key];
                    let flightItem = document.createElement("p");
                    flightItem.innerHTML = `<strong>Price: ₹${flight.price}</strong> - Airline: ${flight.airline}`;
                    flightList.appendChild(flightItem);
                });
            } else {
                flightList.innerHTML = "<p>No flights found for this route.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching flight data:", error);
            alert("Failed to fetch flight data. Please try again later.");
        });
}
