const Memes = require('../models/Memes');

// agrega nuevo meme
exports.nuevoMeme = async (req, res, next) => {
    const meme = new Memes(req.body);
    try {
        // almacenar el registro
        await meme.save();
        res.json({mensaje: 'Se agrego nuevo meme'})
    } catch (error) {
        // si hay un error, console.log y next
        console.log(error);
        next();
    }
}

//Muestra todos los Memes
exports.mostrarMemes = async (req, res, next) => {
    try {
        const memes = await Memes.find({});
        res.json(memes);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mustra un meme por id
exports.mostrarMeme = async (req, res, next) => {
    const meme = await Memes.findById(req.params.idMeme);

    if(!meme){
        res.json({mensaje: 'Ese meme no existe'});
        next();
    }
    //mostrar el meme
    res.json(meme);
}

//Actualiza un meme por id
exports.actualizarMeme = async (req, res, next) => {
    try {
        const meme = await Memes.findOneAndUpdate({ _id : req.params.idMeme}, req.body, {
            new: true
        });
        res.json(meme);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar meme por id
exports.eliminarMeme = async (req, res, next) => {
    try {
        await Memes.findOneAndDelete({ _id : req.params.idMeme});
        res.json({mensaje: 'El meme fue eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}