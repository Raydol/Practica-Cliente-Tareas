
/*
  Aquí creo el objeto principal de la práctica, Tarea.
*/
function Tarea (texto, prioridad, estado) {
    this.texto = texto;
    this.prioridad = prioridad;
    this.estado = estado;

    this.establecerPrioridad = (prioridad) => {
        if (prioridad == "prioridad3") {
            this.prioridad = 2;
            return "prioridad2";
        } else if (prioridad == "prioridad2") {
            this.prioridad = 1;
            return "prioridad1";
        } else {
            this.prioridad = 3;
            return "prioridad3";
        }
    };

    this.establecerEstado = (estado) => {
        if (estado == "realizada") {
            this.estado = "pendiente";
            return "pendiente";
        } else {
            this.estado = "realizada";
            return "realizada";
        }
    }
}

var tareas = [];

/* 
  - Index es una variable global que uso para saber en la lista de tareas, qué tarea es cada una según su posición en el array.
  - Me sirve para colocar en cada hijo de li un atributo id cuyo valor es el index (la posición que ocupa en el array).
  - No sé si es la mejor decisión, y cuál sería mejor para saber qué tarea de la lista de tareas es cual dentro del array.
  - Sea como sea tengo en mente alguna forma de hacer los filtrados por texto y las ordenaciones por prioridad y borrados siguiendo esta línea de
    la variable global index si no te parece mala idea.
*/
var index = -1;

document.getElementById("boton").onclick = crearTarea;
document.getElementById("ordenPrio").onclick = ordenarPorPrioridad;
document.getElementById("borrarRealizadas").onclick = borrarTareasRealizadas;

comprobarLista();

/*
  Este es el manejador de eventos que llamo cuando quiero crear una nueva tarea. Por defecto su prioridad es 3 y su estado pendiente.
*/
function crearTarea() {
    let inputTexto = document.getElementById("texto");
    let tarea = new Tarea(inputTexto.value, 3, "pendiente");
    tareas.push(tarea);
    index++;
    listarTarea(tarea, index);
    inputTexto.value = "";

}

/*
  Este es el manejador que lleva el cambio de prioridad si el cuadrado es pulsado, sirviéndose del metodo establecerPrioridad del objeto Tarea
  encapsulado como me dijiste.
*/
function manejadorPrioridad() {
    let tarea = tareas[this.parentNode.getAttribute("id")];
    this.setAttribute("id", tarea.establecerPrioridad(this.getAttribute("id")));
}
/*
  Y este lo mismo, pero el manejador del estado si el texto de la tarea es pulsado.
*/
function manejadorEstado() {
    let tarea = tareas[this.parentNode.getAttribute("id")];
    this.setAttribute("id", tarea.establecerEstado(this.getAttribute("id")));
}


/*
  Esta función es la encargada de ordenar todas las tareas de la lista por su prioridad.
*/
function ordenarPorPrioridad() {

    document.getElementById("lista").innerHTML = "";
    tareas.sort((a, b) => {
        if (a.prioridad > b.prioridad) {
            return 1;
        }

        if (a.prioridad < b.prioridad) {
            return -1;
        }

        if (a.prioridad == b.prioridad) {
            return 0;
        }
    });
    index = -1;

    for (let tarea of tareas) {
        index++;
        if (tarea.estado != "borrada") {
            listarTarea(tarea, index);
        }
    }
}

/*
  Esta función borra las tareas realizadas de la lista (no del array) y les establece un tercer estado que es "borrada". Para asi cuando ordenemos 
  otras nuevas tareas o las que ya estaban, no vuelvan a aparecer las tareas borradas.
*/
function borrarTareasRealizadas() {

    document.getElementById("lista").innerHTML = "";
    index = -1;
    for (let tarea of tareas) {
        index++;
        if (tarea.estado == "pendiente") {
            listarTarea(tarea, index);
        } else if (tarea.estado == "realizada") {
            tarea.estado = "borrada";
        }
    }
    comprobarLista();
    comprobarArray();
}


/*
  Esta función comprueba si la lista está vacía y si lo está, oculta los botones de ordenación y borrado para evitar errores.
*/
function comprobarLista() {
    var botonesFiltrado = document.getElementsByClassName("filtrados");
    var lista = document.getElementById("lista");

    if (lista.childNodes.length == 0) {
        for (let boton of botonesFiltrado) {
            boton.style.display = "none";
        }
    } else {
        for (let boton of botonesFiltrado) {
            boton.style.display = "inline-block";
        }
    }
}


/*
  Esta función añade a la lista una tarea.
*/
function listarTarea(tarea, index) {

    let lista = document.getElementById("lista");
    let inputTexto = tarea.texto;
    let li = document.createElement("li");
    let divTarea = document.createElement("div");
    let divPrioridad = document.createElement("div");
    let parrafoTexto = document.createElement("p");

    divTarea.setAttribute("id", index);
    parrafoTexto.setAttribute("id", tarea.estado);
    divPrioridad.setAttribute("class", "prioridad");
    divPrioridad.setAttribute("id", "prioridad" + tarea.prioridad);

    divPrioridad.onclick = manejadorPrioridad;
    parrafoTexto.onclick = manejadorEstado;

    parrafoTexto.innerHTML = inputTexto;

    divTarea.appendChild(divPrioridad);
    divTarea.appendChild(parrafoTexto);
    li.appendChild(divTarea);

    lista.appendChild(li);
    comprobarLista();
}


/*
  Esta función comprueba si el array solo tiene tareas borradas y si es así lo vacía.
*/
function comprobarArray() {
    let contadorBorradas = 0;
    for (let tarea of tareas) {
        if (tarea.estado == "borrada") {
            contadorBorradas++;
        }
    }

    if (contadorBorradas == tareas.length) {
        tareas = [];
        index = -1;
    }
}





