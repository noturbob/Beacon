// Initialize Google Map
function initializeMap() {
    const mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 }, // Initial map center (e.g., San Francisco)
        zoom: 12, // Initial zoom level
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Create markers for each bus
    const busMarkers = busData.map(bus => {
        return new google.maps.Marker({
            position: { lat: bus.lat, lng: bus.lng },
            map: map, // Use 'map' here instead of 'map'
            title: bus.name,
        });
    });

    // Simulate bus movement
    setInterval(() => {
        busMarkers.forEach(marker => {
            // Simulate random movement within the city
            const latChange = (Math.random() - 0.5) * 0.02; // Fix the random latitude change formula
            const lngChange = (Math.random() - 0.5) * 0.02; // Fix the random longitude change formula
            const newPosition = new google.maps.LatLng(
                marker.getPosition().lat() + latChange,
                marker.getPosition().lng() + lngChange
            );
            marker.setPosition(newPosition);

            // Update bus status on the page (for demonstration purposes)
            const busElement = document.querySelector(`#bus-${marker.getTitle()}`); // Use getTitle() instead of 'title'
            if (busElement) { // Check if the busElement is found
                busElement.querySelector('.bus-status').textContent = `Status: Moving`;
            }
        });
    }, 5000); // Update every 5 seconds (for demonstration purposes)
}

// Load Google Maps API
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAirLpp05OKI8HND1H_FNWcTnP8y5j66cQ&callback=initializeMap'; // Replace with your Google Maps API key
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

// Ensure that the Google Maps API is loaded before initializing the map
window.addEventListener('load', loadGoogleMapsScript);

// JavaScript to show/hide the Settings drawer on hover
const settingsLink = document.getElementById('settings-link');
const settingsDrawer = document.getElementById('settings-drawer');

settingsLink.addEventListener('mouseenter', function () {
    settingsDrawer.classList.add('open');
});

settingsDrawer.addEventListener('mouseleave', function () {
    settingsDrawer.classList.remove('open');
});

// Redirect to the dashboard or desired page (this line is fine)
// window.location.href = "main.html"; // Change "dashboard.html" to the actual destination URL
