const carouselInner = document.querySelector('.carousel-inner');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

const updateCarousel = () => {
  const width = carouselInner.clientWidth;
  carouselInner.style.transform = `translateX(-${currentIndex * width}px)`;
};

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : 3;
  updateCarousel();
});
``
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < 3) ? currentIndex + 1 : 0;
  updateCarousel();
});
