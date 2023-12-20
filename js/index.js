let sidebar = document.querySelector(".sidebar"),
  navbarBtn = document.querySelector(".navbar-btn"),
  moon = document.querySelector(".moon"),
  header = document.querySelector("header"),
  filterInput = document.querySelector(".filter input"),
  question = document.querySelector(".questions").querySelectorAll("li"),
  answerHeight = [];

window.addEventListener("DOMContentLoaded", () => {
  $(".overlay").fadeOut(100, function () {
    $(".overlay").remove();
  });

  $('[data-toggle="tooltip"]').tooltip();
});

/* sidebar */
navbarBtn.addEventListener("click", () => {
  document.querySelector(".sidebar").classList.forEach((className) => {
    if (className == "active") {
      sidebar.style.marginRight = -250 + "px";
      navbarBtn.style.transform = "translate(0%, 0%) rotate(0deg)";
      sidebar.classList.remove("active");
    } else {
      sidebar.style.marginRight = 0;
      navbarBtn.style.transform = "translate(-50%, 0%) rotate(-90deg)";
      sidebar.classList.add("active");
    }
  });
});

document.addEventListener("click", (e) => {
  if (
    !sidebar.contains(e.target) &&
    !navbarBtn.contains(e.target) &&
    sidebar.classList.contains("active")
  ) {
    navbarBtn.click();
  }
});

filterInput.addEventListener("input", (e) => {
  document.querySelectorAll(".sidebar ul li").forEach((element) => {
    if (
      element.innerText.toLowerCase().includes(e.target.value.toLowerCase())
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

moon.addEventListener("mouseenter", (e) => {
  if (moon.style.top == "15%") {
    moon.style.top = 5 + "%";
  } else {
    moon.style.top = 15 + "%";
  }
});

document.body.addEventListener("wheel", (e1) => {
  if (scrollY > 1000 && e1.deltaY == "-100") {
    header.style.position = "fixed";
    header.style.top = 0;
    header.style.width = "100%";
    header.style.backgroundColor = "white";
    header.querySelectorAll("li").forEach((e2) => {
      e2.classList.replace("text-white", "text-dark");
    });
    header
      .querySelector(".navbar-btn")
      .classList.replace("text-white", "text-dark");
    header.querySelector("img").src = "./images/logo-main-black.png";
  } else {
    header.style.position = "relative";
    header.style.backgroundColor = "";
    header.querySelectorAll("li").forEach((e2) => {
      e2.classList.replace("text-dark", "text-white");
    });
    header
      .querySelector(".navbar-btn")
      .classList.replace("text-dark", "text-white");
    header.querySelector("img").src = "./images/logo-main-white.png";
  }
});

new WOW().init();

new Swiper(".swiper", {
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

question.forEach((e) => {
  answerHeight.push(e.querySelector(".answer").offsetHeight);
});

question.forEach((e) => {
  e.querySelector(".answer").style.height = 0 + "px";
  e.querySelector(".answer").querySelector("p").style.fontSize = 0 + "px";
  e.addEventListener("click", (e1) => {
    if (e1.currentTarget.classList.contains("active")) {
      e1.currentTarget.classList.remove("active");
      e1.currentTarget.querySelector(".answer").style.height = 0 + "px";
      e1.currentTarget.querySelector(".answer").querySelector("p").style.fontSize = 0 + "px";
    } else {
      question.forEach((e2) => {
        e2.classList.remove("active");
        e2.querySelector(".answer").style.height = 0 + "px";
        e2.querySelector(".answer").querySelector("p").style.fontSize = 0 + "px";
      });
      e1.currentTarget.classList.add("active");
      e1.currentTarget.querySelector(".answer").style.height = answerHeight[e1.currentTarget.attributes.getNamedItem("number").value] + 15 +"px";
      if(matchMedia('(min-width : 1500px)').matches) {
        e1.currentTarget.querySelector(".answer").querySelector("p").style.fontSize = 1.5 + "cqmax";
      }else {
        e1.currentTarget.querySelector(".answer").querySelector("p").style.fontSize = 16 + "px";
      }
    }
  });
});

$(".sidebar").mCustomScrollbar({
  theme:"minimal",
  scrollInertia:100
});