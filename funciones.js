const fs = require('fs')
listaEstudiantes = []
listaInscriptos = []

const crear = (estudiante) => {
    listar()
    let est = {
        nombre: estudiante.nombre,
        id: estudiante.id,
        descripcion: estudiante.descripcion,
        valor: estudiante.valor,
        modalidad: estudiante.modalidad,
        intensidadHoraria: estudiante.intensidadHoraria,
        estado: estudiante.estado
    }
    let duplicado = listaEstudiantes.find((nom) => nom.id == estudiante.id)
    if(!duplicado){
        listaEstudiantes.push(est)
        console.log(listaEstudiantes)
        guardar()
        //indica que no hubo problemas al momento de crear el curso
        return false
    }

    //indica que el hay un curso con el mismo id
    return true
}


const listar= () => {
    try {
        listaEstudiantes = require('./listado.json')
    } catch (error) {
        listaEstudiantes = []
    }
    
}

const listarInscritos = () =>{
    try {
        listaInscriptos = require('./listadoInscriptos.json')
    } catch (error) {
        listaInscriptos = []
    }
}

const guardar = () => {
    let datos = JSON.stringify(listaEstudiantes)
    fs.writeFile('listado.json', datos, (err) => {
        if(err) throw(err)
        console.log('Archivo creado con éxito')
    })
}

const mostrar = () =>{
    listar()
    listaCursos = []
    listaEstudiantes.forEach(estudiante => {
        if(estudiante.estado === "Disponible")
        {
            listaCursos.push(estudiante)
        }
        
    });
    return listaCursos
}

const mostrarEst = () =>{
    listar()
   
    return listaEstudiantes
}

const buscar = curso => {
    listar()
    let cur = listaEstudiantes.filter(c => c.id == curso.id)
    return cur
}

const inscribirEst = () => {
    let datos = JSON.stringify(listaInscriptos)
    fs.writeFile('listadoInscriptos.json', datos, (err) => {
        if(err) throw(err)
        console.log('Archivo creado con éxito')
    })
}


//inscripcion a un curso
const inscripcion=(estudiante)=>
{
    let est = {
        curso: estudiante.curso,
        nombre: estudiante.nombre,
        id: estudiante.cedula,
        correo: estudiante.correo,
        telefono:estudiante.telefono
    }
    let duplicado = listaInscriptos.find((curs) => (curs.curso === estudiante.curso && curs.id == estudiante.cedula) )
    if(!duplicado){
        listaInscriptos.push(est)
        inscribirEst();
        return false
    }
    return true
}

const listaInscripto= (nombre)=>{
    listarInscritos()
    listaa = []
    listaInscriptos.forEach(estudiante =>{
        if(estudiante.curso == nombre)
        {
            listaa.push(estudiante)
        }
    })

    return listaa
}


const eliminar = id =>{
    listarInscritos()
   
    let guardar = listaInscriptos.filter(curso=> curso.id!=id)
    if(guardar.length != listaInscriptos.length)
    {
        console.log('Entro')
        listaInscriptos = guardar
        inscribirEst()
    }
}

module.exports = {
    crear,
    inscripcion,
    mostrar,
    buscar,
    mostrarEst,
    listaInscripto,
    eliminar
}