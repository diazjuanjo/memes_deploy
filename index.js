const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env'});

//conectar mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.createConnection(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});
mongoose.set('useNewUrlParser', true);

// crear servidor
const app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


const whitelist = [process.env.FRONTEND_URL, process.env.DB_URL];
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whitelist.some(dominio => dominio ===origin);
        if(existe){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

// Habilitar cors
app.use(cors(corsOptions));

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas de la app
app.use('/', routes())

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//puerto
app.listen(port, host, () => {
    console.log('el servidor esta funcionando');
});