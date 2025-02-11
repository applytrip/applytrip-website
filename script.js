const API_KEY = "76128de6-9ad3-4c21-bc64-f4dc359b11c"; // Your Viator Production API Key

async function searchTours() {
    const destination = document.getElementById("destination").value;
    
    if (!destination) {
        alert("Please enter a destination.");
        return;
    }

    const apiUrl = `https://api.viator.com/partner/v1/search?query=${destination}&topX=10`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "exp-api-key": API_KEY, // Viator API authentication
            },
        });

        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            displayTours(data.data);
        } else {
            document.getElementById("tour-results").innerHTML = "<p>No tours found.</p>";
        }
    } catch (error) {
        console.error("Error fetching tours:", error);
        alert("Failed to fetch tour data. Please try again later.");
    }
}

function displayTours(tours) {
    let resultsHtml = "<h3>Available Tours</h3><ul>";
    tours.forEach(tour => {
        resultsHtml += `
            <li>
                <strong>${tour.title}</strong>  
                <br>Price: ${tour.price.formatted}
                <br><a href="${tour.bookingURL}" target="_blank">Book Now</a>
            </li>
        `;
    });
    resultsHtml += "</ul>";
    document.getElementById("tour-results").innerHTML = resultsHtml;
}
