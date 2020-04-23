function Tarea (texto, prioridad, estado) {
    this.texto = texto;
    this.prioridad = prioridad;
    this.estado = estado;

    this.establecerPrioridad = (prioridad) => {
        if (prioridad == "prioridad3") {
            return "prioridad2";
        } else if (prioridad == "prioridad2") {
            return "prioridad1";
        } else {
            return "prioridad3";
        }
    };

    this.establecerEstado = (estado) => {
        if (estado == "realizada") {
            return "pendiente";
        } else {
            return "realizada";
        }
    }
    
}
var tareas = [];
/* 
  - Index es una variable global que uso para saber en la lista de tareas, qué tarea es cada una según su posición en el array. 

  - Se que no es una buena idea ya que si implemento un botón que borre las tareas finalizadas, si las borro también del 
    array no sabría qué tarea es cual
*/
var index = -1; 
document.getElementById("boton").onclick = annadirTarea;

function annadirTarea() {
    let inputTexto = document.getElementById("texto");

    let tarea = new Tarea(inputTexto.value, 3, "pendiente");
    tareas.push(tarea);
    index++;

    let lista = document.getElementById("lista");

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

    lista.appendChild(divTarea);

}

function manejadorPrioridad() {
    let tarea = tareas[this.parentNode.getAttribute("id")];
    this.setAttribute("id", tarea.establecerPrioridad(this.getAttribute("id")));
}

function manejadorEstado() {
    let tarea = tareas[this.parentNode.getAttribute("id")];
    this.setAttribute("id", tarea.establecerEstado(this.getAttribute("id")));
}





