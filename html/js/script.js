window.addEventListener('DOMContentLoaded', () => {
  const baskets = {
    "Rectangle": 2.0,
    "Rubbermade Tote": 3.0,
    "Tall hamper": 3.0,
    "Small round": 1.0,
    "NoSub": 0.0
  };

  function getDayOfWeek() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  }

  function calculatePrice() {
    const lbs = parseFloat(document.getElementById('lbs').value);
    const basketType = document.getElementById('basket').value;

    if (isNaN(lbs) || lbs <= 0) {
      document.getElementById('result').innerText = "Please enter a valid weight.";
      return;
    }

    const day = getDayOfWeek();
    let dailyPrice = (day === "Wednesday") ? 1.00 : 1.20;

    const basketWeight = baskets[basketType];
    const netWeight = lbs - basketWeight;

    if (netWeight < 0) {
      document.getElementById('result').innerText = "Weight must be greater than basket weight.";
      return;
    }

    const subtotal = dailyPrice * netWeight;
    const totalWithTax = subtotal * 1.07;

    document.getElementById('result').innerText = 
      "Subtotal: $" + `${totalWithTax.toFixed(2)} (${day})`
  }

  document.getElementById('calcBtn').addEventListener('click', calculatePrice);
});
