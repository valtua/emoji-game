document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded!");
});

function handleCardClick() {
  console.log("emoji");
  this.removeEventListener("click", handleCardClick);
}

function createGame() {
  const emojis = ["😀", "🫠", "😋","😋","😋","😋","😋","😋","😀", "🫠", "😋","😋","😋","😋","😋","😋"];
  const section = document.createElement("section");

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
