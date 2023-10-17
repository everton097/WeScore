const express = require("express")
const exphds = require("express-handlebars")
const app = express()
const conn = require('./db/conn')
const port = 3000

app.engine('handlebars', exphds.engine())
app.set('view engine', 'handlebars')

const path = require("path")
const basePath = path.join(__dirname,'templates')

//routes
const testeRoutes = require('./routes/testeRoutes')

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.use(express.static('public'))

//Chama as rotas
app.use('/userLogado',testeRoutes)


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
app.get('/cadastroResponsavel', function(req,res){
    res.render('cadastroResponsavel')
})
app.get('/areaLogada', function(req,res){
    res.render('areaLogada')
})
app.get('/cadastroResponsavel', function(req,res){
    res.render('cadastroResponsavel')
})
app.get('/userLogado', function(req,res){
    res.render('userLogado')
})
app.get('/cadastroTime', function(req,res){
    res.render('cadastroTime')
})
app.get('/cadastroJogadores', function(req,res){
    res.render('cadastroJogadores')
})
app.get('/cadastroCamp', function(req,res){
    res.render('cadastroCamp')
})
app.get('/userLogado2', function(req,res){
    res.render('userLogado2')
})



app.listen(port, ()=>{
    console.log(`Servidor rodando: http://localhost:${port}`)
})

conn.sync()
    .then(()=> {
    }).catch((err) => console.log(err))

