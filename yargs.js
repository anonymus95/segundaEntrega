const nombre ={
    demand: true,
    alias: 'n'
}
const id ={
    demand: true,
    alias: 'i'
}
const descripcion ={
    demand: true,
    alias: 'd'
}
const valor ={
    demand: true,
    alias: 'v'
}

const presencial = {
    alias:'p'
}
const virtual = {
    alias:'vir'
}

const creacion ={
    nombre,
    id,
    descripcion,
    valor,
    presencial,
    virtual
}


const argv = require('yargs')
            .command('crear','Crear un curso en el BD', creacion)
            .argv

module.exports={
    argv
}


