const express = require('express')
const app = express()
const funciones= require('./funciones')
const path = require('path')
const hbs = require('hbs')

const bodyParser = require('body-parser')

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
    res.render('index', {
       estudiante: funciones.crear(req.body)
    })
})

app.get('/inscripcion',(req,res) => {
    res.render('registrar', {
        cursos: funciones.mostrar()
    })
})

app.post('/inscripcion',(req,res) => {
    res.render('home',{
        estudiante: funciones.inscripcion(req.body),
        
    })
})

app.get('/cursos',(req,res) => {
    res.render('cursos', {
        estudiantes: funciones.mostrar()
    })
})

app.post('/cursos',(req,res) => {
    res.render('cursos', {
        estudiantes: funciones.mostrar(),
        estudiante: funciones.crear(req.body)
    })
})

app.get('/administrar',(req,res) =>{
    res.render('inscritos',
    { estudiantes: funciones.mostrarEst()}
    )
})

app.post('/listaa',(req,res) =>{
    res.render('listaa', {
        estudiantes: funciones.listaInscripto(req.body.nombre)
    })
})

app.post('/eliminar', (req,res) =>{
    res.render('eliminado',{
        estudiantes: funciones.eliminar(req.body.id)
    })
})

app.listen(3000,() =>{
    console.log('Escuchando en el puerto 3000')
})