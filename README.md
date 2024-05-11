# Banco Solar

## Descripción del Proyecto

Proyecto donde se validan conocimientos de Conectar una base de datos PostgreSQL con Node, Realizar consultas DML con Node y el paquete pg, Realizar consultas TCL con Node y el paquete pg, Construir una API RESTful utilizando PostgreSQL para la persistencia de datos, Manejar errores y Manejar códigos de estado HTTP.
Se entrega archivo index.html como apoyo.

### :scroll: Contexto :scroll:
El Banco Solar acaba de decidir invertir en un equipo de desarrolladores Full Stack que desarrollen un nuevo sistema de transferencias, y han anunciado que todo aquel que postule al cargo debe realizar un servidor con Node que utilice PostgreSQL para la gestión y persistencia de datos, y simular un sistema de transferencias.
El sistema debe permitir registrar nuevos usuarios con un balance inicial y basados en estos, realizar transferencias de saldos entre ellos.

## Sobre el proyecto 🚀


### ✨ Requerimientos ✨

👌 1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la gestión y persistencia de datos.

👌 2. Usar transacciones SQL para realizar el registro de las transferencias.

👌 3. Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL.

👌 4. Capturar los posibles errores que puedan ocurrir a través de bloques catch o parámetros de funciones callbacks para condicionar las funciones del servidor.

👌 5. Devolver correctamente los códigos de estado según las diferentes situaciones.

👉 Nota: Se puede modificar código del front index.html de ser necesario.


### Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

 "dependencies": 
 - express
 - pg
 - morgan
 - dotenv
 - nodemon


### Instalación 🔧

 Instala en terminal:
- npm init --yes
- npm i 


## Visuales :mage_woman:

- #### Front Entregado del proyecto :
  
![index](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/31617f34-6f97-4aa0-81ba-87c788f156e6)

- #### Alertas para validación de campos vacíos en agregar usuario y en editar usurio:
- 
  ![verificacionCamposVaciosAlertAGregar](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/3674411c-713e-4b6d-8bf6-07990d22ceea)
  
![verificacionCamposVaciosAlert](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/167aa2d8-b648-4cbb-a457-b92e0935e41f)

- #### Avisos de procesos exitosos:
![transferenciaExitosa](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/4ebaed91-b7c7-4333-b2b0-6b56f6bd75bb)

![eliminarAlertConfirmacion](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/b52a4a09-387e-464a-b390-78a944fbaabb)

![eliminarAlertExito](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/f40be2d6-fe24-4daa-94f1-4ce89e646d29)


- #### Alerta para errores de consola:
![errorBalanceNumeroAlert](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/e5bf8100-68d8-4db3-a66a-11f8ee0e2d4d)

![errorCheckAlert](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/23d67ff5-7b35-42b6-a7fe-45a18e484dde)


- #### En consola:
  
  ![errorCheckTerminal](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/18ee6b09-8d27-4e38-bc22-025dc6b22d7b)

  
![errorBalanceNumeroTerminal](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/f1213f46-5f79-44d8-a96b-b0e47fc8e599)

![transferenciaExitosaTerminal](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/57997f9f-9bde-4474-aac8-528302ba2df7)

![listarTransferenciasTerminal](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/4ce9a263-d091-4477-bec3-6f16e31ce5d7)

![eliminarTerminalBancoSolar](https://github.com/andreaendigital/prueba_bancosolar/assets/154395788/89bb1e45-efea-4bc3-9afc-8479a7f1a00b)




## Construido Con 🛠️

Explica qué tecnologías usaste para construir este proyecto. Aquí algunos ejemplos:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - El lenguaje utilizado
- [PG](https://www.npmjs.com/package/pg)- Node paquete PG
- [Express](https://expressjs.com/en/5x/api.html)- Node paquete Express
- [Nodemon](https://www.npmjs.com/package/nodemon)- Node paquete Nodemon
  

## Autores ⚡ 

- **Andrea Rosero** ⚡  - [Andrea Rosero](https://github.com/andreaendigital)

