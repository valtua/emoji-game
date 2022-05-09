import { GameState } from "./GameState";
import data from "../data/emojis.json";

export const getEmojiList = () => {
  const emojiList = [];

  while (emojiList.length < GameState.emojiLimit) {
    emojiList.push(data[Math.floor(Math.random() * data.length)]);
  }

  return emojiList.map((emoji) => emoji);
};

export const shuffleEmojis = (emojis) => {
  const emojiList = emojis.concat(emojis);
  const shuffledEmojis = [];

  while (emojiList.length > 0) {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    shuffledEmojis.push(emojiList[randomIndex]);
    emojiList.splice(randomIndex, 1);
  }

  return shuffledEmojis;
};
