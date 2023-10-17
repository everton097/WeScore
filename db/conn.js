const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('pessoa','root','1234',{
    host:'localhost',
    dialect : 'mysql',
    port : 3306
})

try{
    sequelize.authenticate()
    console.log('Conectamos com o Sequelize')
} catch (error) {
    console.log('Erro ao conectar com o BD: ',error)
}
module.exports = sequelize