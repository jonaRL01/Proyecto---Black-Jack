/**
 * C->tréboles
 * D->diamántes
 * H->corazones
 * S->espadas
 */

let deck         = []; //aquí creamos nuesto deck
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

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
    console.log(deck);
    console.log(carta);
    return carta;
}
// pedirCarta();

