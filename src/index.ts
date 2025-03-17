import type { Request, Response } from "express";
import express from "express";
import cors from "cors"
import { dbConnection } from "./database/config";
import { dirname } from "path";

// IMPORTAR EXPRESS

// USANDO PAQUETE DOTENV NECESARIO PARA LEER EL ARCHIVO .ENV
// require('dotenv').config();
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { eventsRouter } from "./routes/events";
import { fileURLToPath } from "url";
dotenv.config()


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


app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);

// CUALQUIER OTRA REQUEST


// Esto reemplaza a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('*', (req: Request, res: Response) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/public/index.html');
});
// app.get('*', (req: Request, res: Response) => {
//     console.log(__dirname)
//     res.sendFile(__dirname + '/public/index.html');
// });

// ESCUCHAR PETICIONES
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
})