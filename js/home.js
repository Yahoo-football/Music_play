// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Find all music cards (in case you have multiple)
    const musicCards = document.querySelectorAll('.music-card');

    musicCards.forEach(card => {
        card.addEventListener('click', function() {
            // Change this if you need to pass song info, e.g., play.html?song=2
            window.location.href = 'play.html';
        });

        // Optional: change cursor to pointer so it feels clickable
        card.style.cursor = 'pointer';
    });
});

