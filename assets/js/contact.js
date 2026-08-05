/* Contact form → n8n webhook
   ------------------------------------------------------------
   REQUIREMENT: the n8n workflow must be ACTIVE for the
   production URL to respond. While testing in the n8n editor,
   you can temporarily switch to the /webhook-test/ URL below.
   ------------------------------------------------------------ */

(function () {
  "use strict";

  // n8n Production webhook URL (works once the workflow is Active)
  var N8N_WEBHOOK_URL = "https://srinuravuri.app.n8n.cloud/webhook/contact-form";
  // For editor testing only, use:
  // var N8N_WEBHOOK_URL = "https://srinuravuri.app.n8n.cloud/webhook-test/contact-form";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var success = document.getElementById("form-success");
  var error = document.getElementById("form-error");
  var submitBtn = document.getElementById("cf-submit");
  var nameEl = document.getElementById("cf-name");
  var emailEl = document.getElementById("cf-email");
  var msgEl = document.getElementById("cf-message");
  var typeButtons = document.querySelectorAll("#type-selector button");
  var projectType = "Side Project";

  typeButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      typeButtons.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      projectType = b.dataset.type;
    });
  });

  function show(el) {
    [success, error].forEach(function (a) { a.classList.remove("show"); });
    el.classList.add("show");
  }
  function setSending(on) {
    submitBtn.disabled = on;
    submitBtn.textContent = on ? "Sending\u2026" : "Send Message";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameEl.value.trim();
    var email = emailEl.value.trim();
    var message = msgEl.value.trim();

    if (!name || !email || !message) {
      error.textContent = "Please fill in your name, email, and message.";
      show(error);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.textContent = "That email address doesn't look right.";
      show(error);
      return;
    }

    setSending(true);
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        projectType: projectType,
        message: message,
        submittedAt: new Date().toISOString(),
      }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Webhook responded with " + res.status);
        form.reset();
        setSending(false);
        show(success);
        window.setTimeout(function () { success.classList.remove("show"); }, 8000);
      })
      .catch(function (err) {
        console.error("n8n webhook failed:", err);
        setSending(false);
        error.textContent = "Couldn't send your message. Please try again, or email me directly at ravurisrinu989@gmail.com.";
        show(error);
      });
  });
})();
