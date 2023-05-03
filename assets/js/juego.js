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
const btnPedir             = document.querySelector('#btnPedir');
const btnDetener           = document.querySelector('#btnDetener');
const btnNuevo             = document.querySelector('#btnNuevo');


const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML           = document.querySelectorAll('small');

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

// lógica de la computadora--> turno de la computadora
const turnoComputadora = ( puntosMinimos) =>{

    do{
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;
 
    const imgCarta  = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
        break;
    }
    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie Gana: vuelve a intertar otra mano');
        }else if ( puntosMinimos > 21){
            alert('Computadora Gana');
        }else if (puntosComputadora > 21){
            alert('Jugador Gana');
        }else{
            alert('Computadora Gana');
        }
    }, 100);
}

// Eventos
btnPedir.addEventListener('click', () => {
   const carta = pedirCarta();
   puntosJugador = puntosJugador + valorCarta( carta );
   puntosHTML[0].innerText = puntosJugador;

   const imgCarta  = document.createElement('img');
   imgCarta.src = `assets/cartas/${ carta }.png`;
   imgCarta.classList.add('carta');
   divCartasJugador.append(imgCarta);

   if (puntosJugador > 21) {
        console.warn("lo siento, pasaste los 21 puntos");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
        
    }else if(puntosJugador === 21){
        console.warn('21, genial');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );
   }
});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador);

});

btnNuevo.addEventListener('click',()=>{

    console.clear();
    deck=[];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText  = 0;
    puntosHTML[1].innerText  = 0;

    divCartasComputadora.innerText = '';
    divCartasJugador.innerHTML     = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});