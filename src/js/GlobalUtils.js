export const createElement = (element, className) => {
  const elm = document.createElement(element);

  elm.classList.add(className);

  return elm;
};

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (minutes === 0) {
    return `${seconds < 10 ? "0" : ""}${seconds}s`;
  }

  return `${minutes}m : ${seconds < 10 ? "0" : ""}${seconds}s`;
};

export const formatTimeMessage = (time, attempts) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const minutesMessage = `${minutes} minuto${minutes === 1 ? "" : "s"}`;
  const secondsMessage = `${seconds} segundo${seconds === 1 ? "" : "s"}`;

  if (minutes === 0) {
    return `Juego completado en ${secondsMessage} utilizando ${attempts} intentos.`;
  }

  return `Juego completado en ${minutesMessage} ${secondsMessage} utilizando ${attempts} intentos.`;
};
