<?php
    require_once "Tarea.php";
class Orm
{
    public $servername = "localhost";
    public $username = "cliente";
    public $password = "12345678";
    public $dbname = "tareas";

    function obtenerTodasLasTareas() {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "select id, texto, prioridad, estado from tarea";
        $resultset = $conn->query($sql);
        $tareas = [];
        while ($row = $resultset->fetch_assoc()) {
            array_push($tareas, new Tarea($row["id"], $row["texto"], $row["prioridad"], $row["estado"]));
        }
        $conn->close();
        return $tareas;
    }

    function insertarTarea($tarea) {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "insert into tarea (texto, prioridad, estado) values (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sis", $tarea->texto, $tarea->prioridad, $tarea->estado);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

    function obtenerTarea($id) {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "select id, texto, prioridad, estado from tarea where id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultset = $stmt->get_result();
        while ($row = $resultset->fetch_assoc()) {
            $tarea = new Tarea($row["id"], $row["texto"], $row["prioridad"], $row["estado"]);
        }
        $stmt->close();
        $conn->close();
        return $tarea;
    }

    function modificarTarea($tarea) {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "update tarea set texto = ?, prioridad = ?, estado = ? where id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sisi", $tarea->texto, $tarea->prioridad, $tarea->estado, $tarea->id);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

    function obtenerTareasOrdenadasPorPrioridad() {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "select id, texto, prioridad, estado from tarea order by prioridad";
        $resultset = $conn->query($sql);
        $tareas = [];
        while ($row = $resultset->fetch_assoc()) {
            array_push($tareas, new Tarea($row["id"], $row["texto"], $row["prioridad"], $row["estado"]));
        }
        $conn->close();
        return $tareas;
    }

    function borrarTareasRealizadas() {
        $estado = "realizada";
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "delete from tarea where estado = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $estado);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

}