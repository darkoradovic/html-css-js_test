window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");

  const scrollPosition = window.scrollY;

  if (scrollPosition > 86) {
    navbar.classList.add("sticky", "blur");
  } else {
    navbar.classList.remove("sticky", "blur");
  }
});

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const rotatingElements = document.querySelectorAll(".rotating-element");

function rotateElements() {
  rotatingElements.forEach((element) => {
    let currentRotation =
      parseFloat(
        element.style.transform.replace("rotate(", "").replace("deg)", "")
      ) || 0;
    currentRotation += 0.5;
    element.style.transform = `rotate(${currentRotation}deg)`;
  });

  requestAnimationFrame(rotateElements);
}

rotateElements();

document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade");

  fadeElements.forEach(function (element) {
    element.style.opacity = "1";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slideInElement = document.querySelector(".slide-in");

  function handleScroll() {
    const rect = slideInElement.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.75) {
      slideInElement.classList.add("slide-in-active");
      window.removeEventListener("scroll", handleScroll);
    }
  }

  window.addEventListener("scroll", handleScroll);

  handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  const slideInElement = document.querySelector(".hero-image");

  function handleScroll() {
    const rect = slideInElement.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.75) {
      slideInElement.classList.add("slide-in-left");
      window.removeEventListener("scroll", handleScroll);
    }
  }

  window.addEventListener("scroll", handleScroll);

  handleScroll();
});

function toggleSideMenu() {
  var sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.toggle('side-menu-open');
}
