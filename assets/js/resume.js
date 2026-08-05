/* Resume: renders the page from data.js + real PDF download via jsPDF */
(function () {
  "use strict";

  /* ---------- Render the resume card from data.js ---------- */
  function render() {
    document.getElementById("res-summary").textContent = RESUME.summary;

    var skills = document.getElementById("res-skills");
    RESUME.skills.forEach(function (s) {
      var span = document.createElement("span");
      span.className = "tag";
      span.textContent = s;
      skills.appendChild(span);
    });

    var exp = document.getElementById("res-experience");
    RESUME.experience.forEach(function (e) {
      var div = document.createElement("div");
      div.style.marginTop = "1rem";
      div.innerHTML =
        "<p style='font-family:var(--font-mono);color:var(--accent);font-size:0.85rem'>" + e.period + "</p>" +
        "<p style='font-weight:600'>" + e.role + " &mdash; " + e.org + "</p>" +
        "<ul style='margin:0.5rem 0 0 1.2rem;color:var(--muted);font-size:0.92rem'>" +
        e.points.map(function (p) { return "<li style='margin-bottom:0.3rem'>" + p + "</li>"; }).join("") +
        "</ul>";
      exp.appendChild(div);
    });

    var proj = document.getElementById("res-projects");
    RESUME.projects.forEach(function (p) {
      var div = document.createElement("div");
      div.style.marginTop = "1rem";
      div.innerHTML = "<p style='font-weight:600'>" + p.name + "</p><p style='color:var(--muted);font-size:0.92rem'>" + p.detail + "</p>";
      proj.appendChild(div);
    });
  }

  if (document.getElementById("res-summary")) render();

  /* ---------- PDF download (jsPDF) ---------- */
  var dlBtn = document.getElementById("download-pdf");
  if (dlBtn) {
    dlBtn.addEventListener("click", function () {
      var jspdf = window.jspdf;
      if (!jspdf) { alert("PDF library failed to load — check your connection and retry."); return; }
      var doc = new jspdf.jsPDF({ unit: "pt", format: "a4" });
      var W = doc.internal.pageSize.getWidth();
      var M = 48;
      var y = 60;
      var H = doc.internal.pageSize.getHeight();
      var fs = 10.5;

      doc.setFillColor(124, 58, 237);
      doc.rect(0, 0, W, 8, "F");
      doc.setFillColor(6, 182, 212);
      doc.rect(0, 8, W, 3, "F");

      function ensure(h) {
        if (y + h > H - 60) { doc.addPage(); y = 60; }
      }
      function section(title) {
        y += 24;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(124, 58, 237);
        doc.text(title.toUpperCase(), M, y);
        y += 6;
        doc.setDrawColor(160, 160, 180);
        doc.line(M, y, W - M, y);
        y += 16;
        doc.setTextColor(20, 20, 30);
      }
      function text(lines, size, style) {
        doc.setFont("helvetica", style || "normal");
        doc.setFontSize(size || fs);
        lines.forEach(function (line) {
          ensure(14);
          doc.text(line, M, y);
          y += 14;
        });
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(15, 15, 25);
      doc.text(RESUME.name, M, y);
      y += 20;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 120);
      doc.text(RESUME.title + "  \u00b7  " + RESUME.contact + "  \u00b7  " + RESUME.location, M, y);
      y += 24;

      section("Summary");
      text(doc.splitTextToSize(RESUME.summary, W - M * 2), fs);

      section("Skills");
      text([RESUME.skills.join("  \u2022  ")], fs);

      section("Experience");
      RESUME.experience.forEach(function (e) {
        ensure(40);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(fs);
        doc.setTextColor(20, 20, 30);
        doc.text(e.role + " \u2014 " + e.org, M, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 140);
        doc.text(e.period, W - M, y, { align: "right" });
        y += 14;
        doc.setFontSize(fs);
        e.points.forEach(function (p) {
          ensure(14);
          doc.text("\u2022 " + p, M + 10, y);
          y += 14;
        });
      });

      section("Selected Projects");
      RESUME.projects.forEach(function (p) {
        ensure(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(fs);
        doc.setTextColor(20, 20, 30);
        doc.text(p.name, M, y);
        y += 13;
        doc.setFont("helvetica", "normal");
        text(doc.splitTextToSize(p.detail, W - M * 2), fs);
      });

      doc.save("Srinu-Ravuri-AI-Engineer-Resume.pdf");
    });
  }

  /* ---------- Copy link ---------- */
  var copyBtn = document.getElementById("copy-link");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(location.href).then(function () {
        copyBtn.textContent = "Link copied!";
        setTimeout(function () { copyBtn.textContent = "Copy link"; }, 1500);
      });
    });
  }
})();
