/* Core: nav, mobile menu, particles, footer year */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.textContent = open ? "\u2715" : "\u2630";
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.textContent = "\u2630";
      }
    });
  }

  /* ---------- Active nav state ---------- */
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(function (a) {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Particle background ---------- */
  var canvas = document.getElementById("particles");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var W, H;
    var COLORS = ["124, 58, 237", "34, 211, 238", "167, 139, 250"];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    var COUNT = Math.min(70, Math.floor(W / 18));
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + p.c + ", 0.55)";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
})();
