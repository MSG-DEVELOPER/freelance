(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Mobile nav */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  toggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* Metric counters */
  const metrics = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.getAttribute("data-count") || 0);
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && metrics.length) {
    const mio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            mio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    metrics.forEach((m) => mio.observe(m));
  }

  /* Mock zoom lightbox */
  const mockTriggers = document.querySelectorAll("[data-mock-zoom]");
  if (mockTriggers.length) {
    const dialog = document.createElement("dialog");
    dialog.className = "mock-lightbox";
    dialog.setAttribute("aria-label", "Vista ampliada del mockup");
    dialog.innerHTML = `
      <div class="mock-lightbox-inner">
        <div class="mock-lightbox-toolbar">
          <span>Desliza para ver el mock completo</span>
          <button type="button" class="mock-lightbox-close" data-mock-close>Cerrar</button>
        </div>
        <div class="mock-lightbox-stage">
          <img alt="" />
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    const stageImg = dialog.querySelector(".mock-lightbox-stage img");
    const closeBtn = dialog.querySelector("[data-mock-close]");

    const openMock = (btn) => {
      const img = btn.querySelector("img");
      if (!img || !stageImg) return;
      stageImg.src = img.currentSrc || img.src;
      stageImg.alt = img.alt || "Mockup ampliado";
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    };

    const closeMock = () => {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    };

    mockTriggers.forEach((btn) => {
      btn.addEventListener("click", () => openMock(btn));
    });
    closeBtn?.addEventListener("click", closeMock);
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) closeMock();
    });
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeMock();
    });
  }

  /* i18n: desactivado de momento — se vuelve a activar al final */
})();
