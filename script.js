// Таймер акции: до конца осени (30 ноября 2026, 23:59:59)
(function () {
  var end = new Date(2026, 10, 30, 23, 59, 59).getTime();
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function tick() {
    var left = Math.max(0, end - Date.now());
    var s = Math.floor(left / 1000);
    document.getElementById("t-days").textContent = pad(Math.floor(s / 86400));
    document.getElementById("t-hours").textContent = pad(Math.floor(s % 86400 / 3600));
    document.getElementById("t-mins").textContent = pad(Math.floor(s % 3600 / 60));
    document.getElementById("t-secs").textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  // Формы: сообщение после отправки
  function bind(formId, msgId, text) {
    var f = document.getElementById(formId), m = document.getElementById(msgId);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      m.textContent = text;
      f.reset();
    });
  }
  bind("order-form", "form-message", "Спасибо! Заявка отправлена, мы свяжемся с вами.");
  bind("quick-form", "quick-message", "Принято! Перезвоним в ближайшее время.");
})();

// Плавная прокрутка к блокам при нажатии на кнопки и пункты меню (ссылки вида #order)
document.addEventListener("click", function (e) {
  var a = e.target.closest('a[href^="#"]');
  if (!a || a.getAttribute("href") === "#") return;
  var target = document.querySelector(a.getAttribute("href"));
  if (!target) return;
  e.preventDefault();
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", a.getAttribute("href"));
});
