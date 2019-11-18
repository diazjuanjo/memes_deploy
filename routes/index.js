const express = require('express');
const memeController = require('../controllers/memeController')
const router = express.Router();

module.exports = function() {
    
    //Agrega nuevos memes con post
    router.post('/memes', memeController.nuevoMeme);

    //Obtener todos los clientes
    router.get('/memes', memeController.mostrarMemes);

    //Muestra un meme por id
    router.get('/memes/:idMeme', memeController.mostrarMeme);

    //Actualizar meme
    router.put('/memes/:idMeme', memeController.actualizarMeme);

    //Eliminar meme
    router.delete('/memes/:idMeme', memeController.eliminarMeme);

    return router;
}