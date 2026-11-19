/* D-SLS — animations dynamiques (apparition, compteurs, barres) */
(function () {
  "use strict";

  /* 1) apparition douce au défilement */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".card,.imgbox,.sec-title,.tbl-wrap,.hero").forEach(function (el) {
    el.classList.add("rv");
    io.observe(el);
  });

  /* 2) compteurs animés (chiffres purs uniquement : 187, 100 000, 248…) */
  function animerCompteur(el) {
    var txt = el.textContent.trim();
    if (!/^[0-9][0-9\s\u00a0\u202f]*$/.test(txt)) return;
    var cible = parseInt(txt.replace(/[\s\u00a0\u202f]/g, ""), 10);
    if (isNaN(cible) || cible === 0) return;
    var t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1100, 1);
      var v = Math.round(cible * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString("fr-FR");
      if (p < 1) requestAnimationFrame(step); else el.textContent = txt;
    }
    requestAnimationFrame(step);
  }
  var io2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animerCompteur(e.target); io2.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".num").forEach(function (el) { io2.observe(el); });

  /* 3) barres de progression qui se remplissent */
  document.querySelectorAll(".bar i,.lamp i").forEach(function (b) {
    var w = b.style.width;
    if (!w) return;
    b.style.width = "0";
    var io3 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { b.style.width = w; io3.unobserve(b); }
      });
    }, { threshold: 0.4 });
    io3.observe(b);
  });
})();
