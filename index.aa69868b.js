const emojis = shuffleEmojis();
let cardsLeft = emojis.length;
let storedCards = [];
let attempts = 0;
document.addEventListener("DOMContentLoaded", ()=>{
    createGame();
});
function updateAttempts() {
    document.querySelector(".subtitle").innerHTML = `Intentos: ${attempts}`;
}
function handleCardClick() {
    // only select one card at a time
    if (storedCards.length > 1) return;
    storedCards.push(this);
    this.classList.add("flipped");
    this.removeEventListener("click", handleCardClick);
    this.children[1].textContent = emojis[this.children[1].dataset.emoji];
    // return if the user hasn't selected two cards
    if (storedCards.length !== 2) return;
    attempts++;
    updateAttempts();
    checkCards();
}
function checkCards() {
    const firstCard = storedCards[0];
    const secondCard = storedCards[1];
    if (emojis[firstCard.children[1].dataset.emoji] !== emojis[secondCard.children[1].dataset.emoji]) {
        setTimeout(()=>{
            document.querySelector("#wrong").play();
            firstCard.addEventListener("click", handleCardClick);
            secondCard.addEventListener("click", handleCardClick);
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            storedCards = [];
        }, 1000);
        return;
    }
    storedCards = [];
    cardsLeft -= 2;
    if (cardsLeft) {
        setTimeout(()=>{
            document.querySelector("#correct").pause();
            document.querySelector("#correct").currentTime = 0;
            document.querySelector("#correct").play();
        }, 500);
        return;
    }
    setTimeout(()=>{
        createModal();
    }, 500);
}
function createModal() {
    const template = document.querySelector(".modal").content;
    const modal = template.cloneNode(true);
    document.querySelector("#applause").play();
    document.querySelector("main").appendChild(modal);
    tsParticles.load("tsparticles", {
        fpsLimit: 120,
        fullScreen: {
            enable: false
        },
        detectRetina: true,
        reduceDuplicates: false,
        particles: {
            collisions: {
                bounce: {
                    horizontal: {
                        random: {
                            enable: false,
                            minimumValue: 0.1
                        },
                        value: 1
                    },
                    vertical: {
                        random: {
                            enable: false,
                            minimumValue: 0.1
                        },
                        value: 1
                    }
                },
                enable: false,
                mode: "bounce",
                overlap: {
                    enable: true,
                    retries: 0
                }
            },
            move: {
                angle: {
                    offset: 0,
                    value: 90
                },
                attract: {
                    distance: 200,
                    enable: false,
                    rotate: {
                        x: 600,
                        y: 1200
                    }
                },
                center: {
                    x: 50,
                    y: 50,
                    radius: 0
                },
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
                    top: "out"
                },
                random: false,
                size: false,
                speed: 2,
                straight: false,
                vibrate: false,
                warp: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                    factor: 1000
                },
                limit: 0,
                value: 75
            },
            orbit: {
                animation: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    sync: false
                },
                enable: false,
                opacity: 1,
                rotation: {
                    random: {
                        enable: false,
                        minimumValue: 0
                    },
                    value: 45
                },
                width: 1
            },
            rotate: {
                animation: {
                    enable: true,
                    speed: 5,
                    sync: false
                }
            },
            shape: {
                character: [
                    {
                        fill: true,
                        font: "Verdana",
                        value: emojis,
                        style: "",
                        weight: 400
                    }, 
                ],
                polygon: {
                    nb_sides: 5
                },
                stroke: {
                    color: "random",
                    width: 1
                },
                type: "char"
            },
            size: {
                random: {
                    enable: true,
                    minimumValue: 25
                },
                value: {
                    min: 25,
                    max: 50
                },
                animation: {
                    enable: false,
                    speed: 25,
                    sync: false,
                    destroy: "none",
                    startValue: "random",
                    minimumValue: 25
                }
            }
        }
    });
    // document.querySelector(".modal-attempts").textContent = attempts;
    document.querySelector("#play-again").addEventListener("click", ()=>{
        location.reload();
    });
}
function createGame() {
    const headingTitle = createElement("h1", "title");
    const section = createElement("section", "content");
    const articleCards = createElement("article", "cards");
    const articleAttempts = createElement("aside", "attempts");
    const headingAttempts = createElement("h2", "subtitle");
    headingTitle.textContent = "Emoji Game";
    headingAttempts.textContent = `Intentos: ${attempts}`;
    articleAttempts.appendChild(headingAttempts);
    for(let i = 0; i < emojis.length; i++){
        const card = createElement("div", "card");
        const front = createElement("div", "front");
        const back = createElement("div", "back");
        front.textContent = "❔";
        back.dataset.emoji = i;
        card.append(front, back);
        card.addEventListener("click", handleCardClick);
        articleCards.appendChild(card);
    }
    section.append(headingTitle, articleCards, articleAttempts);
    document.querySelector("main").appendChild(section);
}
function createElement(element, className) {
    const elm = document.createElement(element);
    elm.classList.add(className);
    return elm;
}
function shuffleEmojis() {
    const emojis1 = [
        "😋",
        "😀",
        "💩",
        "🧐",
        "😡",
        "🙄",
        "👻",
        "👽"
    ];
    const emojiList = emojis1.concat(emojis1);
    const shuffledEmojis = [];
    while(emojiList.length > 0){
        const randomIndex = Math.floor(Math.random() * emojiList.length);
        shuffledEmojis.push(emojiList[randomIndex]);
        emojiList.splice(randomIndex, 1);
    }
    return shuffledEmojis;
}

//# sourceMappingURL=index.aa69868b.js.map
