CREATE DATABASE bancosolar;

\c bancosolar;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50), 
    balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY, 
    emisor INT, 
    receptor INT, 
    monto FLOAT, 
    fecha TIMESTAMP, 
    FOREIGN KEY (emisor) REFERENCES usuarios(id), 
    FOREIGN KEY (receptor) REFERENCES usuarios(id)
);

\dt 

\d usuarios;

\d transferencias;


-- Al eliminar usuario se debe por integridad referencial (consistencia e integridad de datos), 
-- generar la eliminación de las transacciones donde el usuario está involucrado con el ON DELETE CASCADE 
-- por lo tanto hay que realizar las siguientes modificaciones: 

-- Eliminar las restricciones de clave externa existentes
ALTER TABLE transferencias DROP CONSTRAINT transferencias_emisor_fkey;
ALTER TABLE transferencias DROP CONSTRAINT transferencias_receptor_fkey;

-- Agregar nuevas restricciones de clave externa con ON DELETE CASCADE
ALTER TABLE transferencias 
  ADD CONSTRAINT transferencias_emisor_fkey 
  FOREIGN KEY (emisor) 
  REFERENCES usuarios(id) 
  ON DELETE CASCADE;

ALTER TABLE transferencias 
  ADD CONSTRAINT transferencias_receptor_fkey 
  FOREIGN KEY (receptor) 
  REFERENCES usuarios(id) 
  ON DELETE CASCADE;