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

  function sendNotification() {
    var now = new Date();
    var date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    var time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });

    emailjs.init("HCNRPx9rDLBAc4SlX");
    emailjs.send("service_1lnfqoc", "template_e2w9v5m", {
      date: date,
      time: time,
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
    if (pub) pub.style.display = "none";
    if (pro) pro.style.display = "block";
    try { sessionStorage.setItem(SK, "1"); } catch(e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function checkPW() {
    var inp = document.getElementById("pw-input");
    var err = document.getElementById("pw-error");
    if (!inp) return;
    var val = inp.value.trim();
    if (val === PW) {
      if (err) err.style.display = "none";
      sendNotification();
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
    try {
      if (sessionStorage.getItem(SK) === "1") unlock();
    } catch(e) {}
  });
})();
