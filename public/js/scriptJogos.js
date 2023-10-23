const valueTime01 = document.getElementById("valueTime01");
const plusButtonTime01 = document.getElementById("plusTime01");
const minusButtonTime01 = document.getElementById("minusTime01");
const bola01 = document.getElementById("bolavolei01").style.opacity;

let controlet1="semponto", controlet2="semponto",rotacaot1="mantem", rotacaot2="mantem";
const updateValueTime01 = () => {
  if (countTime01 <= 9) {
    valueTime01.innerHTML = "0" + countTime01;
  } else if (countTime01 > 9) {
    valueTime01.innerHTML = countTime01;
  }
};
const updateBola01 = () => {
  document.getElementById("bolavolei01").style.opacity = "1";
  document.getElementById("bolavolei02").style.opacity = "0";
};
const updateBola02 = () => {
  document.getElementById("bolavolei01").style.opacity = "0";
  document.getElementById("bolavolei02").style.opacity = "1";
};

const valueTime02 = document.getElementById("valueTime02");
const plusButtonTime02 = document.getElementById("plusTime02");
const minusButtonTime02 = document.getElementById("minusTime02");
const updateValueTime02 = () => {
  if (countTime02 <= 9) {
    valueTime02.innerHTML = "0" + countTime02;
  } else if (countTime02 > 9) {
    valueTime02.innerHTML = countTime02;
  }
};

let countTime01 = 0;
let intervalIDTime01 = 0;
plusButtonTime01.addEventListener("click", () => {
  if (countTime01 >= 0 && countTime01 < 40) {
    intervalIDTime01 = countTime01 += 1;
    console.log("botao + ANTES: "+controlet1,rotacaot1);
    updateTime01();
    updateValueTime01();
    updateBola01();
    controlet1 = "ponto";
    controlet2 = "semponto";
    console.log("botao + DPS: "+controlet1,rotacaot1);
  }
});
plusButtonTime01.addEventListener("mousedown", () => {
  if (countTime01 >= 0 && countTime01 < 40) {
    intervalIDTime01 = setInterval(() => {
      countTime01 += 1;
      updateTime01();
      updateValueTime01();
      updateBola01();
      controlet1 = "ponto";
      controlet2 = "semponto";
      if (countTime01 == 40) {
        clearInterval(intervalIDTime01);
      }
    }, 200);
  }
});
minusButtonTime01.addEventListener("click", () => {
  if (countTime01 > 0 && countTime01 <= 40) {
    intervalIDTime01 = countTime01 -= 1;
    updateMenusTime01();
    updateValueTime01();
    console.log(controlet1,rotacaot1);
  }
});
minusButtonTime01.addEventListener("mousedown", () => {
  if (countTime01 > 0 && countTime01 <= 40) {
    intervalIDTime01 = setInterval(() => {
      countTime01 -= 1;
      updateMenusTime01();
      updateValueTime01();
      if (countTime01 == 40 || countTime01 == 0) {
        clearInterval(intervalIDTime01);
      }
    }, 200);
  }
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime01));


var posiocaoLeftT1 = [0,0,55,55,55, 0];
var posiocaoTopT1 =  [37.5 ,2,2,37.5,75,75];

const jogador1 = document.querySelector(".jogador1");
const jogador2 = document.querySelector(".jogador2");
const jogador3 = document.querySelector(".jogador3");
const jogador4 = document.querySelector(".jogador4");
const jogador5 = document.querySelector(".jogador5");
const jogador6 = document.querySelector(".jogador6");

jogador1.style.left = `${posiocaoLeftT1[5]}%`;
jogador1.style.top =  `${posiocaoTopT1[5]}%`;
jogador2.style.left = `${posiocaoLeftT1[4]}%`;
jogador2.style.top =  `${posiocaoTopT1[4]}%`;
jogador3.style.left = `${posiocaoLeftT1[3]}%`;
jogador3.style.top =  `${posiocaoTopT1[3]}%`;
jogador4.style.left = `${posiocaoLeftT1[2]}%`;
jogador4.style.top =  `${posiocaoTopT1[2]}%`;
jogador5.style.left = `${posiocaoLeftT1[1]}%`;
jogador5.style.top =  `${posiocaoTopT1[1]}%`;
jogador6.style.left = `${posiocaoLeftT1[0]}%`;
jogador6.style.top =  `${posiocaoTopT1[0]}%`;

