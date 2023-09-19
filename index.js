const express = require("express")
const exphds = require("express-handlebars")
const app = express()
const conn = require('./db/conn')

//routes
const timeRoutes = require('./routes/timeRoutes')

app.engine('handlebars', exphds.engine())
app.set('view engine', 'handlebars')

const path = require("path")
const basePath = path.join(__dirname,'templates')

//Middlewares para transformar formulario em JSON
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//definicao da pasta estatica
app.use(express.static('public'))

//Chama as rotas
app.use('/',timeRoutes)


// GET route for homepage
app.get('/', function(req,res){
        res.render('home')
}) 
//GET route for notes page
app.get('/jogos', function(req,res){
    res.render('jogos')
})
app.get('/contato', function(req,res){
    res.render('contato')
})
app.get('/login', function(req,res){
    res.render('login')
})



//roda o servidor se conseguir conectar ao bd
conn.sync()
    .then(()=> {
        app.listen(3000, ()=>{
            console.log(`Servidor rodando: http://localhost:3000`)
        })
    }).catch((err) => console.log(err))