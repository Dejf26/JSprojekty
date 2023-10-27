const slideButtons = document.querySelectorAll('.slideNav');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const pauseButton = document.querySelector('#pause');
const playButton = document.querySelector('#play');
const sliderContainer = document.querySelector('#slider-wrapper');
const slides = document.querySelectorAll('.slide');
let currentSlideIndex = 1;
let slideWidth = 600;
let translateXValue = 0;
let isPaused = false;
let interval;



function startSlider() {
    interval = setInterval(() => {
        switch (isPaused) {
            case false:
                nextButton.click();
                break;
        }
    }, 2000);
}

startSlider();

function slideTo(slideIndex) {
    const targetTranslateX = -slideWidth * (slideIndex - 1);
    sliderContainer.style.transform = `translateX(${targetTranslateX}px)`;
    translateXValue = targetTranslateX;
    console.log(translateXValue);
    currentSlideIndex = slideIndex;
}

function handleButtonClick(event) {
    switch (event.target.id) {
        case "play":
            isPaused = false;
            break;
        case "pause":
            isPaused = true;
            break;
        case "prev":
            if (currentSlideIndex > 1) {
                if (!isPaused) {
                    clearInterval(interval);
                }
                slideTo(currentSlideIndex - 1);
                if (!isPaused) {
                    startSlider();
                }
            }
            break;
        case "next":
            if (currentSlideIndex < 5) {
                if (!isPaused) {
                    clearInterval(interval);
                }
                slideTo(currentSlideIndex + 1);
                if (!isPaused) {
                    startSlider();
                }
            } else if (currentSlideIndex === 5) {
                slideTo(1);
            }
            break;
        default:
            if (event.target.id.startsWith("slide")) {
                const slideIndex = parseInt(event.target.id.replace("slide", ""), 10);
                slideTo(slideIndex);
            }
    }
}

slideButtons.forEach((button) => {
    button.onclick = handleButtonClick;
});





function highlightActiveButton(index) {

    slideButtons.forEach((button) => {
      button.classList.remove('active');
    });

    if (index !== 0 && index !== slideButtons.length - 1) {
        slideButtons[index].classList.add('active');
      }
    
    }

    let currentSlide = 1;


highlightActiveButton(currentSlide);

function changeSlide(newIndex) {

  slides[newIndex].classList.add('active');
  slides[currentSlide].classList.remove('active');
  highlightActiveButton(newIndex);

  currentSlide = newIndex;
}




document.querySelector('#next').addEventListener('click', () => {
  const newIndex = (currentSlide + 1) % slides.length;
  changeSlide(newIndex);
});

document.querySelector('#prev').addEventListener('click', () => {
  const newIndex = (currentSlide - 1 + slides.length) % slides.length;
  changeSlide(newIndex);
});

slideButtons.forEach((button, index) => {
  if (index !== 0 && index !== slideButtons.length - 1) {
    button.addEventListener('click', () => {
      changeSlide(index);
    });
  }
});