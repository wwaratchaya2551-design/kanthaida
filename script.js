(() => {
  const carousel = document.querySelector('.slideshow');
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.dots');
  const counter = carousel.querySelector('.slide-count');
  const previous = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  let current = 0;
  let timer;

  const dots = slides.map((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', `ไปยังภาพที่ ${index + 1}`);
    dot.addEventListener('click', () => { showSlide(index); restart(); });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    counter.textContent = `${current + 1} / ${slides.length}`;
  }
  function stop() { clearInterval(timer); }
  function start() { stop(); timer = setInterval(() => showSlide(current + 1), 4000); }
  function restart() { start(); }

  previous.addEventListener('click', () => { showSlide(current - 1); restart(); });
  next.addEventListener('click', () => { showSlide(current + 1); restart(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  showSlide(0);
  start();
})();
