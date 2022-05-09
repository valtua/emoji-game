import { GameState } from "./GameState";
import { createModal } from "./ModalUtils";
import { createLeaderboard } from "./Leaderboard";
import { createElement, formatTime } from "./GlobalUtils";

export const createGame = () => {
  const headingTitle = createElement("h1", "title");
  const section = createElement("section", "content");
  const articleCards = createElement("article", "cards");
  const articleAttempts = createElement("aside", "attempts");
  const headingScore = createElement("h2", "score");
  const buttonLeaderboard = createElement("button", "leaderboard-open");

  headingTitle.textContent = "Emoji Game";
  headingScore.textContent = `Intentos: ${
    GameState.attempts
  } - Tiempo: ${formatTime(GameState.time)}`;

  articleAttempts.appendChild(headingScore);
  buttonLeaderboard.textContent = "Ver tabla";
  buttonLeaderboard.addEventListener("click", createLeaderboard);

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

  section.append(
    buttonLeaderboard,
    headingTitle,
    articleCards,
    articleAttempts
  );
  document.querySelector("main").appendChild(section);
};

const handleCardClick = (e) => {
  // only select one card at a time
  if (GameState.storedCards.length > 1) return;

  if (!GameState.gameStarted) {
    GameState.interval = setInterval(() => {
      GameState.time++;

      document.querySelector(".score").textContent = `Intentos: ${
        GameState.attempts
      } - Tiempo: ${formatTime(GameState.time)}`;
    }, 1000);

    GameState.gameStarted = true;
  }

  const current = e.currentTarget;

  GameState.storedCards.push(current);

  current.classList.add("flipped");

  current.removeEventListener("click", handleCardClick);

  current.children[1].textContent =
    GameState.emojis[current.children[1].dataset.emoji].emoji;

  // return if the user hasn't selected two cards
  if (GameState.storedCards.length !== 2) return;

  GameState.attempts++;
  document.querySelector(".score").textContent = `Intentos: ${
    GameState.attempts
  } - Tiempo: ${formatTime(GameState.time)}`;

  const gameFinished = checkCards(
    GameState.storedCards[0],
    GameState.storedCards[1]
  );

  if (gameFinished) {
    clearInterval(GameState.interval);
    GameState.gameStarted = false;

    saveData();

    setTimeout(() => {
      createModal();
    }, 500);
  }
};

const checkCards = (firstCard, secondCard) => {
  if (
    GameState.emojis[firstCard.children[1].dataset.emoji].id !==
    GameState.emojis[secondCard.children[1].dataset.emoji].id
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

  return true;
};

const handleCardTransitionEnd = (e) => {
  if (e.currentTarget.classList.contains("flipped")) return;

  e.currentTarget.children[1].textContent = "";
  e.currentTarget.removeEventListener("transitionend", handleCardTransitionEnd);
};

const saveData = () => {
  const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const newData = {
    attempts: GameState.attempts,
    time: GameState.time,
  };

  if (data.length < 10) {
    data.push(newData);
    data.sort((a, b) => a.attempts - b.attempts || a.time - b.time);
  }

  if (data.length === 10) {
    if (
      data[data.length - 1].attempts > newData.attempts ||
      data[data.length - 1].time > newData.time
    ) {
      data.pop();
      data.push(newData);
      data.sort((a, b) => a.attempts - b.attempts || a.time - b.time);
    }
  }

  localStorage.setItem("leaderboard", JSON.stringify(data));
};
