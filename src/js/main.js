import { getEmojiList } from "./EmojiUtils";
import { createGame } from "./GameUtils";
import { GameState } from "./GameState";
import { tsParticlesConfig } from "./ModalUtils";
import emojis from "../data/emojis.json";

document.addEventListener("DOMContentLoaded", () => {
  GameState.emojis = getEmojiList(emojis);
  GameState.cardsLeft = GameState.emojis.length;
  tsParticlesConfig.particles.shape.character[0].value = GameState.emojis.map(
    ({ emoji }) => emoji
  );

  createGame();
});
