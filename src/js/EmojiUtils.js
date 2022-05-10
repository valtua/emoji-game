import { GameState } from "./GameState";

export const getEmojiList = (emojis) => {
  const emojiList = randomizeEmojis(emojis, GameState.emojiLimit);
  const duplicatedEmojis = emojiList.concat(emojiList);
  const shuffledEmojis = randomizeEmojis(
    duplicatedEmojis,
    duplicatedEmojis.length
  );

  return shuffledEmojis;
};

const randomizeEmojis = (emojis, limit) => {
  const emojiList = [];

  for (let i = 0; i < limit; i++) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    emojiList.push(emojis[randomIndex]);
    emojis.splice(randomIndex, 1);
  }

  return emojiList;
};
