const playBtn = document.getElementById("play");

playBtn.addEventListener("click", generaGriglia);

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
      if (gameOver){
        return;
      }

      if (this.hasAttribute("data-bomba")) {
        this.classList.add("active-bomb")
        box.innerHTML = "💣";
        const lose = document.getElementsByClassName("lose")[0];
        lose.style.display = "flex";
        gameOver = true;

      } else {
        this.classList.add("active");
        score++;
        document.getElementById("score").innerText = score;
        if (score === numBox - bombe.length) {
          const win = document.getElementsByClassName("win")[0];
          win.style.display = "flex";
          gameOver = true;
        }
      }
    });
  }

  const game = document.querySelector(".game");
  game.style.display = "inline-block";
}