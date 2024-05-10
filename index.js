// npm init --yes
// npm i express
// npm i morgan
// npm i pg
// npm i nodemon
// npm i dotenv
// abrir psql y crear database y table
// crear .env
// crear .gitignore

// IMPORTACIONES REQUERIDAS DE PAQUETES INSTALADOS
const dotenv = require("dotenv");
dotenv.config();
const express = require("express"); //importamos express
const morgan = require("morgan");

const app = express(); //instanciamos express
app.use(morgan("dev"));

// MIDDLEWARES GENERALES
app.use(express.json()); //para recibir desde el front (los objetos) como json

// LEVANTANDO EL SERVIDOR
const PORT_SERVER = process.env.PORT_SERVER || 5000;

app.listen(PORT_SERVER, () => {
  console.log(`Servidor activo en el puerto http://localhost:${PORT_SERVER}`);
});

// Importa la función insertar desde el módulo consultas.js
const { insertar, consultar, editar } = require("./consultas/consultas.js");

//ruta raíz donde levantamos el index.html:
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //cuando visite la raíz, devuelve el archivo con sendFile. __dirname le da la ruta
});

//Ruta para agregar Usuarios a la lista:
app.post("/usuario", async (req, res) => {
  try {
    console.log("estoy aqui dentro del try del router.post");
    console.log("estoy aqui ", req.body);

    const { nombre, balance } = req.body; // Extraer los campos 'titulo', 'artista' y 'tono' del cuerpo de la solicitud
    console.log("estoy aqui antes del if despues del destructuring");
    // Validar que los campos no estén vacíos
    if (nombre == "" || balance == "") {
      console.log("Los campos 'nombre' y 'balance' son requeridos.");
      return res.status(400).json({
        error: "Los campos 'nombre' y 'balance' son requeridos.",
      });
    }
    const datos = Object.values(req.body); //object.values extrae los valoes de todas las propiedades enumerables del objeto body y almacena esos valores en un array llamado datos
    const respuesta = await insertar(datos); // el resultado de la función insertar con argumento array datos, se almacena en respuesta
    console.log(
      "Valor devuelto por la funcion insertar de base de datos: ",
      respuesta
    );
    res.status(201).send("registro agregado exitosamente");
  } catch (error) {
    // console.log("Error: ", error);
    console.log("Error: ", error.message);
    res.status(500).send(error);
  }
});

//Ruta para enlistar los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await consultar();
    console.log("Respuesta de la funcion consultar en el index: ", usuarios);
    // res.json(usuarios);
    // res.status(200).send(usuarios);
    res.status(200).json(usuarios);
  } catch (error) {
    // console.log("Error: ", error);
    console.log("Error: ", error.message);
    res.status(500).send(error);
  }
});

//Ruta para editar un usuario
app.put("/usuario", async (req, res) => {
  try {
    const { id } = req.query; // Obtener el ID del usuario por query string
    const { name, balance } = req.body; // Extraer los campos 'name' y 'balance' del cuerpo de la solicitud
    
    // console.log("id que llega" , id);
    // console.log("body", req.body);

    // Validar que los campos no estén vacíos
    if (name == "" || balance == "") {
      console.log(
        "Los campos 'nombre' y 'balance' son requeridos para editar."
      );
      return res.status(400).json({
        error:
        "Los campos 'nombre' y 'balance' son requeridos para editar."
      });
    }
    const datos = Object.values(req.body);
    const respuesta = await editar(id, datos); // llamo a la función editar con argumento id y datos, su respuesta se almacena en variable respuesta
    console.log(
      "Valor devuelto por la funcion editar de base de datos: ",
      respuesta
    );
    res.status(200).send(respuesta);
  } catch (error) {
    console.log("Error: ", error);
    console.log("Error: ", error.message);
    res.status(500).send(error);
  }
});