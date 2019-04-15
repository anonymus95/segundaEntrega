const express = require('express')
const app = express()
const funciones= require('./funciones')
const path = require('path')
const hbs = require('hbs')

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

//modulo que permite insertar un estudiante
const Estudiante = require('./estudiante.js')
const Curso = require('./curso.js')

//partials


const dirNode_modules = path.join(__dirname , '/node_modules')
const directoriopartials = path.join(__dirname,'/partials')

console.log(dirNode_modules)

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
//==================================================================0

hbs.registerPartials(directoriopartials)

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'hbs')

app.get('/',(req,res) =>{
    res.render('index')
})

app.post('/',(req,res) =>{

    let estudiant = new Estudiante({
        nombre: req.body.nombre,
        codigo: req.body.id,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        modalidad: req.body.modalidad,
        intensidadHoraria: req.body.intensidadHoraria,
        estado: req.body.estado
    })

    estudiant.save((err,resultado) =>{
        if(err){
            res.render('error', {
                mostrar: err
            })
        }
        res.render('index', {
            estudiante: resultado
         })
    })
   
})


app.get('/inscripcion',(req,res) => {

    Estudiante.find({estado: 'Disponible'}).exec((err,resultado) =>{
        if(err){
            return console.log(err)
        }
        console.log('imprime')
        res.render('registrar', {
        cursos: resultado
    })
    })
    
})

app.post('/inscripcion',(req,res) => {

    let estudiant = new Curso({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        correo: req.body.correo,
        telefono: req.body.telefono,
        curso: req.body.curso
    })

    estudiant.save((err,resultado) =>{
        if(err){
            res.render('error', {
                mostrar: err
            })
        }
        res.render('home', {
            estudiante: false
         })
    })
    
})

app.get('/cursos',(req,res) => {
    Estudiante.find({estado: 'Disponible'}).exec((err,resultado) =>{
        if(err){
            return console.log(err)
        }
        res.render('cursos', {
        estudiantes: resultado
    })
    })
    
})

app.post('/cursos',(req,res) => {
    res.render('cursos', {
        estudiantes: funciones.mostrar(),
        estudiante: funciones.crear(req.body)
    })
})

app.get('/administrar',(req,res) =>{
   
    Estudiante.find({}).exec((err,resultado) =>{
        if(err){
            return console.log(err)
        }
        res.render('inscritos', {
        estudiantes: resultado
    })
    })
})

app.post('/listaa',(req,res) =>{

    Curso.find({curso: req.body.nombre}).exec((err,resultado) =>{
        if(err){
            return console.log(err)
        }
        res.render('listaa', {
        estudiantes: resultado
    })
    })
})

const cambiar = (estate) =>{
    if(estate == "Disponible"){
        estate= 'Cerrado'
    }
    else{
        estate = 'Disponible'
    }
    return estate
}


//no es optimo pero funciona
app.post('/administrar', (req,res) => {

    //busca curso
    Estudiante.find({nombre: req.body.curso},(err,resultado) =>{
        if(err){
            return console.log(err)
        }
        resultado.forEach(estudiante =>{
           estate= estudiante.estado
        })

        //actualiza el curso
        Estudiante.findOneAndUpdate({nombre: req.body.curso}, {estado: cambiar(estate)},(err,r)=>{
            //muestra la lista de los cursos
            Estudiante.find({}).exec((err,resul) =>{
                if(err){
                    return console.log(err)
                }
                res.render('inscritos', {
                estudiantes: resul
            })
            })
        })
})
})



app.post('/eliminar', (req,res) =>{

     //actualiza el curso
     Curso.findOneAndDelete({cedula: req.body.id},(err,resultado)=>{

        Curso.find({}).exec((err,resultad) =>{
            if(err){
                return console.log(err)
            }
           
            res.render('listaa', {
            estudiantes: resultad
        })
        })
   
    })

})


mongoose.connect('mongodb://localhost:27017/asignaturas', {useNewUrlParser: true},(err,resultado) =>{
    if(err){
        return console.log(err)
    }
    console.log("conectado")
});

app.listen(3000,() =>{
    console.log('Escuchando en el puerto '+ port)
})