const updateTime01 = () => {  
  console.log("Controle de rotação +"+controlet1,rotacaot1);
  if (controlet1 == "semponto" && rotacaot1 == "mantem") {
    //Altera posição dos jogadores.
    moveLeft(posiocaoLeftT1);
    moveLeft(posiocaoTopT1);
  
    jogador1.style.left = `${posiocaoLeftT1[5]}%`;
    jogador1.style.top =   `${posiocaoTopT1[5]}%`;  
    jogador2.style.left = `${posiocaoLeftT1[4]}%`;
    jogador2.style.top =   `${posiocaoTopT1[4]}%`;  
    jogador3.style.left = `${posiocaoLeftT1[3]}%`;
    jogador3.style.top =   `${posiocaoTopT1[3]}%`;  
    jogador4.style.left = `${posiocaoLeftT1[2]}%`;
    jogador4.style.top =   `${posiocaoTopT1[2]}%`;  
    jogador5.style.left = `${posiocaoLeftT1[1]}%`;
    jogador5.style.top =   `${posiocaoTopT1[1]}%`;  
    jogador6.style.left = `${posiocaoLeftT1[0]}%`;
    jogador6.style.top =   `${posiocaoTopT1[0]}%`;
    rotacaot1 = "rotacionou";
    rotacaot2 = "mantem";
  } else {
    rotacaot1 = "mantem";
  }
};
const updateMenusTime01 = () => {  
  if (controlet1 == "ponto" && rotacaot1 == "rotacionou") {
    //Altera posição dos jogadores.
    moveRight(posiocaoLeftT1);
    moveRight(posiocaoTopT1);
    jogador1.style.left = `${posiocaoLeftT1[5]}%`;
    jogador1.style.top =   `${posiocaoTopT1[5]}%`;  
    jogador2.style.left = `${posiocaoLeftT1[4]}%`;
    jogador2.style.top =   `${posiocaoTopT1[4]}%`;  
    jogador3.style.left = `${posiocaoLeftT1[3]}%`;
    jogador3.style.top =   `${posiocaoTopT1[3]}%`;  
    jogador4.style.left = `${posiocaoLeftT1[2]}%`;
    jogador4.style.top =   `${posiocaoTopT1[2]}%`;  
    jogador5.style.left = `${posiocaoLeftT1[1]}%`;
    jogador5.style.top =   `${posiocaoTopT1[1]}%`;  
    jogador6.style.left = `${posiocaoLeftT1[0]}%`;
    jogador6.style.top =   `${posiocaoTopT1[0]}%`;
    controlet1 = "semponto";
    rotacaot1 = "mantem";
    rotacaot2 = "rotacionou";
  }
};
//Time 02
let countTime02 = 0;
let intervalIDTime02 = 0;
plusButtonTime02.addEventListener("click", () => {
  if (countTime02 >= 0 && countTime02 < 40) {
    intervalIDTime02 = countTime02 += 1;
    updateTime02();
    updateValueTime02();
    updateBola02();
    controlet2 = "ponto";
    controlet1 = "semponto";
    console.log("botao+"+controlet2,rotacaot2);
  }
});
plusButtonTime02.addEventListener("mousedown", () => {
  if (countTime02 >= 0 && countTime02 < 40) {
    intervalIDTime02 = setInterval(() => {
      countTime02 += 1;
      updateTime02();
      updateValueTime02();
      updateBola02();
      controlet2 = "ponto";
      controlet1 = "semponto";
      if (countTime02 == 40) {
        clearInterval(intervalIDTime02);
      }
    }, 200);
  }
});
minusButtonTime02.addEventListener("click", () => {
  if (countTime02 > 0 && countTime02 <= 40) {
    intervalIDTime02 = countTime02 -= 1;
    updateMenusTime02();
    updateValueTime02();
    console.log(controlet2,rotacaot2);
  }
});
minusButtonTime02.addEventListener("mousedown", () => {
  if (countTime02 > 0 && countTime02 <= 40) {
    intervalIDTime02 = setInterval(() => {
      countTime02 -= 1;
      updateMenusTime02();
      updateValueTime02();
      if (countTime02 == 40 || countTime02 == 0) {
        clearInterval(intervalIDTime02);
      }
    }, 200);
  }
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime02));

