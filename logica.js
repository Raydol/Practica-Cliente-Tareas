
// Aqui creo el objeto principal de la práctica, Tarea.

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
  - No sé si es la mejor decisión, y cuál sería mejor para saber qué tarea dentro del array es cual en la lista de tareas.
  - Sea como sea tengo en mente alguna forma de hacer los filtrados por texto y las ordenaciones por prioridad y borrados siguiendo esta línea de
    la variable global index si no te parece mala idea.
*/
var index = -1; 
document.getElementById("boton").onclick = annadirTarea;

//Este es el manejador de eventos que llamo cuando quiero crear una tarea y añadirla a la lista. Por defecto su prioridad es 3 y su estado pendiente.
function annadirTarea() {
    let inputTexto = document.getElementById("texto");

    let tarea = new Tarea(inputTexto.value, 3, "pendiente");
    tareas.push(tarea);
    index++;

    let lista = document.getElementById("lista");

    let li = document.createElement("li");
    let divTarea = document.createElement("div");
    let divPrioridad = document.createElement("div");
    let parrafoTexto = document.createElement("p");

    divTarea.setAttribute("id", index);
    parrafoTexto.setAttribute("id", "pendiente");
    divPrioridad.setAttribute("class", "prioridad");
    divPrioridad.setAttribute("id", "prioridad3");

    divPrioridad.onclick = manejadorPrioridad;
    parrafoTexto.onclick = manejadorEstado;

    parrafoTexto.innerHTML = inputTexto.value;
    inputTexto.value = "";

    divTarea.appendChild(divPrioridad);
    divTarea.appendChild(parrafoTexto);
    li.appendChild(divTarea);

    lista.appendChild(li);

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





