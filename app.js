let listNumerosSorteados = [];
let numeroMaximo = 10;
let intentos = 0;

let numeroSecreto = generarNumeroSecreto(); 

function asignarTexto(elemento, texto){
    let elementoHTML = document.querySelector(elemento)
    elementoHTML.innerHTML = texto
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listNumerosSorteados.length === numeroMaximo) {
        asignarTexto('#mensaje', 'Ya se sortearon todos los números posibles');
        return null; 
    }

    if (listNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto(); 
    } else {
        listNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function verificarNumero() {
    limpiarMensaje();

    let numeroUsuario = parseInt(document.getElementById('numeroDelUsuario').value);

    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > numeroMaximo) {
        asignarTexto('#mensaje', `Por favor ingresá un número válido entre 1 y ${numeroMaximo}`);
        limpiarInput();
        return;
    }
    if (numeroSecreto === null) {
    asignarTexto('#mensaje', 'Ya adivinaste todos los números posibles.');
    return;
}


    intentos++;

    if (numeroUsuario === numeroSecreto) {
        asignarTexto('#mensaje', `¡Acertaste el número secreto! Lo hiciste en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}.`);
        document.querySelector('#reiniciar').removeAttribute('disabled');
    } else if (numeroUsuario < numeroSecreto) {
        asignarTexto('#mensaje', `El número secreto es mayor a ${numeroUsuario}`);
        limpiarInput();
    } else {
        asignarTexto('#mensaje', `El número secreto es menor a ${numeroUsuario}`);
        limpiarInput();
    }

    return numeroUsuario;
}


function limpiarInput(){
    document.querySelector('#numeroDelUsuario').value = ''
}

function limpiarMensaje() {
    document.getElementById('mensaje').textContent = '';
}


function reiniciarJuego() {
    numeroSecreto = generarNumeroSecreto();
    if (numeroSecreto === null) {
        asignarTexto('#mensaje', 'Todos los números ya fueron adivinados. ¡Buen trabajo!');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
        document.querySelector('.container__boton').setAttribute('disabled', 'true');
        return;
    }

    intentos = 0;
    limpiarInput();
    limpiarMensaje();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    asignarTexto('#mensaje', `Ingresa un número del 1 al ${numeroMaximo}`);
}


asignarTexto('h1','Adivina el numero secreto')
asignarTexto('#mensaje',`Ingresa un numero del 1 al ${numeroMaximo}`)

