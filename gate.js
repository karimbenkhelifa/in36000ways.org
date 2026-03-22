(function() {
  var PW = "shrapnel2026";
  var SK = "i36k_access";

  function renderEmail() {
    var c = [105,110,113,117,105,114,121,64,105,110,51,54,48,48,48,119,97,121,115,46,111,114,103];
    var addr = c.map(function(n){ return String.fromCharCode(n); }).join("");
    var els = document.querySelectorAll(".email-link");
    els.forEach(function(el) {
      el.textContent = addr;
      el.href = "mailto:" + addr;
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
      unlock();
    } else {
      if (err) err.style.display = "block";
      inp.value = "";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    renderEmail();
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
