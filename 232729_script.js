document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle functionality
  let menuIcon = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  // Active link highlighting on scroll
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
        });
        document
          .querySelector('header nav a[href*="' + id + '"]')
          .classList.add("active");
      }
    });
  };

  // Form submission handling
  const form = document.querySelector("form");
  const formMessage = document.getElementById("form-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            formMessage.textContent = "Message sent successfully!";
            formMessage.style.color = "green";
            form.reset(); // Clear the form
          } else {
            formMessage.textContent =
              "Error sending message. Please try again.";
            formMessage.style.color = "red";
          }
        })
        .catch((error) => {
          formMessage.textContent = "Error sending message. Please try again.";
          formMessage.style.color = "red";
        });
    });
  }
});
