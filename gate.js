(function() {
  var PW = "shrapnel2026";
  var SK = "i36k_access";

  function renderEmail() {
    var c = [97,116,101,108,105,101,114,64,107,97,114,105,109,98,101,110,107,104,101,108,105,102,97,46,99,111,109];
    var addr = c.map(function(n){ return String.fromCharCode(n); }).join("");
    var els = document.querySelectorAll(".email-link");
    els.forEach(function(el) {
      el.textContent = addr;
      el.href = "mailto:" + addr;
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function sendNotification(visitorEmail) {
    var now = new Date();
    var date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    var time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });

    emailjs.init("HCNRPx9rDLBAc4SlX");
    emailjs.send("service_1lnfqoc", "template_e2w9v5m", {
      date: date,
      time: time,
      visitor_email: visitorEmail || "not provided",
      to_email: "karimbenkhelifa@gmail.com"
    }).then(function() {
      console.log("Notification sent");
    }, function(error) {
      console.log("Notification failed", error);
    });
  }

  function unlock() {
    var pub = document.getElementById("public-face");
    var pro = document.getElementById("protected");
    var btn = document.getElementById("back-btn-wrap");
    var cFront = document.getElementById("credits-front");
    var cBack = document.getElementById("credits-back");
    if (pub) pub.style.display = "none";
    if (pro) pro.style.display = "block";
    if (btn) btn.style.display = "block";
    if (cFront) cFront.style.display = "none";
    if (cBack) cBack.style.display = "block";
    document.body.style.background = "#f0ebe3";
    document.body.style.color = "#1a1814";
    try { sessionStorage.setItem(SK, "1"); } catch(e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.goHome = function() {
    var pub = document.getElementById("public-face");
    var pro = document.getElementById("protected");
    var btn = document.getElementById("back-btn-wrap");
    var cFront = document.getElementById("credits-front");
    var cBack = document.getElementById("credits-back");
    if (pro) pro.style.display = "none";
    if (pub) pub.style.display = "block";
    if (btn) btn.style.display = "none";
    if (cFront) cFront.style.display = "block";
    if (cBack) cBack.style.display = "none";
    document.body.style.background = "#080808";
    document.body.style.color = "#d4cdc4";
    try { sessionStorage.removeItem(SK); } catch(e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function checkPW() {
    var emailInp = document.getElementById("visitor-email");
    var emailErr = document.getElementById("email-error");
    var inp = document.getElementById("pw-input");
    var err = document.getElementById("pw-error");

    var visitorEmail = emailInp ? emailInp.value.trim() : "";

    // Validate email first
    if (!isValidEmail(visitorEmail)) {
      if (emailErr) emailErr.style.display = "block";
      if (emailInp) emailInp.focus();
      return;
    } else {
      if (emailErr) emailErr.style.display = "none";
    }

    // Then check password
    if (!inp) return;
    var val = inp.value.trim();
    if (val === PW) {
      if (err) err.style.display = "none";
      sendNotification(visitorEmail);
      unlock();
    } else {
      if (err) err.style.display = "block";
      inp.value = "";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    renderEmail();

    // Load EmailJS
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    document.head.appendChild(script);

    var btn = document.getElementById("pw-btn");
    if (btn) btn.addEventListener("click", checkPW);

    var inp = document.getElementById("pw-input");
    if (inp) inp.addEventListener("keydown", function(e) {
      if (e.key === "Enter") checkPW();
    });

    var emailInp = document.getElementById("visitor-email");
    if (emailInp) emailInp.addEventListener("keydown", function(e) {
      if (e.key === "Enter") checkPW();
    });

    try {
      if (sessionStorage.getItem(SK) === "1") unlock();
    } catch(e) {}
  });
})();
