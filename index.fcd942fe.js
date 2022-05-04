const emojis=shuffleEmojis();let cardsLeft=emojis.length,storedCards=[],attempts=0;function updateAttempts(){document.querySelector(".subtitle").innerHTML=`Intentos: ${attempts}`}function handleCardClick(){storedCards.length>1||(storedCards.push(this),this.classList.add("flipped"),this.removeEventListener("click",handleCardClick),this.children[1].textContent=emojis[this.children[1].dataset.emoji],2===storedCards.length&&(attempts++,updateAttempts(),checkCards()))}function checkCards(){const e=storedCards[0],t=storedCards[1];emojis[e.children[1].dataset.emoji]===emojis[t.children[1].dataset.emoji]?(storedCards=[],cardsLeft-=2,cardsLeft?setTimeout((()=>{document.querySelector("#correct").pause(),document.querySelector("#correct").currentTime=0,document.querySelector("#correct").play()}),500):setTimeout((()=>{createModal()}),500)):setTimeout((()=>{document.querySelector("#wrong").play(),e.addEventListener("click",handleCardClick),t.addEventListener("click",handleCardClick),e.classList.remove("flipped"),t.classList.remove("flipped"),storedCards=[]}),1e3)}function createModal(){const e=document.querySelector(".modal").content.cloneNode(!0);document.querySelector("#applause").play(),document.querySelector("main").appendChild(e),document.querySelector("#play-again").addEventListener("click",(()=>{document.querySelector("main").innerHTML="",document.querySelector("#applause").pause(),cardsLeft=emojis.length,attempts=0,createGame()}))}function createGame(){const e=createElement("h1","title"),t=createElement("section","content"),n=createElement("article","cards"),c=createElement("aside","attempts"),a=createElement("h2","subtitle");e.textContent="Emoji Game",a.textContent=`Intentos: ${attempts}`,c.appendChild(a);for(let e=0;e<emojis.length;e++){const t=createElement("div","card"),c=createElement("div","front"),a=createElement("div","back");c.textContent="❔",a.dataset.emoji=e,t.append(c,a),t.addEventListener("click",handleCardClick),n.appendChild(t)}t.append(e,n,c),document.querySelector("main").appendChild(t)}function createElement(e,t){const n=document.createElement(e);return n.classList.add(t),n}function shuffleEmojis(){const e=["😋","😀","💩","🧐","😡","🙄","👻","👽"],t=e.concat(e),n=[];for(;t.length>0;){const e=Math.floor(Math.random()*t.length);n.push(t[e]),t.splice(e,1)}return n}document.addEventListener("DOMContentLoaded",(()=>{createGame()}));
//# sourceMappingURL=index.fcd942fe.js.map