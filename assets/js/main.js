const playBtn = document.getElementById("play");
const restartBtn = document.getElementById("restart");

playBtn.addEventListener("click", generaGriglia);
restartBtn.addEventListener("click", function() {
  gameOver = false;
  score = 0;
  const lose = document.getElementsByClassName("lose")[0];
  const win = document.getElementsByClassName("win")[0];
  lose.style.display = "none";
  win.style.display = "none";
  document.getElementById("score").innerText = score;
  generaGriglia();
});

let score = 0;
let gameOver = false;

function generaGriglia() {
  const livello = document.getElementById("livello").value;
  const griglia = document.querySelector(".griglia");
  griglia.innerHTML = "";

  let height= "";
  let width = "";
  let numBox = "";

  if (livello === "easy") {
    height ="calc(100% / 10)";
    width = "calc(100% / 10)";
    numBox = 100;
  } else if (livello === "normal") {
    height ="calc(100% / 9)";
    width = "calc(100% / 9)";
    numBox = 81;
  } else if (livello === "hard") {
    height ="calc(100% / 7)";
    width = "calc(100% / 7)";
    numBox = 49;
  }

  let numeri = [];
  for (let i = 1; i <= numBox; i++) {
    numeri.push(i);
  }

  let bombe = [];
  for (let i = 0; i < 16; i++) {
    let randomIndex = Math.floor(Math.random() * numeri.length);
    bombe.push(numeri[randomIndex]);
    numeri.splice(randomIndex, 1);
  }

  for (let i = 0; i < numBox; i++) {
    let box = document.createElement("div");
    box.classList.add("box", livello);
    box.style.width = width;
    box.style.height = height;

    if (bombe.includes(i + 1)) {
      box.setAttribute("data-bomba", true);
    }

    griglia.appendChild(box);

    box.addEventListener("click", function () {
      if (gameOver || this.classList.contains("active")){
        return;
      }

      if (this.hasAttribute("data-bomba")) {
        this.classList.add("active-bomb");
        box.innerHTML = "💣";
        const lose = document.getElementsByClassName("lose")[0];
        lose.style.display = "flex";
        gameOver = true;
        restartBtn.style.display = "inline";
        playBtn.style.display = "none";
        const bombe = document.querySelectorAll("[data-bomba]");
        for (let i = 0; i < bombe.length; i++) {
          bombe[i].innerHTML = "💣";
        }
      } else {
        this.classList.add("active");
        score++;
        document.getElementById("score").innerText = score;
        if (score === numBox - bombe.length) {
          const win = document.getElementsByClassName("win")[0];
          win.style.display = "flex";
          gameOver = true;
          restartBtn.style.display = "inline";
          playBtn.style.display = "none";
        }
      }
    });
  }

  const game = document.querySelector(".game");
  game.style.display = "inline-block";
}
