let storedCards = [];
let attempts = 0;

document.addEventListener("DOMContentLoaded", () => {
  createGame();
});

function handleCardClick() {
  // only select one card at a time
  if (storedCards.length > 1) return;

  storedCards.push(this);

  this.removeEventListener("click", handleCardClick);

  // return if the user hasn't selected two cards
  if (storedCards.length !== 2) return;

  attempts++;
  console.log("Intentos:" + attempts);

  if (storedCards[0].textContent !== storedCards[1].textContent) {
    setTimeout(() => {
      storedCards[0].addEventListener("click", handleCardClick);
      storedCards[1].addEventListener("click", handleCardClick);
      storedCards = [];
    }, 1000);

    return;
  }

  storedCards[0].classList.add("match");
  storedCards[1].classList.add("match");
  storedCards = [];
}

function createGame() {
  const h1 = document.createElement("h1");
  h1.textContent = "Emoji Game";
  document.body.appendChild(h1);

  const section = document.createElement("section");
  section.classList.add("content");

  const article = document.createElement("article");
  article.classList.add("cards");

  const aside = document.createElement("aside");
  aside.classList.add("attempts")
  const paragraphAside = document.createElement("p");
  paragraphAside.textContent = `Intentos: ${attempts}`;
  aside.appendChild(paragraphAside);

  const emojis = shuffleEmojis();
  emojis.forEach((emoji) => {
    const div = document.createElement("div");

    div.classList.add("card");
    // div.textContent = "❔";
    div.textContent = emoji;

    div.addEventListener("click", handleCardClick);

    article.appendChild(div);
  });

  section.appendChild(article);

  section.appendChild(aside);

  document.body.appendChild(section);
}

function shuffleEmojis() {
  const emojis = [
    "🫠",
    "😋",
    "😀",
    "💩",
    "🧐",
    "😡",
    "🤠",
    "🙄",
    "🫠",
    "😋",
    "😀",
    "💩",
    "🧐",
    "😡",
    "🤠",
    "🙄",
  ];
  const shuffledEmojis = [];

  while (emojis.length > 0) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    shuffledEmojis.push(emojis[randomIndex]);
    emojis.splice(randomIndex, 1);
  }

  return shuffledEmojis;
}
