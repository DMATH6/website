document.querySelectorAll('.carousel').forEach(carousel => {
    const items = carousel.querySelectorAll('.item');
    const videos = carousel.querySelectorAll('video');

    let angle = 0;
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;

    const itemCount = items.length;
    const rotateStep = 360 / itemCount;

    // Dynamically set radius based on screen width
    let radius = window.innerWidth < 768 ? 150 : 400;

    // Recalculate radius on resize
    window.addEventListener('resize', () => {
        radius = window.innerWidth < 768 ? 150 : 400;
        items.forEach((item, index) => {
            item.style.transform = `
              rotateY(${index * rotateStep}deg)
              translateZ(${radius}px)
            `;
        });
    });

    // Position items
    items.forEach((item, index) => {
        item.style.transform = `
          rotateY(${index * rotateStep}deg)
          translateZ(${radius}px)
        `;
    });

    function startDrag(e) {
        isDragging = true;
        startX = e.clientX || e.touches?.[0].clientX;
        carousel.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches?.[0].clientX;
        const deltaX = clientX - startX;
        angle = currentRotation + deltaX * 0.3;
        carousel.style.transform = `rotateY(${angle}deg)`;
    }

    function endDrag() {
        isDragging = false;
        currentRotation = angle;
        carousel.style.transition = 'transform 0.5s ease-out';
    }

    // Event listeners for both mouse and touch
    carousel.addEventListener('pointerdown', startDrag);
    carousel.addEventListener('pointermove', drag);
    carousel.addEventListener('pointerup', endDrag);
    carousel.addEventListener('pointercancel', endDrag);
    carousel.addEventListener('touchstart', startDrag);
    carousel.addEventListener('touchmove', drag);
    carousel.addEventListener('touchend', endDrag);

    // Video visibility on mobile/desktop
    function updateVideos() {
        videos.forEach(video => {
            const rect = video.getBoundingClientRect();
            const center = window.innerWidth / 2;
            const visible = Math.abs(rect.left + rect.width / 2 - center) < 150;
            visible ? video.play() : video.pause();
        });
    }
    setInterval(updateVideos, 300);

    carousel.addEventListener('dragstart', e => e.preventDefault());
});