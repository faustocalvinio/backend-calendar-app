// IMPORTAR EXPRESS
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');


require('dotenv').config();

// CREAR SERVIDOR EXPRESS
const app = express();

// DATABASE
dbConnection();

// CORS
app.use( cors() )

// DIRECTORIO PUBLICO
app.use(express.static('public')); 

// LECTURA Y PARSEO DEL BODY
app.use( express.json() );

// RUTAS
// TODO AUTH : CREAR LOGIN RENEW

app.use('/api/auth', require('./routes/auth'));


app.use('/api/events', require('./routes/events'));
// TODO CRUD: EVENTOS

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})



// ESCUCHAR PETICIONES
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
})