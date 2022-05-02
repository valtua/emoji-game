document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded!");
});

function handleCardClick() {
  console.log("emoji");
  this.removeEventListener("click", handleCardClick);
}

function createGame() {
  const emojis = [
    "😀",
    "🫠",
    "😋",
    "😋",
    "😋",
    "😋",
    "😋",
    "😋",
    "😀",
    "🫠",
    "😋",
    "😋",
    "😋",
    "😋",
    "😋",
    "😋",
  ];

  const h1 = document.createElement("h1");
  h1.textContent = "Emoji Game";
  document.body.appendChild(h1);

  const section = document.createElement("section");
  section.classList.add("card-section");

  emojis.forEach((emoji) => {
    const article = document.createElement("article");
    article.classList.add("card");
    article.textContent = emoji;

    article.addEventListener("click", handleCardClick);

    section.appendChild(article);
  });

  document.body.appendChild(section);
}

createGame();

//❔
