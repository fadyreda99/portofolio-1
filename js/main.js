/*---------------------------------------------- navs menu ---------------------------------*/
const hamburgerBtn = document.querySelector(".hamburger-btn");
const navMenu = document.querySelector("#nav-menu");
const closeNavBtn = navMenu.querySelector(".close-nav-menu");

hamburgerBtn.addEventListener("click", showNavMenu);
closeNavBtn.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navMenu.classList.add("open");
  bodyScrollingToggle();
}

function hideNavMenu() {
  navMenu.classList.remove("open");
  fadeOutEffect();
  bodyScrollingToggle();
}

function fadeOutEffect() {
  document.querySelector(".fade-out-effect").classList.add("active");

  setTimeout(() => {
    document.querySelector(".fade-out-effect").classList.remove("active");
  }, 300);
}

//attach an event handler to document
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item")) {
    //make sure e.targer.hash has value before overridding default behavior
    if (e.target.hash !== "") {
      //prevent default anchor click behavior
      e.preventDefault();
      const hash = e.target.hash;

      //deactivate existing active section
      document.querySelector(".section.active").classList.add("hide");
      document.querySelector(".section.active").classList.remove("active");

      //activate new section
      document.querySelector(hash).classList.add("active");
      document.querySelector(hash).classList.remove("hide");

      //deactivate existing active nav menu 'link-item'
      navMenu
        .querySelector(".active")
        .classList.add("outer-shadow", "hover-in-shadow");
      navMenu
        .querySelector(".active")
        .classList.remove("active", "inner-shadow");

      //if clicked link-item is contained withing the nav menu
      if (navMenu.classList.contains("open")) {
        //activate new nav menu 'link-item'
        e.target.classList.add("active", "inner-shadow");
        e.target.classList.remove("outer-shadow", "hover-in-shadow");

        //hide nav menu
        hideNavMenu();
      } else {
        let navItems = navMenu.querySelectorAll(".link-item");
        navItems.forEach((item) => {
          if (hash === item.hash) {
            //activate new nav menu 'link-item'
            item.classList.add("active", "inner-shadow");
            item.classList.remove("outer-shadow", "hover-in-shadow");
          }
        });
        fadeOutEffect();
      }
      //add hash to url
      window.location.hash = hash;
    }
  }
});

/*---------------------------------------------- about section tabs ---------------------------------*/

const tabsContent = document.querySelectorAll("#about article");

const aboutTabs = document.querySelectorAll(".about-tabs span");

aboutTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    aboutTabs.forEach((tab) => {
      tab.classList.remove("active", "outer-shadow");
      this.classList.add("active", "outer-shadow");
    });
  });

  tab.addEventListener("click", function () {
    tabsContent.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });

    document.querySelectorAll(this.dataset.target).forEach((tabContent) => {
      tabContent.classList.add("active");
    });
  });
});

// const aboutSection = document.querySelector("#about");
// const tabsContainer = document.querySelector(".about-tabs");

// tabsContainer.addEventListener("click" , (e) => {
//     /*if tab contain (tab-item) class and not contain (active) class */
//     if(e.target.classList.contains("tab-item") &&
//     !e.target.classList.contains("active")){
//        const target = e.target.getAttribute("data-target");

//        //deactivate existing active tab item (btn)
//        tabsContainer.querySelector(".active").classList.remove("outer-shadow" , "active");

//        //activate tab item (btn) i clicked on
//        e.target.classList.add("active" , "outer-shadow");

//        //deactivate existing active (tab content)
//        aboutSection.querySelector(".tab-content.active").remove("active");

//        //active new (tab content)
//        aboutSection.querySelector(target).classList.add("active")
//     }
// })

/*---------------------------------------------- portfolio filter and popup ---------------------------------*/

//stop scroll bar of body when open project details
function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

const portfolioTabs = document.querySelectorAll("#portfolio .filter-item");
const filterContainer = document.querySelector(".portfolio-filter");
const portfolioItemsContainer = document.querySelector(".portfolio-items");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const popup = document.querySelector(".portfolio-popup");
const prevBtn = popup.querySelector(".pp-prev");
const nextBtn = popup.querySelector(".pp-next");
const closeBtn = popup.querySelector(".pp-close");
const projectDetailsContainer = popup.querySelector(".pp-details");
const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

let itemIndex, slideIndex, screenshots;

// filter portfolio items

portfolioTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    portfolioTabs.forEach((tab) => {
      tab.classList.remove("active", "outer-shadow");
      this.classList.add("active", "outer-shadow");
    });
  });

  tab.addEventListener("click", function () {
    const target = tab.getAttribute("data-target");
    portfolioItems.forEach((item) => {
      if (target === item.getAttribute("data-category") || target === "all") {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  });
});

portfolioItemsContainer.addEventListener("click", (e) => {
  if (e.target.closest(".portfolio-item-inner")) {
    const portfolioItem = e.target.closest(
      ".portfolio-item-inner"
    ).parentElement;

    //get portfolioItem index
    itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
      portfolioItem
    );

    //get all images of one projects
    screenshots = portfolioItems[itemIndex]
      .querySelector(".portfolio-item-img img")
      .getAttribute("data-screenshots");

    //convert screenshots to array
    screenshots = screenshots.split(",");

    if (screenshots.length === 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
    slideIndex = 0;

    //call function popup toggle
    popupToggle();

    //call function popupslideshow
    popupSlideShow();

    //call function popupDetails
    popupDetails();
  }
});

//close popup portfolio [project details]
closeBtn.addEventListener("click", () => {
  //call function popupToggle
  popupToggle();
  if (projectDetailsContainer.classList.contains("active")) {
    popupDetailsToggle();
  }
});

//popup toggle function (open popup portfolio [details of project])
function popupToggle() {
  popup.classList.toggle("open");
  bodyScrollingToggle();
}

//to switch between images of project in popup portfolio and send data to popup
function popupSlideShow() {
  const imgSrc = screenshots[slideIndex];
  const popupImg = popup.querySelector(".pp-img");
  // activate loader until popupImg loaded
  popup.querySelector(".pp-loader").classList.add("active");
  popupImg.src = imgSrc;
  //deactivate loader after the popupTmage loaded
  popupImg.onload = () => {
    popup.querySelector(".pp-loader").classList.remove("active");
  };

  //set the number of this images and number of images of project in counter
  popup.querySelector(".pp-counter").innerHTML =
    slideIndex + 1 + " of " + screenshots.length;
}

//slider [next slide (image)]
nextBtn.addEventListener("click", () => {
  if (slideIndex === screenshots.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  popupSlideShow();
});

// slider [prev slide (image)]
prevBtn.addEventListener("click", () => {
  if (slideIndex === 0) {
    slideIndex = screenshots.length - 1;
  } else {
    slideIndex--;
  }
  popupSlideShow();
});

//send project details to popupportfolio
function popupDetails() {
  //if portfolio-item-details not exixts
  if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
    projectDetailsBtn.style.display = "none";
    return; //end function
  }
  projectDetailsBtn.style.display = "block";
  //get project details
  const details = portfolioItems[itemIndex].querySelector(
    ".portfolio-item-details"
  ).innerHTML;
  //set project details
  popup.querySelector(".pp-project-details").innerHTML = details;

  //get project title
  const title = portfolioItems[itemIndex].querySelector(
    ".portfolio-item-title"
  ).innerHTML;
  //set project title
  popup.querySelector(".pp-title h2").innerHTML = title;

  //get projejct category
  const category = portfolioItems[itemIndex].getAttribute("data-category");
  //set project category
  popup.querySelector(".pp-project-category").innerHTML = category
    .split("-")
    .join(" ");
}

projectDetailsBtn.addEventListener("click", () => {
  popupDetailsToggle();
});

//open and close project details in popupportfolio
function popupDetailsToggle() {
  if (projectDetailsContainer.classList.contains("active")) {
    projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
    projectDetailsBtn.querySelector("i").classList.add("fa-plus");

    projectDetailsContainer.classList.remove("active");
    projectDetailsContainer.style.maxHeight = 0 + "px";
  } else {
    projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
    projectDetailsBtn.querySelector("i").classList.add("fa-minus");

    projectDetailsContainer.classList.add("active");
    projectDetailsContainer.style.maxHeight =
      projectDetailsContainer.scrollHeight + "px";
    popup.scrollTo(0, projectDetailsContainer.offsetTop);
  }
}

/*---------------------------------------------- testimoial slider nav ---------------------------------*/
const sliderContainer = document.querySelector(".testi-slider-container");
const slides = sliderContainer.querySelectorAll(".testi-item");
const slideWidth = sliderContainer.offsetWidth;
const prevSliderBtn = document.querySelector(".testi-slider-nav .prev");
const nextSliderBtn = document.querySelector(".testi-slider-nav .next");
const activeSlide = sliderContainer.querySelector(".testi-item.active");

let testiSlideIndex = Array.from(activeSlide.parentElement.children).indexOf(
  activeSlide
);

// let testiSlideIndex = 0;

//set width of all slides

slides.forEach((slide) => {
  slide.style.width = slideWidth + "px";
});

//set width of slider container
sliderContainer.style.width = slideWidth * slides.length + "px";

nextSliderBtn.addEventListener("click", () => {
  if (testiSlideIndex === slides.length - 1) {
    testiSlideIndex = 0;
  } else {
    testiSlideIndex++;
  }
  slider();
});

prevSliderBtn.addEventListener("click", () => {
  if (testiSlideIndex === 0) {
    testiSlideIndex === slides.length - 1;
  } else {
    testiSlideIndex--;
  }
  slider();
});

function slider() {
  //deactivate existing active slides
  sliderContainer
    .querySelector(".testi-item.active")
    .classList.remove("active");
  //activate new slide
  slides[testiSlideIndex].classList.add("active");
  sliderContainer.style.marginLeft = -(slideWidth * testiSlideIndex) + "px";
}
slider();

/*---------------------------------------------- hide all section expect active ---------------------------------*/
const sections = document.querySelectorAll(".section");

sections.forEach((section) => {
  if (!section.classList.contains("active")) {
    section.classList.add("hide");
  }
});

/*---------------------------------------------- preloader ---------------------------------*/
window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
