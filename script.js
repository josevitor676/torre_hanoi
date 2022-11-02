const modal = document.getElementsByClassName("modal")[0];
const modalMsg = document.getElementsByClassName("modal__msg")[0];
const button = document.getElementById("button");
const main = document.getElementById("content");
const select = document.querySelector("#dif");
const qtd = document.querySelector("#qtd")
const dialog = document.querySelector("dialog")
const fechar = document.querySelector("#fechar")
const btn_regra = document.querySelector(".btn_regra")


let vitoria = false;
let gameState = true;
let movimentos = 0

btn_regra.addEventListener('click', () => {
    dialog.showModal()
})

fechar.addEventListener('click', () => {
    dialog.close()
})


const boxTower1 = document.createElement("div");
const boxTower2 = document.createElement("div");
const boxTower3 = document.createElement("div");

boxTower1.className = "boxTower";
boxTower2.className = "boxTower";
boxTower3.className = "boxTower";

main.appendChild(boxTower1);
main.appendChild(boxTower2);
main.appendChild(boxTower3);

const torre1 = document.createElement("div");
const torre2 = document.createElement("div");
const torre3 = document.createElement("div");

torre1.id = "torre1";
torre2.id = "torre2";
torre3.id = "torre3";

torre1.className = "torre";
torre2.className = "torre";
torre3.className = "torre";

boxTower1.appendChild(torre1);
boxTower2.appendChild(torre2);
boxTower3.appendChild(torre3);
const disco1 = document.createElement("div");
const disco2 = document.createElement("div");
const disco3 = document.createElement("div");
const disco4 = document.createElement("div");
const disco5 = document.createElement("div");


const btnSelect = document.querySelector("#btnSelect");
btnSelect.addEventListener("click", () => {
    qtd.innerHTML = 0
    movimentos = 0
    if (select.value == "facil") {
        disco1.id = "disco1";
        disco2.id = "disco2";
        disco3.id = "disco3";

        torre1.appendChild(disco1);
        torre1.appendChild(disco2);
        torre1.appendChild(disco3);

        torre1.removeChild(disco4);
        torre1.removeChild(disco5);

    }
    if (select.value == "medio") {
        disco4.id = "disco4";
        disco1.id = "disco1";
        disco2.id = "disco2";
        disco3.id = "disco3";
        torre1.appendChild(disco1);
        torre1.appendChild(disco2);
        torre1.appendChild(disco3);
        torre1.appendChild(disco4);
        torre1.removeChild(disco5);

    }
    if (select.value == "dificil") {
        disco1.id = "disco1";
        disco2.id = "disco2";
        disco3.id = "disco3";
        disco4.id = "disco4";
        disco5.id = "disco5";

        torre1.appendChild(disco1);
        torre1.appendChild(disco2);
        torre1.appendChild(disco3);
        torre1.appendChild(disco4);
        torre1.appendChild(disco5);

    
    }
});

const stateDOM = document.getElementsByTagName("p")[0];

const checkDomStatus = () => {
  if (gameState) {
    stateDOM.innerText = "Selecione uma Torre";
  } else {
    stateDOM.innerText = "Selecione Torre para Colocar Disco";
  }
};

const errorOrVictory = (msg, txtButton) => {
  modalMsg.innerText = msg;
  button.innerHTML = txtButton;
};
let disco;

const conditionals = (event) => {
  let target = event.currentTarget.lastElementChild.lastElementChild;
  let tower = event.currentTarget.lastElementChild;
  if (gameState) {
    if (target !== null) {
      disco = target;
      gameState = false;
    } else {
      errorOrVictory("Não foi possível fazer essa jogada!", "Continuar");
      modal.style.display = "block";
      setTimeout(function () {
        modal.style.opacity = "1";
      }, 100);
      gameState = true;
    }
  } else {
    // verifcar tamanho do disco
    // se torre estiver vazia ou disco da torre destino for maior
    if (target === null || target.clientWidth > disco.clientWidth) {
      // destino do disco
      // executar função de destino e mudar varial de modo de jogo
      tower.appendChild(disco);
      movimentos += 1
      qtd.innerHTML = movimentos
      gameState = true;
    } else {
      // exibir alerta de erro e permacer no mesmo modo de jogo
      errorOrVictory("Não foi possível fazer essa jogada!", "Continuar");
      modal.style.display = "block";
      setTimeout(function () {
        modal.style.opacity = "1";
      }, 100);
      gameState = true;
    }
  }
};
const winConditional = (event) => {
  let tower = event.currentTarget.lastElementChild;
  
  //console.log(tower.childElementCount)
  if (tower.childElementCount === 5 && select.value == 'dificil') {
    errorOrVictory("Você conseguiu!", "Reiniciar");
    modal.style.display = "block";
    setTimeout(function () {
      modal.style.opacity = "1";
    }, 100);
    vitoria = true;
  }
  if (tower.childElementCount === 4 && select.value == 'medio') {
    errorOrVictory("Você conseguiu!", "Reiniciar");
    modal.style.display = "block";
    setTimeout(function () {
      modal.style.opacity = "1";
    }, 100);
    vitoria = true;
  }
  if (tower.childElementCount === 3 && select.value == 'facil') {
    errorOrVictory("Você conseguiu!", "Reiniciar");
    modal.style.display = "block";
    setTimeout(function () {
      modal.style.opacity = "1";
    }, 100);
    vitoria = true;
  }
};
boxTower1.addEventListener("click", (event) => {
  conditionals(event);
  checkDomStatus();
});

boxTower2.addEventListener("click", (event) => {
  conditionals(event);
  winConditional(event);
  checkDomStatus();
});

boxTower3.addEventListener("click", (event) => {
  conditionals(event);
  winConditional(event);
  checkDomStatus();
});

button.addEventListener("click", () => {
  if (vitoria) {
    window.location.href = window.location.href;
  }
  setTimeout(function () {
    modal.style.opacity = "0";
  }, 500);
  modal.style.display = "none";
});
