const apiToken = "YOUR_API_TOKEN"; // Replace with your Aviasales API token

// Search Flights Function
function searchFlights() {
    let origin = document.getElementById("origin").value.toUpperCase();
    let destination = document.getElementById("destination").value.toUpperCase();

    if (origin === "" || destination === "") {
        alert("Please enter both Origin and Destination airport codes.");
        return;
    }

    let url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${destination}&token=${apiToken}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let flights = data.data[destination];
        let flightList = document.createElement("div");
        flightList.innerHTML = "<h3>Available Flights</h3>";
        
        if (flights) {
            Object.keys(flights).forEach(key => {
                let flight = flights[key];
                let flightItem = document.createElement("p");
                flightItem.innerHTML = `<strong>Price: ₹${flight.price}</strong> - Airline: ${flight.airline}`;
                flightList.appendChild(flightItem);
            });
        } else {
            flightList.innerHTML += "<p>No flights found.</p>";
        }

        document.body.appendChild(flightList);
    })
    .catch(error => console.error("Error fetching flight data:", error));
}

// Booking Button Alert
function bookNow() {
    alert("Booking Coming Soon!");
}

// Sticky Header on Scroll
window.addEventListener("scroll", function() {
    let header = document.getElementById("main-header");
    if (window.scrollY > 50) {
        header.style.background = "#a83228";
    } else {
        header.style.background = "#ff0000";
    }
});
