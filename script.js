const form = document.querySelector(".composer");
const note = document.querySelector("#note");
const pebbles = document.querySelector("#pebbles");
const filters = document.querySelectorAll("[data-filter]");

const moods = ["steady", "bright", "low"];
let activeFilter = "all";
const savedItems = JSON.parse(localStorage.getItem("mood-pebble-items") || "null");
let items = savedItems || [
  { text: "Coffee before inbox", mood: "steady" },
  { text: "Clear desk, clear head", mood: "bright" },
  { text: "Needs quieter edges", mood: "low" }
];

function persist() {
  localStorage.setItem("mood-pebble-items", JSON.stringify(items));
}

function render() {
  pebbles.innerHTML = "";
  items
    .filter((item) => activeFilter === "all" || item.mood === activeFilter)
    .forEach((item, index) => {
      const card = document.createElement("article");
      const title = document.createElement("strong");
      const meta = document.createElement("span");
      card.className = "pebble";
      title.textContent = item.text;
      meta.textContent = `${item.mood} #${index + 1}`;
      card.append(title, meta);
      pebbles.append(card);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = note.value.trim();
  if (!text) return;
  items = [{ text, mood: moods[items.length % moods.length] }, ...items].slice(0, 12);
  persist();
  note.value = "";
  render();
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

render();
