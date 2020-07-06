//Criando a instancia para o MySql
const mysql = require('mysql');

//Pool de Conexao com o banco 
let conexao = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'projetofk'
});

//Exportando a conexao
module.exports = conexao;