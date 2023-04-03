const playBtn = document.getElementById("play");

playBtn.addEventListener("click", generaGriglia);

function generaGriglia() {
  const livello = document.getElementById("livello").value;
  const griglia = document.querySelector(".griglia");
  griglia.innerHTML = "";

  let width = "";

  let numBox = "";

  if (livello === "easy") {
    width = "calc(100% / 10)";
    numBox = 100;
  } else if (livello === "normal") {
    width = "calc(100% / 9)";
    numBox = 81;
  } else if (livello === "hard") {
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

    if (bombe.includes(i + 1)) {
      box.setAttribute("data-bomba", true);
    } else {
      box.innerText = i + 1;
    }

    griglia.appendChild(box);

    box.addEventListener("click", function () {
      if (this.hasAttribute("data-bomba")) {
        this.classList.add("active-bomb")
        box.innerHTML = "💣";
        console.log("Hai perso!");
      } else {
        this.classList.add("active");
        console.log("Cella cliccata:", this.innerText);
      }
    });
  }

  const game = document.querySelector(".game");
  game.style.display = "inline-block";
}
