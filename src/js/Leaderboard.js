import { formatTime } from "./GlobalUtils";

export const createLeaderboard = () => {
  const template = document.querySelector(".leaderboard").content;
  const leaderboard = template.cloneNode(true);

  document.querySelector("main").appendChild(leaderboard);

  const leaderboardClose = document.querySelector(".leaderboard-close");
  const leaderboardList = document.querySelector(".leaderboard-list");

  leaderboardClose.addEventListener("click", () => {
    document.querySelector(".modal-overlay").remove();
  });

  leaderboardList.innerHTML = "";

  const leaderboardData = JSON.parse(localStorage.getItem("leaderboard"));

  if (!leaderboardData) {
    const tr = document.createElement("tr");
    const tdNotFound = document.createElement("td");

    tdNotFound.textContent = "No existen datos para mostrar";
    tdNotFound.colSpan = 3;

    tr.appendChild(tdNotFound);
    leaderboardList.appendChild(tr);
    return;
  }

  leaderboardData.forEach(({ attempts, time }, i) => {
    const tr = document.createElement("tr");
    const tdPosition = document.createElement("td");
    const tdAttempts = document.createElement("td");
    const tdTime = document.createElement("td");

    tdPosition.textContent = i + 1;
    tdAttempts.textContent = attempts;
    tdTime.textContent = formatTime(time);

    tr.append(tdPosition, tdAttempts, tdTime);

    leaderboardList.appendChild(tr);
  });
};
