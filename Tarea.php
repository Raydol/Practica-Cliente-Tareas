<?php

class Tarea 
{
    public $id;
    public $texto;
    public $prioridad;
    public $estado;

    function __construct($id, $texto, $prioridad, $estado) {
        $this->id = $id;
        $this->texto = $texto;
        $this->prioridad = $prioridad;
        $this->estado = $estado;
    }
}