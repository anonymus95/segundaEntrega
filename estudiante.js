const mongoose = require('mongoose')
const Schema = mongoose.Schema

const estudianteSchema = new Schema({
    nombre:{
        type: String,
        require: true
    },
    codigo:{
        type: Number,
        require: true
    },
    descripcion:{
        type: String,
        require: true
    },
    valor:{
        type: Number,
        require: true
    },
    modalidad:{
        type: String
    },
    intensidadHoraria:{
        type: Number
    },
    estado:{
        type: String
    }
})

const Estudiante = mongoose.model('Estudiante', estudianteSchema)

module.exports = Estudiante