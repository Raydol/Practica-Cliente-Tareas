/*
  Aquí creo el objeto principal de la práctica, Tarea.
*/
function Tarea () {
    this.id;
    this.texto;
    this.prioridad;
    this.estado;
}
//Esta variable orden se encarga de saber si ha sido pulsado o no el botón de ordenación por prioridad
//para que siempre esté activo a menos que se pulse el contrario de no ordenar.
var orden = false;
//Esta variable me sirve para incluir en el sessionStorage cada tarea creada sin conexión controlando su indice como si fuera un array indexado.
var index = 0;

//Este evento onload asocia la función ajax para mostrar el listado de tareas al inicio de la aplicación por si hay alguna guardada
//en la base de datos.
onload = ajax;
document.getElementById("boton").onclick = crearTarea;
document.getElementById("ordenPrio").onclick = ordenarPorPrioridad;
document.getElementById("borrar").onclick = borrar;
document.getElementById("stopOrdenPrio").onclick = function() {
  orden = false;
  ajax();
};


function crearTarea() {
  let texto = document.getElementById("texto").value;
  let prioridad = 3;
  let estado = "pendiente";

  let tarea = new Tarea();
  tarea.texto = texto;
  tarea.prioridad = prioridad;
  tarea.estado = estado;

  document.getElementById("texto").value = "";
  ajax(tarea, "annadir");
}

function modificarPrioridad() {
  let li = this.parentNode.parentNode;
  let tarea = new Tarea;
  tarea.id = li.getAttribute("id");
  ajax(tarea, "modificarPrioridad");
}

function modificarEstado() {
  let li = this.parentNode.parentNode;
  let tarea = new Tarea;
  tarea.id = li.getAttribute("id");
  ajax(tarea, "modificarEstado");
}

function ordenarPorPrioridad() {
  let lista = document.getElementById("lista");
      ajax(undefined, "ordenarPorPrioridad");
      orden = true;
}

function borrar() {
  let lista = document.getElementById("lista");
      ajax(undefined, "borrar")
}


/*
  Función encargada de comunicarse con el servidor, el cual añade, modifica, ordena, borra y tras eso,
  nos envía un json con las tareas para volverlas a pintar en la lista ya modificadas.

  Utilizo AJAX y no Fetch porque no sabía como manejar el status 200 para saber si tenía o no conectividad. Empecé haciendo fetch 
  para la primera funcionalidad y cuando ya tenía todo, a la hora de hacer la segunda para comprobar si hay o no conectividad y usar el 
  almacenamiento local tuve que cambiar todo.

  Ahora pensando puedo enviarme desde el servidor un código en la respuesta http y si ese código no me ha llegado es porque no ha sido
  capaz de conectarse con el servidor y de ahi usar esa condición. Se me acaba de ocurrir pero quería enviartelo ya para quitarmelo de encima 
  y seguir con lo siguiente que me propongas.

  - El parámetro 1 es la tarea (cuando la necesitamos, si no, la creo para añadirle un atributo que representa la opción a ejecutar en el servidor,
    para así enviarlo más fácilmente en el cuerpo de la petición).
  - El parámetro 2 es la opcion, la cual inserto en la tarea para enviarlo más fácilmente al servidor.
*/
function ajax(tarea = new Tarea, opcion = "listar") {
  var req;
  tarea.opcion = opcion;
  if (orden) {
    tarea.orden = true;
  }

  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    req = ActiveXObject("Microsoft.XMLHTTP");
  }

  if (req) {
      req.onreadystatechange = function () {
          if (req.readyState == 4) {
              if (req.status == 200) {
                  var type = req.getResponseHeader("Content-Type");
                  if (type === "application/json") {
                      listarTareas(JSON.parse(req.responseText));
                  }
              } else {
                if (opcion != "annadir") {
                  alert("No hay conexión con el servidor,\nsin conexión solo puedes agregar tareas y estás se almacenarán y serán mostradas cuando vuelva a haber conexión");
                } else {
                  let task = new Tarea();
                  task.texto = tarea.texto;
                  task.prioridad = tarea.prioridad;
                  task.estado = tarea.estado;
                  guardarTareaEnSessionStorage(task);
                }
              }
          }
      }

        req.open("POST", "servidor.php");
        req.send(JSON.stringify(tarea));

  }
}

/*
  Esta función es la que recibe los datos que nos llegan del servidor y pinta en la lista todas las tareas.
*/
function listarTareas(tareas) {
  document.getElementById("lista").innerHTML = "";
  if (tareas.length > 0) {
    for(let tarea of tareas) {
      let lista = document.getElementById("lista");
      let li = document.createElement("li");
      let divTarea = document.createElement("div");
      let divPrioridad = document.createElement("div");
      let parrafoTexto = document.createElement("p");
      
      li.setAttribute("id", tarea.id);
      parrafoTexto.setAttribute("class", tarea.estado);
      divPrioridad.setAttribute("class", "prioridad prioridad" + tarea.prioridad);
      
      divPrioridad.onclick = modificarPrioridad;
      parrafoTexto.onclick = modificarEstado;

      parrafoTexto.innerHTML = tarea.texto;

      divTarea.appendChild(divPrioridad);
      divTarea.appendChild(parrafoTexto);

      li.appendChild(divTarea);

      lista.appendChild(li);

    }
  }
}

/*
  Esta función guarda en el almacenamiento local cada una de las tareas que se han creado cuando no habia conexión.
  Las almacena sólo hasta que se cierra el navegador, probé tambien el localstorage que las guarda indefinidamente.
*/
function guardarTareaEnSessionStorage(task) {
  sessionStorage[index] = JSON.stringify(task);
  index++;

}

/*
  Esta función comprueba cada 5 segundos si hay o no conectividad con el servidor y, si la hay, añade todas las tareas
  guardadas del sessionStorage en el servidor y en la lista.

  Uso AJAX por lo mismo que comentaba antes
*/
setInterval(function() {
  var req;
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    req = ActiveXObject("Microsoft.XMLHTTP");
  }

  if (req) {
      req.onreadystatechange = function () {
          if (req.readyState == 4) {
              if (req.status == 200) {
                for (let i = 0; i < sessionStorage.length; i++) {
                  ajax(JSON.parse(sessionStorage[i]), "annadir");
                }
                sessionStorage.clear();
                index = 0;
              }
          }
      }
      req.open("GET", "servidor.php");
      req.send();
  }

}, 5000);