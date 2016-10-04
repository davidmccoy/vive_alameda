////
// Functions to create, read, and delete cookies
////
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  }
  else var expires = "";

  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}
////
// Top image slideshow
////

var autoSlideIndex = 0;
var autoSlidesList;

function autoSlides() {
    var i;
    if (autoSlidesList !== undefined) {
      for (i = 0; i < autoSlidesList.length; i++) {
        autoSlidesList[i].classList.remove('active');
      }
      autoSlideIndex++;
      if (autoSlideIndex> autoSlidesList.length) {
        autoSlideIndex = 1;
      }
      autoSlidesList[autoSlideIndex-1].classList.add('active');
      setTimeout(autoSlides, 5000); // Change image every 2 seconds
    }
}

////
// Fact and event slideshows
////
var factSlideIndex = 1;
var eventsSlideIndex = 1;
var slides;
var factsSlides;
var eventsSlides;

function plusSlides(n, slideshow) {
  if (slideshow === "facts") {
    showSlides(factSlideIndex += n, slideshow);
  } else if (slideshow === "events") {
    showSlides(eventsSlideIndex += n, slideshow);
  }
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n, slideshow) {
  var i;
  if (slideshow === "facts") {
    if (factsSlides !== undefined) {
      if (n > factsSlides.length) {
        factSlideIndex = 1;
      } else if (n < 1) {
        factSlideIndex = factsSlides.length;
      }

      for (i = 0; i < factsSlides.length; i++) {
        factsSlides[i].classList.remove('active');
      }
      factsSlides[factSlideIndex-1].classList.add('active');
    }
  } else if (slideshow === "events") {
    if (eventsSlides !== undefined) {
      if (n > eventsSlides.length) {
        eventsSlideIndex = 1;
      } else if (n < 1) {
        eventsSlideIndex = eventsSlides.length;
      }

      for (i = 0; i < eventsSlides.length; i++) {
        eventsSlides[i].classList.remove('active');
      }
      eventsSlides[eventsSlideIndex-1].classList.add('active');
    }
  }

}

window.onload = function() {


  ////
  // Show and hide the menu
  ////

  var menu = document.getElementById('nav');
  var body = document.body

  menu.addEventListener('click', function(e) {
    e.stopPropagation();
    if (menu.classList.contains('visible')) {
      menu.classList.remove('visible');
    } else {
      menu.classList.add('visible');
    }
  })

  body.addEventListener('click', function(e) {
    e.stopPropagation();
    if (menu.classList.contains('visible')) {
      menu.classList.remove('visible');
    }
  })
  ////
  // Show and hide items based on language options
  ////

  var spans = document.getElementsByClassName('language-option');
  var englishText = document.getElementsByClassName('english');
  var espanolText = document.getElementsByClassName('espanol');

  // read language cookie to set language
  if (readCookie("language") === "english") {
    document.getElementById('english').classList.add('active');
    document.getElementById('espanol').classList.remove('active');
    // set all english text to active, remove active from all espanol text
    for(i = 0; i < espanolText.length; i++) {
      espanolText[i].classList.remove('active');
    }
    for(i = 0; i < englishText.length; i++) {
      englishText[i].classList.add('active');
    }
  }

  // language click event
  var languageClickEvent = function() {
    if (!this.classList.contains('active') && this.id === "espanol") {
      // set espanol button to active, remove active from english button
      this.classList.add('active');
      document.getElementById('english').classList.remove('active');

      // set all espanol text to active, remove active from all english text
      for(i = 0; i < englishText.length; i++) {
        englishText[i].classList.remove('active');
      }
      for(i = 0; i < espanolText.length; i++) {
        espanolText[i].classList.add('active');
      }

      // set the language cookie
      createCookie("language", "espanol", 30);
    } else if (!this.classList.contains('active') && this.id === "english") {
      // set english button to active, remove active from espanol button
      this.classList.add('active');
      document.getElementById('espanol').classList.remove('active');

      // set all english text to active, remove active from all espanol text
      for(i = 0; i < espanolText.length; i++) {
        espanolText[i].classList.remove('active');
      }
      for(i = 0; i < englishText.length; i++) {
        englishText[i].classList.add('active');
      }
      // set the language cookie
      createCookie("language", "english", 30);
    }
  }
  for(i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', languageClickEvent);
  }

  // Set number of fact, event, and photo slides
  factsSlides = document.getElementsByClassName("content fact");
  eventsSlides = document.getElementsByClassName("content event");
  autoSlidesList = document.getElementsByClassName("info-background");

  autoSlides();

}