var posiocaoLeftT2 = [75, 75, 75, 25,  25,25];
var posiocaoTopT2 =  [ 0,37.5,75, 75,37.5, 0];
const jogador1t2 = document.querySelector(".jogador1t2");
const jogador2t2 = document.querySelector(".jogador2t2");
const jogador3t2 = document.querySelector(".jogador3t2");
const jogador4t2 = document.querySelector(".jogador4t2");
const jogador5t2 = document.querySelector(".jogador5t2");
const jogador6t2 = document.querySelector(".jogador6t2");

jogador1t2.style.left = `${posiocaoLeftT2[0]}%`;
jogador1t2.style.top =   `${posiocaoTopT2[0]}%`;
jogador2t2.style.left = `${posiocaoLeftT2[1]}%`;
jogador2t2.style.top =   `${posiocaoTopT2[1]}%`;
jogador3t2.style.left = `${posiocaoLeftT2[2]}%`;
jogador3t2.style.top =   `${posiocaoTopT2[2]}%`;
jogador4t2.style.left = `${posiocaoLeftT2[3]}%`;
jogador4t2.style.top =   `${posiocaoTopT2[3]}%`;
jogador5t2.style.left = `${posiocaoLeftT2[4]}%`;
jogador5t2.style.top =   `${posiocaoTopT2[4]}%`;
jogador6t2.style.left = `${posiocaoLeftT2[5]}%`;
jogador6t2.style.top =   `${posiocaoTopT2[5]}%`;

const updateTime02 = () => {
  if (controlet2 == "semponto" && rotacaot2 == "mantem") {
    //Altera posição dos jogadores.
    moveLeft(posiocaoLeftT2);
    moveLeft(posiocaoTopT2);

    jogador1t2.style.left = `${posiocaoLeftT2[0]}%`;
    jogador1t2.style.top =   `${posiocaoTopT2[0]}%`;
    jogador2t2.style.left = `${posiocaoLeftT2[1]}%`;
    jogador2t2.style.top =   `${posiocaoTopT2[1]}%`;
    jogador3t2.style.left = `${posiocaoLeftT2[2]}%`;
    jogador3t2.style.top =   `${posiocaoTopT2[2]}%`;
    jogador4t2.style.left = `${posiocaoLeftT2[3]}%`;
    jogador4t2.style.top =   `${posiocaoTopT2[3]}%`;
    jogador5t2.style.left = `${posiocaoLeftT2[4]}%`;
    jogador5t2.style.top =   `${posiocaoTopT2[4]}%`;
    jogador6t2.style.left = `${posiocaoLeftT2[5]}%`;
    jogador6t2.style.top =   `${posiocaoTopT2[5]}%`;
    rotacaot2 = "rotacionou";
    rotacaot1 = "mantem";
  } else {
    rotacaot2 = "mantem";
  }
};
const updateMenusTime02 = () => {
  if (controlet2 == "ponto" && rotacaot2 == "rotacionou") {
    //Altera posição dos jogadores.
    moveRight(posiocaoLeftT2);
    moveRight(posiocaoTopT2);

    jogador1t2.style.left = `${posiocaoLeftT2[0]}%`;
    jogador1t2.style.top =   `${posiocaoTopT2[0]}%`;
    jogador2t2.style.left = `${posiocaoLeftT2[1]}%`;
    jogador2t2.style.top =   `${posiocaoTopT2[1]}%`;
    jogador3t2.style.left = `${posiocaoLeftT2[2]}%`;
    jogador3t2.style.top =   `${posiocaoTopT2[2]}%`;
    jogador4t2.style.left = `${posiocaoLeftT2[3]}%`;
    jogador4t2.style.top =   `${posiocaoTopT2[3]}%`;
    jogador5t2.style.left = `${posiocaoLeftT2[4]}%`;
    jogador5t2.style.top =   `${posiocaoTopT2[4]}%`;
    jogador6t2.style.left = `${posiocaoLeftT2[5]}%`;
    jogador6t2.style.top =   `${posiocaoTopT2[5]}%`;
    controlet2 = "semponto";
    rotacaot2 = "mantem";
    rotacaot1 = "rotacionou";
  }
};

// Função para mover os elementos do vetor para a direita
function moveRight(arr) {
  const lastElement = arr.pop();
  arr.unshift(lastElement);
}

// Função para mover os elementos do vetor para a esquerda
function moveLeft(arr) {
  const firstElement = arr.shift();
  arr.push(firstElement);
}