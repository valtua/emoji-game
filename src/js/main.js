import { getEmojiList, shuffleEmojis } from "./EmojiUtils";
import { createGame } from "./GameUtils";
import { GameState } from "./GameState";
import { tsParticlesConfig } from "./ModalUtils";

document.addEventListener("DOMContentLoaded", () => {
  const emojis = getEmojiList();

  GameState.emojis = shuffleEmojis(emojis);
  GameState.cardsLeft = GameState.emojis.length;
  tsParticlesConfig.particles.shape.character[0].value = GameState.emojis;

  createGame();
});
