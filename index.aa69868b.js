const emojis = shuffleEmojis();
let storedCards = [];
let attempts = 0;
document.addEventListener("DOMContentLoaded", ()=>{
    createGame();
});
function updateAttempts() {
    document.querySelector(".attempts > h2").innerHTML = `Intentos: ${attempts}`;
}
function handleCardClick() {
    // only select one card at a time
    if (storedCards.length > 1) return;
    storedCards.push(this);
    this.textContent = emojis[this.dataset.emoji];
    this.removeEventListener("click", handleCardClick);
    // return if the user hasn't selected two cards
    if (storedCards.length !== 2) return;
    attempts++;
    updateAttempts();
    checkCards(storedCards[0], storedCards[1]);
}
function checkCards(firstCard, secondCard) {
    if (firstCard.textContent !== secondCard.textContent) {
        setTimeout(()=>{
            firstCard.addEventListener("click", handleCardClick);
            secondCard.addEventListener("click", handleCardClick);
            firstCard.textContent = "❔";
            secondCard.textContent = "❔";
            storedCards = [];
        }, 1000);
        return;
    }
    firstCard.classList.add("match");
    secondCard.classList.add("match");
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
    aside.classList.add("attempts");
    const headingAside = document.createElement("h2");
    headingAside.textContent = `Intentos: ${attempts}`;
    aside.appendChild(headingAside);
    emojis.forEach((_, i)=>{
        const div = document.createElement("div");
        div.classList.add("card");
        div.textContent = "❔";
        div.dataset.emoji = i;
        div.addEventListener("click", handleCardClick);
        article.appendChild(div);
    });
    section.append(article, aside);
    document.body.appendChild(section);
}
function shuffleEmojis() {
    const emojis1 = [
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
    while(emojis1.length > 0){
        const randomIndex = Math.floor(Math.random() * emojis1.length);
        shuffledEmojis.push(emojis1[randomIndex]);
        emojis1.splice(randomIndex, 1);
    }
    return shuffledEmojis;
}

//# sourceMappingURL=index.aa69868b.js.map
