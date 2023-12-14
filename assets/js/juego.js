/*
las cartas estan en ingles por eso lo vamos a trabajar de esta forma

2C = dos de trebol
2D = dos de diamantes
2H = dos de corazones
2S = dos de espadas
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
  puntosBot = 0;
//esta funcion crea la baraja

//referencias html
const btnPedir = document.querySelector("#btnPedir");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDetener = document.querySelector("#btnDetener");
let renderPuntos = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasBot = document.querySelector("#bot-cartas");

const crearDeck = () => {
  //ciclos para crear las cartas del 2 al 10
  for (let i = 2; i <= 10; i++) {
    // deck.push(i + "C");
    for (const tipo of tipos) {
      // las empujamos dentro del deck
      deck.push(i + tipo);
    }
  }
  for (const tipo of tipos) {
    //ciclo de creacion de cartas especiales
    for (const esp of especiales) {
      //empujamos las cartas especiales al deck
      deck.push(esp + tipo);
    }
  }
  //   console.log(deck);
  //usamos el metodo shuffle para revolver el deck
  //recordar que este metodo lo sacamos de la libreria underscore
  deck = _.shuffle(deck);
  //retorna el arreglo barajeado o revuelto
  //   console.log(deck);
  return deck;
};
crearDeck();
//esta funcion permite tomar una carta

const pedirCarta = () => {
  // esta condicion nos permite definir una validacion en caso que no existan cartas dentro del deck
  if (deck.length === 0) {
    // dada la condicion de decimos al programa que pare mediante un throw y un mensaje
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  // console.log(deck);
  // console.log(carta);
  return carta;
};
// pedirCarta();
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1); //este es un metodo que nos permite cortar un string dando la posicion inicial y una posicion final que podemos definir y con .length -1 le decimos que queremos obviar la ultima posicion
  // console.log(valor);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  // if (isNaN(valor)) {
  //   // console.log("No es un numero");
  //   puntos = valor === "A" ? 11 : 10;
  // } else {
  //   // console.log("Es un numero");
  //   puntos = valor * 1; //multiplicamos * 1 para convertir el valor de los puntos a un valor numerico
  // }
};
// -----LOGICA DEL BOT INICIO-----
const turnoBot = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosBot = puntosBot + valorCarta(carta);
    renderPuntos[1].innerText = puntosBot;
    //desplegando la carta inicio--
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasBot.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosBot < puntosMinimos && puntosMinimos <= 21);
  //aqui termina el turno del bot entonces establecemos las condiciones para las alertas
  setTimeout(() => {
    if (puntosBot === puntosMinimos) {
      alert("Nadie gana 😒");
    } else if (puntosMinimos > 21) {
      alert("Bot gano!! 🤖");
    } else if (puntosBot > 21) {
      alert("Ganaste!! 🤩🤩");
    } else {
      alert("Bot gano!! 🤖");
    }
  }, .1);
};
// -----LOGICA DEL BOT FIN-----
const valor = valorCarta(pedirCarta()); // esta es la simulacion para verificar el valor de la carta dentro de la funcion (parametro)
// console.log({valor});

// eventos
//escucha al boton de pedir carta
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  console.log(carta);
  puntosJugador = puntosJugador + valorCarta(carta);
  renderPuntos[0].innerText = puntosJugador;
  //desplegando la carta inicio--
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);
  //desplegando la carta fin--
  //condiciones para que el juego acabe INICIO
  if (puntosJugador > 21) {
    console.warn("Lo siento perdiste");

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoBot(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21 Genial!!");
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoBot(puntosJugador);
  }
  //condiciones para que el juego acabe FIN
});
//escucha al boton de detener
btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoBot(puntosJugador);
});
btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();
  renderPuntos[0].innerText = 0;
  renderPuntos[1].innerText = 0;
  puntosBot = 0;
  puntosJugador = 0;
  btnDetener.disabled = false;
  btnPedir.disabled = false;
  divCartasBot.innerHTML = "";
  divCartasJugador.innerHTML = "";
});
