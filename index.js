const express = require('express')
const exphbs = require('express-handlebars');
const path = require('path');

//const bodyParser = require('body-parser');//para vim formulario simples e URL encoder
//const sequelize = require('./src/conn/connection')

const app = express();

// Definindo uma função para que o handlebars possa formatar a data corretamente para o usuário final
const hbs = exphbs.create({
    helpers: {
      formatDate: function (dateTimeString) {
        
        const date = new Date(dateTimeString); //Converte a string em data
  
        // Defina o fuso horário para UTC
        date.setUTCHours(0, 0, 0, 0);
  
        const year = date.getUTCFullYear(); // Pega o ano em UTC
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Pega o mês em UTC (+1 porque inicia do zero)
        const day = String(date.getUTCDate()).padStart(2, '0'); // Pega o dia em UTC
  
        return `${day}/${month}/${year}` //devolve formatado
      }
    }
  });

//Import routes
const timeRoutes = require('./src/routes/timeRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const jogadorRouter = require('./src/routes/jogadorRoutes');
const campeonatoRouter = require('./src/routes/campeonatoRouter');
const time_campeonatoRouter = require('./src/routes/time_campeonatoRouter');

/*
const dotenv  = require('dotenv');
dotenv.config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends : true}))
app.use(express.static(path.join(__dirname,'public')))
*/

// Configuração do Handlebars como engine de renderização
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configuração do diretório das views
app.set('views', path.join(__dirname, 'src','views'));

// Configuração de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

//Routes
//app.use('/time',timeRoutes)
//app.use('/usuario',usuarioRoutes)
app.use('/jogador',jogadorRouter)
//app.use('/campeonato',campeonatoRouter)
//app.use('/time_campeonato',time_campeonatoRouter)


//TODO: (Para Fazer) Implementar o site para renderizar com o handlebars.
app.get('/', function (req, res) {
    res.render('site')
})

app.get('/areaLogada', function(req,res){
    res.render('areaLogada')
})

app.get('/areaLogada/create', function (req, res) {
    res.render('areaLogada/create')
})




//Inicialização do servidor se conseguir conectar ao banco de dados
// Inicializa o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/*const PORT = process.env.PORT || 5000
console.log(process.env.JWT_EXPIRES_IN)
const forceSync = process.env.DB_FORCE === 'true';//`=== 'true'` converte o valor para um booleano, para ser interpretado corretamente do force
sequelize.sync({ force : forceSync })
    .then(() => {
        console.log(`Conectado ao DB Mysql`)
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Erro ao conectar no DB: ${error}`)
    })
    */