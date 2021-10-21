//Se agrega el evento para ejecutar la funcion cuando haya cargado todo el DOM
document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})


function iniciarApp() {

    btnValidarGenero();
    validar();
}

var nombre = '';//Variable nombre para obtener el valor ingresado en el input


//Diferentes excepciones populares de nombres 
var excepcion_S = ['dolores', 'mercedes', 'ines'];
var excepcion_R = ['pilar', 'ester', 'leonor'];
var excepcion_N = ['allison', 'alyson', 'alison', 'asunción', 'asuncion'];
var excepcion_EN = 'ruben';
var excepcion_E = ['dulce', 'irene', 'matilde', 'nicole', 'angie', 'geraldine'];
var excepcion_LyD = ['anabel', 'maribel', 'marisol', 'raquel', 'soledad', 'ingrid'];
var nombresNoComunes = ['asly', 'araceli', 'leidy'];


//Arreglo de consonantes para validar si hay algun nombre mal escrito
var consonantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];

//Funcion para validar si lo ingresado en el input son unicamente letras
function validarTexto(texto) {
    var patron = /^[a-zA-Z\s]*$/;

    if (texto.search(patron)) {
        return false;
    } else {
        return true;
    }
}


//Validacion del input para ver si lo ingresado son solo letras y verificar la extension del texto
function validar() {

    const nombreInput = document.getElementById('nombre');
    nombreInput.addEventListener('input', e => {
        let nombreTexto = e.target.value.trim();

        if (validarTexto(nombreTexto) == false) {
            console.log('No se aceptan números')
            mostrarAlerta('No se aceptan datos numéricos en un nombre');

            return;
        } else if (nombreTexto.length < 3 || nombreTexto.length > 15) {
            mostrarAlerta('Los nombres comunes van entre 3 a 15 caracteres');

            return;
        }
        else {
            console.log('Dato valido');
            mostrarAlerta('');
            nombre = nombreTexto.toLowerCase();
        }
    })



}

//Funcion que se le asiganara al boton que tenemos en el HTML "validar"
function btnValidarGenero() {
    const boton = document.getElementById('btn_validar');
    boton.addEventListener('click', e => {
        e.preventDefault();
        console.log(nombre);


        //Se crean contadores para validar cuantas veces se repiten consonantes al inicio y al final
        let contador1 = 0;
        let contador2 = 0;
        for (i = 0; i < 3; i++) {
            
            //Si hay una o varias(maximo 3) una consonante al inicio se suma una unidad a contador2
            let aux = nombre[i];
            if (consonantes.includes(aux)) {
                contador1++;
            }
            //Si hay una o varias(maximo 3) una consonante al final se suma una unidad a contador2
            let aux2 = nombre.length - (i + 1);
            let nombreAux = nombre[aux2];
            if (consonantes.includes(nombreAux)) {
                contador2++;
            }

            console.log(aux, nombreAux)
        }

        //Si se repiten varias consonantes en los extremos del texto posiblemente el nombre este mal excrito o en otro dioma
        if (contador1 == 3 || contador2 == 3) {
            resultado(`${nombre[0].toUpperCase() + nombre.slice(1)} no es un nombre común en español(o está mal escrito), posiblemente este en otro idioma. Ingresa uno en español`)
        } // Se agregan condiciones principales para validar si es nombre de hombre
         else if (nombre.endsWith('o') || nombre == 'jose maria' || nombre == excepcion_EN) {
            resultado(`${nombre[0].toUpperCase() + nombre.slice(1)} es nombre de hombre`);
        } // Se agregan condiciones principales para validar si es nombre de mujer
        else if (nombre.endsWith('a') || nombre.endsWith('h') || nombre.endsWith('z') || nombre.endsWith('en') || nombre == 'maria jose' || excepcion_S.includes(nombre) || excepcion_R.includes(nombre) || excepcion_N.includes(nombre) || excepcion_E.includes(nombre) || excepcion_LyD.includes(nombre) || nombresNoComunes.includes(nombre)) {
            resultado(`${nombre[0].toUpperCase() + nombre.slice(1)} es nombre de mujer`);
        }//Por descarte la mayor posibilidad es que el ingresado sea nombre de hombre 
        else {
            resultado(`${nombre[0].toUpperCase() + nombre.slice(1)} es nombre de hombre`);
        };


    }
    )
}

//Se crea la funcion resultado con el fin de mostrar el resultado en pantalla
function resultado(mensaje) {
    const resultadoPrevio = document.querySelector('.resultado');
    if (resultadoPrevio) {
        resultadoPrevio.remove();

    }


    const resultado = document.createElement('DIV');
    resultado.textContent = mensaje;
    resultado.classList.add('resultado');



    const formulario = document.querySelector('.datos');
    formulario.appendChild(resultado);

    if (mensaje == '') {
        resultado.remove();
    }

}


//Se crea la funcion mostrarAlerta con el fin de mostrar el error/alerta en pantalla
function mostrarAlerta(mensaje) {

    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();

    }


    const alert = document.createElement('DIV');
    alert.textContent = mensaje;
    alert.classList.add('alerta');



    const formulario = document.querySelector('.datos');
    formulario.appendChild(alert);

    if (mensaje == '') {
        alert.remove();
    }

}