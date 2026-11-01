
document.addEventListener("DOMContentLoaded", function () {
  // Елементи симулятора
  const resistanceSlider = document.getElementById("resistanceSlider");
  const resistanceValue = document.getElementById("resistanceValue");
  const forceValue = document.getElementById("forceValue");
  const repCounter = document.getElementById("repCounter");
  const calValue = document.getElementById("calValue");
  const squeezeBtn = document.getElementById("squeezeBtn");
  const resetBtn = document.getElementById("resetBtn");

  let repetitions = 0;
  let calories = 0;
  let force = resistanceSlider
    ? Number(resistanceSlider.value)
    : 30;

  const CALORIES_FACTOR = 0.002;

  function renderSimulator() {
    if (resistanceValue) {
      resistanceValue.textContent = force;
    }

    if (forceValue) {
      forceValue.textContent = force + " кг";
    }

    if (repCounter) {
      repCounter.textContent = repetitions;
    }

    if (calValue) {
      calValue.textContent = calories.toFixed(2);
    }
  }

  if (resistanceSlider) {
    resistanceSlider.addEventListener("input", function () {
      force = Number(resistanceSlider.value);
      renderSimulator();
    });
  }

  if (squeezeBtn) {
    squeezeBtn.addEventListener("click", function () {
      repetitions += 1;
      calories += force * CALORIES_FACTOR;
      renderSimulator();

      squeezeBtn.classList.add("active");

      setTimeout(function () {
        squeezeBtn.classList.remove("active");
      }, 150);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      repetitions = 0;
      calories = 0;
      renderSimulator();
    });
  }

  // Мобільне меню
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");

  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      mobileNav.classList.toggle("active");
      burger.classList.toggle("active");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("active");
        burger.classList.remove("active");
      });
    });
  }

  // Відправка замовлення через Telegram
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameField = document.getElementById("name");
      const phoneField = document.getElementById("phone");
      const novaField = document.getElementById("nova");

      const name = nameField ? nameField.value.trim() : "";
      const phone = phoneField ? phoneField.value.trim() : "";
      const nova = novaField ? novaField.value.trim() : "";

      const message =
        "🛒 НОВЕ ЗАМОВЛЕННЯ — EXPANDO SHOP\n\n" +
        "Товар: GripPro GripSim 60\n" +
        "Ім'я: " + name + "\n" +
        "Телефон: " + phone + "\n" +
        "Доставка Новою поштою: " + (nova || "Не вказано");

      const telegramUrl =
        "https://t.me/Mikescash?text=" +
        encodeURIComponent(message);

      window.location.href = telegramUrl;
    });
  }

  // Лічильники GoatCounter
  const siteVisitCount = document.getElementById("siteVisitCount");
  const telegramClickCount = document.getElementById("telegramClickCount");
  const telegramCommunityButton = document.getElementById("telegramCommunityButton");

  async function updatePublicCounter(path, element) {
    if (!element) return;

    try {
      const counterUrl =
        "https://expandoshop.goatcounter.com/counter/" +
        encodeURIComponent(path) +
        ".json";

      const response = await fetch(counterUrl, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("GoatCounter HTTP " + response.status);
      }

      const result = await response.json();

      element.textContent =
        result.count !== undefined ? result.count : "—";

    } catch (error) {
      console.warn("Не вдалося завантажити лічильник:", error);
      element.textContent = "—";
    }
  }

  // Загальна кількість переглядів сайту
  updatePublicCounter("TOTAL", siteVisitCount);

  // Кількість переходів у Telegram
  updatePublicCounter("telegram-community-click", telegramClickCount);

  if (telegramCommunityButton) {
    telegramCommunityButton.addEventListener("click", function () {
      if (
        window.goatcounter &&
        typeof window.goatcounter.count === "function"
      ) {
        window.goatcounter.count({
          path: "telegram-community-click",
          event: true
        });
      }
    });
  }

  // Початкове відображення симулятора
  renderSimulator();
});
