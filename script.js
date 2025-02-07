// Booking button alert
function bookNow() {
    alert("Booking Coming Soon!");
}

// Sticky Header on Scroll
window.addEventListener("scroll", function() {
    let header = document.getElementById("main-header");
    if (window.scrollY > 50) {
        header.style.background = "#a83228";
    } else {
        header.style.background = "#c0392b";
    }
});
