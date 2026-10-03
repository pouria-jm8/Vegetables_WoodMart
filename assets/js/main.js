document.addEventListener("DOMContentLoaded", function () {
  var drawer = document.querySelector("[data-drawer]");
  var shade = document.querySelector("[data-drawer-bg]");
  function setDrawer(open) {
    if (!drawer || !shade) return;
    drawer.classList.toggle("is-open", open);
    shade.classList.toggle("is-open", open);
  }
  document.querySelectorAll("[data-menu]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setDrawer(!drawer.classList.contains("is-open"));
    });
  });
  if (shade) shade.addEventListener("click", function () { setDrawer(false); });
  document.querySelectorAll("[data-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-tab");
      document.querySelectorAll("[data-tab]").forEach(function (item) {
        item.classList.toggle("on", item === btn);
      });
      document.querySelectorAll("[data-panel]").forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-panel") !== name;
      });
    });
  });

  var catBtn = document.querySelector("[data-cats]");
  var catBox = document.querySelector("[data-catbox]");
  if (catBtn && catBox) {
    catBtn.addEventListener("click", function () {
      catBox.classList.toggle("is-open");
    });
  }

  document.querySelectorAll("[data-qty]").forEach(function (box) {
    var input = box.querySelector("input");
    box.querySelector("[data-minus]").addEventListener("click", function () {
      var n = parseInt(input.value, 10) || 1;
      if (n > 1) input.value = n - 1;
      updateCart();
    });
    box.querySelector("[data-plus]").addEventListener("click", function () {
      var n = parseInt(input.value, 10) || 1;
      input.value = n + 1;
      updateCart();
    });
  });

  document.querySelectorAll("[data-remove]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = btn.closest("[data-row]");
      if (row) row.remove();
      updateCart();
    });
  });

  document.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (item) {
        item.classList.remove("on");
      });
      btn.classList.add("on");
      document.querySelectorAll("[data-cat]").forEach(function (card) {
        var show = cat === "all" || card.getAttribute("data-cat") === cat;
        card.style.display = show ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".heart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.toggle("on");
    });
  });

  var order = document.querySelector("[data-order]");
  if (order) {
    order.addEventListener("submit", function (e) {
      e.preventDefault();
      order.innerHTML = "<h2>Thank you</h2><p>Your order has been received. Order number 48217.</p><a class='btn' href='shop.html'>Back to shop</a>";
    });
  }

  updateCart();
});

function money(n) {
  return "$" + n.toFixed(2);
}

function updateCart() {
  var rows = document.querySelectorAll("[data-row]");
  var total = 0;
  rows.forEach(function (row) {
    var price = parseFloat(row.getAttribute("data-price")) || 0;
    var input = row.querySelector("input");
    var qty = input ? parseInt(input.value, 10) || 1 : 1;
    var line = price * qty;
    total += line;
    var cell = row.querySelector("[data-line]");
    if (cell) cell.textContent = money(line);
  });
  document.querySelectorAll("[data-total]").forEach(function (sum) {
    sum.textContent = money(total);
  });
  var count = document.querySelector("[data-count]");
  if (count && document.querySelector("[data-cart]")) count.textContent = rows.length;
}
