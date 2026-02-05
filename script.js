document.querySelectorAll('.carousel').forEach(carousel => {
    const items = carousel.querySelectorAll('.item');
    const videos = carousel.querySelectorAll('video');

    let angle = 0;
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;

    const itemCount = items.length;
    const rotateStep = 360 / itemCount;
    const radius = 400;

    // Position items
    items.forEach((item, index) => {
        item.style.transform = `
      rotateY(${index * rotateStep}deg)
      translateZ(${radius}px)
    `;
    });

    function startDrag(e) {
        isDragging = true;
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        carousel.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;

        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const deltaX = x - startX;

        angle = currentRotation + deltaX * 0.3;
        carousel.style.transform = `rotateY(${angle}deg)`;
    }

    function endDrag() {
        if (!isDragging) return;

        isDragging = false;
        currentRotation = angle;
        carousel.style.transition = 'transform 0.5s ease-out';
    }

    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('touchstart', startDrag);

    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    // Video visibility logic (per carousel)
    function updateVideos() {
        videos.forEach(video => {
            const rect = video.getBoundingClientRect();
            const center = window.innerWidth / 2;
            const visible =
                Math.abs(rect.left + rect.width / 2 - center) < 150;

            visible ? video.play() : video.pause();
        });
    }

    setInterval(updateVideos, 300);

    carousel.addEventListener('dragstart', e => e.preventDefault());
});
