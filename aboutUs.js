var slideIndex = localStorage.getItem('number');
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
    makeTimer();
}

function minusSlide() {
    showSlides(slideIndex -= 1);
    makeTimer();  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    localStorage.setItem('number',n)
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

 var timer = 0;
 makeTimer(); 
 function makeTimer(){
    clearInterval(timer)
    timer = setInterval(function(){
      slideIndex++;
      showSlides(slideIndex);
    },7000);
  }

