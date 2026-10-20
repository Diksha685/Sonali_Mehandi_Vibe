
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = open ? "✕" : "☰";
    });

    navItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Scroll reveal animations
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px"
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Gallery category filtering
  const filters = document.querySelectorAll(".filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      filters.forEach(button => button.classList.remove("active"));
      filter.classList.add("active");

      galleryItems.forEach(item => {
        const shouldShow =
          category === "all" || item.dataset.category === category;

        item.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  // Gallery image lightbox
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector(".lightbox-close");

  function openLightbox(image) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const image = item.querySelector("img");
      if (image) openLightbox(image);
    });
  });

  closeButton?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });

  // WhatsApp booking enquiry
  const bookingForm = document.querySelector("#booking-form");

  // Replace with the real number, including country code.
  // Example format: 919876543210 (digits only).
  const whatsappNumber = "919158530049";

  bookingForm?.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(bookingForm);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const occasion = String(data.get("occasion") || "").trim();
    const date = String(data.get("date") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone || !occasion) {
      alert("Please fill in your name, phone number and occasion.");
      return;
    }

    if (whatsappNumber.includes("X")) {
      alert("Please add the real WhatsApp number in script.js first.");
      return;
    }

    const enquiry = [
      "Hello Sonali! I would like to enquire about a mehndi booking.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Occasion: ${occasion}`,
      `Preferred date: ${date || "Not decided"}`,
      `Design details: ${message || "Please share available designs."}`
    ].join("\n");

    const url =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiry)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
});
