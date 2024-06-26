// // IMPORTANDO EL MANEJADOR DE ERRORES
const errors = require("../handleErrors/handleErrors.js");

// importando paquetes instalados necesarios
require("dotenv").config();

// importando lo que necesitas de conection.js, conexion a la BD
const { pool } = require("../database/conecction.js");

//variables globales de index.js
let status = "";
let message = "";

//-------------------------------------------------------------------------------------------
// Funcion para insertar usuarios a la bd
async function insertar(datos) {
  try {
    //insertar recibe el array datos
    console.log("Valores recibidos: ", datos);
    const [nombre, balance] = datos; // Extraer datos del array datos

    //contruyo el pool query y lo asigno a variable.
    const result = await pool.query({
      //construimos la instrucción y asignamos valores
      text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
      values: [nombre, balance],
    });
    //para saber lo que me responde la instrucción:
    //console.log("valor de result :", result);
    //Respuesta de la función:
    //   return result.rows[0];
    if (result.rows != 0) {
      //si el número de filas es distinto a cero, mostrar el mensaje:
      console.log("Número de Usuarios agregados:", result.rowCount);
      //Valor del result o del registro agregado:
      console.log("Usuario Agregado ", result.rows[0]);
      return result.rows[0];
    } else {
      //si hay 0 filas mostrar mensaje:
      console.log("No se han agregado usuarios");
      return "No se han agregado usuarios";
    }
  } catch (err) {
    console.log("Error General: ", err);
    const final = errors(err.code, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
    return final;
  }
}

//-------------------------------------------------------------------------------------------
//Función para consultar la base de datos y enlistar la tabla usuarios
async function consultar() {
  const result = await pool.query("SELECT * FROM usuarios");
  return result.rows;
}

//-------------------------------------------------------------------------------------------
//Función para editar el balance de un usuario
async function editar(id, datos) {
  try {
    //editar recibe el array datos
    console.log("Valores recibidos: ", datos);
    const [name, balance] = datos; // Extraer datos del array datos

    const query = {
      text: "UPDATE usuarios SET balance = $1 WHERE id = $2 RETURNING *",
      values: [balance, id],
    };

    const result = await pool.query(query);
    return result.rows[0]; // Devolver el usuario actualizado

  } catch (err) {
    console.log("Error General: ", err);
    const final = errors(err.code, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
    return final;
  }
}

//-------------------------------------------------------------------------------------------
//Función para eliminar un usuario por id recibido como un query.string
async function eliminar(id) {
  const result = await pool.query(
    "DELETE FROM usuarios WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0]; //devuelve el registro eliminado
}

//-------------------------------------------------------------------------------------------
// Funcion para registrar las transferencias realizadas en la bd
async function transferir(datos) {
  //insertar recibe el array datos
  console.log("Valores recibidos: ", datos);
  const [emisor, receptor, monto] = datos; // Extraer datos del array datos
//   console.log("Valor emisor: ", emisor);
//   console.log("Valor receptor: ", receptor);
//   console.log("Valor monto: ", monto);
  try {
    // Inicia una transacción
    await pool.query("BEGIN"); // Comienza la transacción

    // Descontar el monto del emisor
    const descuento = await pool.query(
      "UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING *",
      [monto, emisor]
    );

    if (descuento.rowCount == 1) {
      console.log("Descuento realizado con éxito: ", descuento.rows[0]);
      console.log("*** Operacion de Descuento Completa y Exitosa ***");
    } else {
      console.log("No existe el cliente para descontar");
      await pool.query("ROLLBACK");
      return "*** Transaccion Incompleta, se aplico ROLLBACK ***";
    }

    // Acreditar el monto al receptor
    const acreditacion = await pool.query(
      "UPDATE usuarios SET balance = balance + $1 WHERE id = $2 RETURNING *",
      [monto, receptor]
    );

    if (acreditacion.rowCount == 1) {
      console.log("Acreditación realizada con éxito: ", acreditacion.rows[0]);
    } else {
      console.log("No existe el cliente para acreditar");
      await pool.query("ROLLBACK");
      return "*** Transaccion Incompleta, se aplico ROLLBACK ***";
    }

    // Registra la transferencia en la tabla transferencias
    const transferencia = await pool.query(
      "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [emisor, receptor, monto]
    );

    if (transferencia.rowCount == 1) {
      console.log("Transferencia realizada con éxito: ", transferencia.rows[0]);
      await pool.query("COMMIT");
      //   return "*** Transferencia completa y Exitosa ***";
      return transferencia.rows[0];
    } else {
      console.log("*** Transaccion Incompleta, se aplico ROLLBACK ***");
      await pool.query("ROLLBACK");
      return "*** Transaccion Incompleta, se aplico ROLLBACK ***";
    }
  } 
  catch (err) {
    await pool.query("ROLLBACK");

    console.log("Error General: ", err);
    const final = errors(err.code, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
    return final;
  }
}

//-------------------------------------------------------------------------------------------
//Función para consultar la base de datos y enlistar la tabla transferencias
async function listaTransferencias() {
  // const result = await pool.query("SELECT * FROM transferencias");
  const result = await pool.query(
    "SELECT u.nombre AS emisor, r.nombre AS receptor, t.monto, t.fecha FROM transferencias t INNER JOIN usuarios u ON u.id = t.emisor INNER JOIN usuarios r ON r.id = t.receptor"
  );
  return result.rows;
}

//-------------------------------------------------------------------------------------------

module.exports = {
  insertar,
  consultar,
  editar,
  eliminar,
  transferir,
  listaTransferencias,
}; //exporto la función
