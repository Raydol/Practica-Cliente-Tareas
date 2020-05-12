<?php require_once "Orm.php"; ?>

<?php
    $json = file_get_contents("php://input");
    $tarea = json_decode($json);

    switch ($tarea->opcion) {
        case "listar":
            $orm = new Orm();
            header("Content-Type: application/json");
            echo json_encode($orm->obtenerTodasLasTareas());

        break;
        case "annadir":
            $orm = new Orm();
            $orm->insertarTarea($tarea);
            header("Content-Type: application/json");
            if (isset($tarea->orden)) {
                echo json_encode($orm->obtenerTareasOrdenadasPorPrioridad());
            } else {
                echo json_encode($orm->obtenerTodasLasTareas()); 
            }
        break;

        case "modificarEstado":
            $orm = new Orm();
            $task = $orm->obtenerTarea($tarea->id);
            if ($task->estado == "realizada") {
                $task->estado = "pendiente";
            } else {
                $task->estado = "realizada";
            }

            $orm->modificarTarea($task);
            header("Content-Type: application/json");
            if (isset($tarea->orden)) {
                echo json_encode($orm->obtenerTareasOrdenadasPorPrioridad());
            } else {
                echo json_encode($orm->obtenerTodasLasTareas()); 
            }
        break;

        case "modificarPrioridad":
            $orm = new Orm();
            $task = $orm->obtenerTarea($tarea->id);
            if ($task->prioridad == 3) {
                $task->prioridad = 2;
            } else if ($task->prioridad == 2) {
                $task->prioridad = 1;
            } else {
                $task->prioridad = 3;
            }

            $orm->modificarTarea($task);
            header("Content-Type: application/json");
            if (isset($tarea->orden)) {
                echo json_encode($orm->obtenerTareasOrdenadasPorPrioridad());
            } else {
                echo json_encode($orm->obtenerTodasLasTareas()); 
            }
        break;

        case "ordenarPorPrioridad":
            $orm = new Orm();
            header("Content-Type: application/json");
            echo json_encode($orm->obtenerTareasOrdenadasPorPrioridad());
        break;

        case "borrar":
            $orm = new Orm();
            $orm->borrarTareasRealizadas();
            header("Content-Type: application/json");
            if (isset($tarea->orden)) {
                echo json_encode($orm->obtenerTareasOrdenadasPorPrioridad());
            } else {
                echo json_encode($orm->obtenerTodasLasTareas()); 
            }
        break;
    }


    

    


