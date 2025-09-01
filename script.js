/* ============================================================
   Part 1 — BASICS: variables, data types, conditionals
   - Captures name/age and prints a message with logic.
============================================================ */
const basicForm = document.getElementById("basicForm");
const basicOutput = document.getElementById("basicOutput");

basicForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Variables (let/const) + basic types
  const name = document.getElementById("nameInput").value.trim();
  const age = Number(document.getElementById("ageInput").value);

  // Conditionals (if/else) + template literals
  if (!name || Number.isNaN(age) || age < 0) {
    basicOutput.textContent = "Please provide a valid name and age.";
    return;
  }

  const status = age >= 18 ? "an adult" : "a minor";
  basicOutput.innerHTML = `Hello, <strong>${name}</strong>! You are <em>${status}</em>.`;

  // Extra example: switch (still Part 1)
  let lifeStage;
  switch (true) {
    case age < 13: lifeStage = "child"; break;
    case age < 20: lifeStage = "teen"; break;
    case age < 65: lifeStage = "adult"; break;
    default: lifeStage = "senior";
  }
  basicOutput.innerHTML += ` <span class="muted">(Life stage: ${lifeStage})</span>`;
});

basicForm.addEventListener("reset", () => {
  basicOutput.textContent = "";
});

/* ============================================================
   Part 2 — FUNCTIONS: reusable logic for a mini cart
   - At least 2 custom functions: formatCurrency, lineTotal
============================================================ */
const cartForm = document.getElementById("cartForm");
const cartList = document.getElementById("cartList");
const totalAmountEl = document.getElementById("totalAmount");
const clearCartBtn = document.getElementById("clearCart");

let cart = []; // array of {name, price, qty}

// #1 Function: currency formatter (pure function)
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

// #2 Function: line total (pure function)
function lineTotal(price, qty) {
  return price * qty;
}

// Helper: render cart (uses a loop)
function renderCart() {
  cartList.innerHTML = "";

  // Loop example #1 — forEach
  cart.forEach((item, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.name}</strong> — ${item.qty} × ${formatCurrency(item.price)}
      = <strong>${formatCurrency(lineTotal(item.price, item.qty))}</strong>
      <button data-index="${idx}" class="btn btn-ghost btn-sm" style="float:right">Remove</button>
    `;
    cartList.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + lineTotal(item.price, item.qty), 0);
  totalAmountEl.textContent = formatCurrency(total);
}

cartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("itemName").value.trim();
  const price = Number(document.getElementById("price").value);
  const qty = Number(document.getElementById("qty").value);

  if (!name || price < 0 || qty < 1) return;

  cart.push({ name, price, qty });
  renderCart();
  cartForm.reset();
});

cartList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;
  const idx = Number(btn.dataset.index);
  cart.splice(idx, 1);
  renderCart();
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

/* ============================================================
   Part 3 — LOOPS: repetition & iteration
   - Uses forEach (above) + for + while here
============================================================ */
const topics = [
  "Variables & Types",
  "Conditionals",
  "Functions",
  "Loops",
  "DOM Selection",
  "Events",
  "Creating Elements"
];

const topicList = document.getElementById("topicList");
function renderTopics() {
  topicList.innerHTML = "";
  topics.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    topicList.appendChild(li);
  });
}
renderTopics();

const countdownBtn = document.getElementById("countdownBtn");
const countdownList = document.getElementById("countdownList");

countdownBtn.addEventListener("click", () => {
  countdownList.innerHTML = "";

  // Loop example #2 — classic for loop
  for (let i = 5; i >= 1; i--) {
    const li = document.createElement("li");
    li.textContent = `T-${i}`;
    countdownList.appendChild(li);
  }

  // Loop example #3 — while loop (ends at 0)
  let j = 0;
  while (j <= 0) {
    const li = document.createElement("li");
    li.textContent = "Liftoff!";
    li.style.borderLeft = "4px solid var(--ok)";
    countdownList.appendChild(li);
    j++;
  }
});

/* ============================================================
   Part 4 — DOM: select elements, listen to events, update & create
   - At least 3 interactions: theme toggle, live char count,
     add notes (create elements), plus cart buttons above.
============================================================ */
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("theme-light");
  themeToggle.setAttribute("aria-pressed", String(isLight));
});

const noteInput = document.getElementById("noteInput");
const charCount = document.getElementById("charCount");
noteInput.addEventListener("input", () => {
  const n = noteInput.value.length;
  charCount.textContent = n;
  // Tiny visual cue
  charCount.style.color = n > 120 ? "var(--danger)" : n > 80 ? "var(--warn)" : "var(--text)";
});

const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");
addNoteBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.textContent = text;
  noteList.appendChild(li);
  noteInput.value = "";
  charCount.textContent = "0";
  charCount.style.color = "var(--text)";
});
