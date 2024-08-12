const {Sequelize} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  'uploader', 
  process.env.USER_ROLE, 
  process.env.PASSWORD_USER, {
  dialect: 'postgres',
  host: process.env.HOST_LOCAL,
  timezone: '+02:00',
  port: '5432',
  logging: false,
});

async function tryDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conectou se com sucesso no banco de dados')
  }catch(error) {
    console.log('ERRO OCORIDO: ', error.message)
  throw Error('Nao foi possivel connectar se ao banco de dados')
  };
}
tryDatabase()

module.exports = sequelize;