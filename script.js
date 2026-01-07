

let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

// Optional: Auto-slide every 5 seconds
setInterval(() => changeSlide(1), 5000);

        function web_link_gamma() {
            window.location.href = 'gammamain.html';
        }