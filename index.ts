import { Request, Response } from "express";
import express from "express";
import cors from "cors"
import { dbConnection } from "./database/config";

// IMPORTAR EXPRESS

// USANDO PAQUETE DOTENV NECESARIO PARA LEER EL ARCHIVO .ENV
require('dotenv').config();

// CREAR SERVIDOR EXPRESS
const app = express();

// DATABASE
dbConnection();

// CORS
app.use(cors());

// DIRECTORIO PUBLICO
app.use(express.static('public')); 

// LECTURA Y PARSEO DEL BODY
app.use(express.json());

// RUTAS

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// CUALQUIER OTRA REQUEST

app.get('*', (req:Request, res:Response) => {
    res.sendFile(__dirname + '/public/index.html');
});

// ESCUCHAR PETICIONES
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
})