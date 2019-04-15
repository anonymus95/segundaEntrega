const mongoose = require('mongoose')
const Schema = mongoose.Schema

const estudianteSchema = new Schema({
    cedula:{
        type: Number,
        require: true
    },
    nombre:{
        type: String,
        require: true
    },
    correo:{
        type: String,
        require: true
    },
    telefono:{
        type: Number,
        require: true
    },
    curso:{
        type: String,
        require: true
    }
})

const Curso = mongoose.model('Curso', estudianteSchema)

module.exports = Curso