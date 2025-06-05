document.addEventListener("DOMContentLoaded", () => {
  const weightInput = document.getElementById("weightInput");
  const basketSelect = document.getElementById("basketSelect");
  const discountCheckbox = document.getElementById("discountCheckbox");
  const nofoldCheckbox = document.getElementById("nofold");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultBox = document.getElementById("result");

  // Ensure only one of the checkboxes is checked at any time (even on page load)
  function enforceExclusiveCheckboxes() {
    if (discountCheckbox.checked && nofoldCheckbox.checked) {
      // Uncheck nofold if both are checked
      nofoldCheckbox.checked = false;
    }
  }
  discountCheckbox.addEventListener("change", () => {
    if (discountCheckbox.checked) {
      nofoldCheckbox.checked = false;
    }
  });
  nofoldCheckbox.addEventListener("change", () => {
    if (nofoldCheckbox.checked) {
      discountCheckbox.checked = false;
    }
  });
  // Run once on page load
  enforceExclusiveCheckboxes();

  calculateBtn.addEventListener("click", () => {
    const inputWeight = parseFloat(weightInput.value);
    const basketType = basketSelect.value;
    const useBusinessDiscount = discountCheckbox.checked;
    const useNoFold = nofoldCheckbox.checked;

    if (isNaN(inputWeight) || inputWeight <= 0) {
      resultBox.textContent = "Please enter a valid weight.";
      return;
    }
    if (!basketType) {
      resultBox.textContent = "Please select a basket type.";
      return;
    }

    // Basket weight deductions
    const basketWeights = {
      "Rectangle": 2,
      "Rubbermade Tote": 3,
      "Tall hamper": 3,
      "Small round": 1,
      "NoSub": 0
    };

    const deduction = basketWeights[basketType] ?? 0;
    const rawAdjustedWeight = Math.max(0, inputWeight - deduction);
    const adjustedWeight = Math.round(rawAdjustedWeight);

    // Determine base price per pound
    const today = new Date();
    const isWednesday = today.getDay() === 3;
    let pricePerLb = 1.20;

    if (useBusinessDiscount) {
      pricePerLb = 0.95;
    } else if (useNoFold) {
      pricePerLb = 0.85;
    } else if (isWednesday) {
      pricePerLb = 1.00;
    }

    // Calculate total
    const subtotal = adjustedWeight * pricePerLb;
    const taxRate = 0.07;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    resultBox.innerHTML = `
      <p>Adjusted Weight: <strong>${adjustedWeight} lbs</strong></p>
      <p>Price per Pound: <strong>$${pricePerLb.toFixed(2)}</strong></p>
      <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
      <p>Tax (7%): <strong>$${tax.toFixed(2)}</strong></p>
      <p>Total Price: <strong>$${total.toFixed(2)}</strong></p>
    `;
  });
});

particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
  var count_particles, stats, update;
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
  count_particles = document.querySelector(".js-count-particles");
  update = function () {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);