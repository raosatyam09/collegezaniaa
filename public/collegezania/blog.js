

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    const totalStories = document.querySelectorAll(".story").length;
    const intervalTime = 3000; // Change slides every 3 seconds

    function updateCarousel() {
        const translateValue = -currentIndex * 100 + "%";
        carousel.style.transform = `translateX(${translateValue})`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle("active-dot", index === currentIndex);
        });
    }

    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % totalStories;
        updateCarousel();
    }

    let autoSlide = setInterval(goToNextSlide, intervalTime);

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();

            // Restart auto-slide timer when user clicks
            clearInterval(autoSlide);
            autoSlide = setInterval(goToNextSlide, intervalTime);
        });
    });

    updateCarousel(); // Initialize carousel position
});
