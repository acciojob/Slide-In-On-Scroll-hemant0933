// Your JS code here.

  // select all images to add the active class to
  const images = document.querySelectorAll('.slide-in');
  
  // debounce function to limit the number of scroll events processed
  function debounce(func, wait = 2, immediate = true) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  // function to add the active class when the image is scrolled to
  function slideIn() {
    images.forEach(image => {
      // get the distance from the top of the image to the top of the viewport
      const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
      // get the bottom of the image
      const imageBottom = image.offsetTop + image.height;
      // check if the image should have the active class added
      const isHalfShown = slideInAt > image.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      if (isHalfShown && isNotScrolledPast) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }
  
  // add event listener and pass the slideIn function to the debounce function
  window.addEventListener('scroll', debounce(slideIn));

