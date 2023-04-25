/**
 * C->tréboles
 * D->diamántes
 * H->corazones
 * S->espadas
 */

let deck         = []; //aquí creamos nuesto deck
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');

//Esta función crear un nuevo deck
const crearDeck = () => {
    for (let index = 2; index <= 10 ; index++) {
        for (let tipo of tipos) {
            deck.push ( index + tipo );      
        }
    }

    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
            
        }
    }
    deck= _.shuffle( deck );
    console.log( deck );
    return deck;
}
crearDeck();

//función para pedir carta
const pedirCarta = () =>{
    
    if ( deck.length === 0){
       throw 'No hay cartas en el deck';
    }

    const carta = deck.shift(); // o podemos usar pop
    return carta;
}
// pedirCarta();

const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length -1);
    return ( isNaN ( valor ) ) ?
           (valor === 'A' ) ? 11 : 10
           : +valor 
}

// Eventos
btnPedir.addEventListener('click', () => {
   const carta = pedirCarta();
   puntosJugador = puntosJugador + valorCarta( carta );
   puntosHTML[0].innerText = puntosJugador;
});