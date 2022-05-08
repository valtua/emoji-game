import { GameState } from "./GameState";
import { createModal } from "./ModalUtils";

export const createGame = () => {
  const headingTitle = createElement("h1", "title");
  const section = createElement("section", "content");
  const articleCards = createElement("article", "cards");
  const articleAttempts = createElement("aside", "attempts");
  const headingAttempts = createElement("h2", "subtitle");

  headingTitle.textContent = "Emoji Game";
  headingAttempts.textContent = `Intentos: ${GameState.attempts}`;

  articleAttempts.appendChild(headingAttempts);

  GameState.emojis.forEach((_, i) => {
    const card = createElement("div", "card");
    const front = createElement("div", "front");
    const back = createElement("div", "back");

    front.textContent = "❔";
    back.dataset.emoji = i;

    card.append(front, back);
    card.addEventListener("click", handleCardClick);

    articleCards.appendChild(card);
  });

  section.append(headingTitle, articleCards, articleAttempts);
  document.querySelector("main").appendChild(section);
};

const handleCardClick = (e) => {
  // only select one card at a time
  if (GameState.storedCards.length > 1) return;

  const current = e.currentTarget;

  GameState.storedCards.push(current);

  current.classList.add("flipped");

  current.removeEventListener("click", handleCardClick);

  current.children[1].textContent =
    GameState.emojis[current.children[1].dataset.emoji];

  // return if the user hasn't selected two cards
  if (GameState.storedCards.length !== 2) return;

  GameState.attempts++;
  document.querySelector(
    ".subtitle"
  ).innerHTML = `Intentos: ${GameState.attempts}`;

  checkCards(GameState.storedCards[0], GameState.storedCards[1]);
};

const checkCards = (firstCard, secondCard) => {
  if (
    GameState.emojis[firstCard.children[1].dataset.emoji] !==
    GameState.emojis[secondCard.children[1].dataset.emoji]
  ) {
    setTimeout(() => {
      document.querySelector("#wrong").play();
    }, 500);

    setTimeout(() => {
      firstCard.addEventListener("click", handleCardClick);
      secondCard.addEventListener("click", handleCardClick);

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      // Stop cheating!
      firstCard.addEventListener("transitionend", handleCardTransitionEnd);
      secondCard.addEventListener("transitionend", handleCardTransitionEnd);

      GameState.storedCards = [];
    }, 1000);

    return;
  }

  GameState.storedCards = [];
  GameState.cardsLeft -= 2;

  if (GameState.cardsLeft) {
    setTimeout(() => {
      document.querySelector("#correct").pause();
      document.querySelector("#correct").currentTime = 0;
      document.querySelector("#correct").play();
    }, 500);

    return;
  }

  setTimeout(() => {
    createModal();
  }, 500);
};

const handleCardTransitionEnd = (e) => {
  if (e.currentTarget.classList.contains("flipped")) return;

  e.currentTarget.children[1].textContent = "";
  e.currentTarget.removeEventListener("transitionend", handleCardTransitionEnd);
};

const createElement = (element, className) => {
  const elm = document.createElement(element);

  elm.classList.add(className);

  return elm;
};
