const { argv } = require('./yargs')
const funciones = require('./funciones')


let comando = argv._[0]

switch(comando)
{
    case 'crear':
        funciones.crear(argv)
    break
    
    default:
        console.log('No ingreso una función existente')
    
}