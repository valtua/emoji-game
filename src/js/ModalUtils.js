import { GameState } from "./GameState";
import { formatTimeMessage } from "./GlobalUtils";

export const createModal = () => {
  const template = document.querySelector(".modal").content;
  const modal = template.cloneNode(true);

  document.querySelector("#applause").play();

  document.querySelector("main").appendChild(modal);

  tsParticles.load("tsparticles", tsParticlesConfig);

  const iconAttempts = document.querySelector(".icon-attempts");
  const modalTitle = document.querySelector(".modal-title");

  switch (true) {
    case GameState.attempts === 8:
      modalTitle.textContent = "¡PERFECTO!";
      iconAttempts.textContent = "🏆";
      break;
    case GameState.attempts <= 12 && GameState.time < 30:
      modalTitle.textContent = "¡MUY BIEN!";
      iconAttempts.textContent = "👏";
      break;
    case GameState.attempts <= 17 && GameState.time < 60:
      modalTitle.textContent = "¡NO ESTÁ MAL!";
      iconAttempts.textContent = "🤔";
      break;
    default:
      modalTitle.textContent = "¡VAYA...!";
      iconAttempts.textContent = "💩";
  }

  document.querySelector(".modal-content").textContent = formatTimeMessage(
    GameState.time,
    GameState.attempts
  );

  document.querySelector("#play-again").addEventListener("click", () => {
    location.reload();
  });
};

export const tsParticlesConfig = {
  fpsLimit: 120,
  fullScreen: {
    enable: false,
  },
  detectRetina: true,
  reduceDuplicates: false,
  particles: {
    collisions: {
      bounce: {
        horizontal: {
          random: { enable: false, minimumValue: 0.1 },
          value: 1,
        },
        vertical: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
      },
      enable: false,
      mode: "bounce",
      overlap: { enable: true, retries: 0 },
    },
    move: {
      angle: { offset: 0, value: 90 },
      attract: { distance: 200, enable: false, rotate: { x: 600, y: 1200 } },
      center: { x: 50, y: 50, radius: 0 },
      decay: 0,
      distance: {},
      direction: "bottom",
      drift: 0,
      enable: true,
      outModes: {
        default: "out",
        bottom: "out",
        left: "out",
        right: "out",
        top: "out",
      },
      random: false,
      size: false,
      speed: 2,
      straight: false,
      vibrate: false,
      warp: false,
    },
    number: {
      density: { enable: true, area: 800, factor: 1000 },
      limit: 0,
      value: 75,
    },
    orbit: {
      animation: { count: 0, enable: false, speed: 1, sync: false },
      enable: false,
      opacity: 1,
      rotation: { random: { enable: false, minimumValue: 0 }, value: 45 },
      width: 1,
    },
    rotate: {
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
    },
    shape: {
      character: [
        {
          fill: true,
          font: "Verdana",
          // value: GameState.emojis,
          style: "",
          weight: 400,
        },
      ],
      polygon: { nb_sides: 5 },
      stroke: { color: "random", width: 1 },
      type: "char",
    },
    size: {
      random: { enable: true, minimumValue: 25 },
      value: { min: 25, max: 50 },
      animation: {
        enable: false,
        speed: 25,
        sync: false,
        destroy: "none",
        startValue: "random",
        minimumValue: 25,
      },
    },
  },
};
