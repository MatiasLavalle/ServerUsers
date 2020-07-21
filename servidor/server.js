require('./config/config')
const express = require('express');
const mongoose = require('mongoose');


const server = express();



// configuraciones
server.use (express.urlencoded({extended: false}));
server.use (express.json());
// server.use(cors())


// hablititar las rrutas

server.use(require('./routes/usuarios'))


// conectar la base de datos

mongoose.connect(process.env.URLDB, {useNewUrlParser: true})
    .then( db => console.log('base de datos conectada'))
    .catch( err => console.log(err))


 
// poner a funcionar el servidor

server.listen(process.env.PORT, ()=>{
    console.log("puerto 3000")
})