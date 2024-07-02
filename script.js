document.addEventListener('DOMContentLoaded', (event) => {
    // Toggle visibility of section content
    const sections = document.querySelectorAll('section h2');
    sections.forEach(section => {
        section.addEventListener('click', () => {
            section.nextElementSibling.classList.toggle('hidden');
        });
    });

    // Add event listeners to dropdown links for fetching Wikipedia info
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const query = link.getAttribute('data-query');
            const infoContainer = link.closest('section').querySelector('.info');
            fetchWikipediaInfo(query, infoContainer);
        });
    });

    // Placeholder for map initialization code
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer) {
        mapContainer.innerHTML = '<p>Map integration coming soon...</p>';
    }
});

function fetchWikipediaInfo(query, container) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.extract}</p>
                <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
            `;
        })
        .catch(error => {
            console.error('Error fetching Wikipedia data:', error);
            container.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
        });
}