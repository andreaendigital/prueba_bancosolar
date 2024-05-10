// // IMPORTANDO EL MANEJADOR DE ERRORES
// import { getDatabaseError } from "../lib/errors/databaseError.js";

// importando paquetes instalados necesarios
require('dotenv').config();

// importando lo que necesitas de conection.js, conexion a la BD
const { pool } = require('../database/conecction.js');

// Funcion para insertar usuarios a la bd
async function insertar (datos) {
    //insertar recibe el array datos 
    console.log("Valores recibidos: " , datos);
    const [nombre, balance] = datos; // Extraer datos del array datos

    //contruyo el pool query y lo asigno a variable. 
    // - se invoca la variable pool y metodo query, dentro del query paso dos cosas
    //las puedo pasar como objeto entonces abro {}
    const result = await pool.query({ 
        //construimos la instrucción y asignamos valores
        text: 'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *',
        values: [nombre, balance]
    })
    //para saber lo que me responde la instrucción: 
    console.log("valor de result :", result);
    //La función necesita devolver algo para entregarle a la ruta, necesita un return.
    //Valor del result o del registro agregado:
    console.log("Registro agregado row cero: " , result.rows[0]); 
    //Respuesta de la función:
    return result.rows[0];
    //resultado del camino feliz
    //nos toca programar los caminos infelices, manejo de errores: parametros incompletos, parametros distinto tipo de dato, etc.
    // return "Registro agregado con éxito"   //respuesta de prueba
};

async function consultar () {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
}

async function editar (id, datos){
    //editar recibe el array datos 
    console.log("Valores recibidos: " , datos);
    const [name, balance] = datos; // Extraer datos del array datos

    const query = {
        text: 'UPDATE usuarios SET balance = $1 WHERE id = $2 RETURNING *',
        values: [balance, id]
    };

    const result = await pool.query(query);
    return result.rows[0]; // Devolver la canción actualizada
}

module.exports = {insertar, consultar, editar}; //exporto la función
