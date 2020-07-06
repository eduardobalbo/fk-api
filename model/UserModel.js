//Fazendo a requisição da Conexao
const db = require('../banco/dbConexao');

//Provem os métodos estaticos
module.exports = class UserModel{

//Tratando metodo GET para todos
    static getTodos(callback){
    return db.query("SELECT * FROM users", 
    callback);
  }

//Tratando metodo GET pelo ID
  static getId(id,callback){
    return db.query("SELECT * FROM users WHERE id = ?", 
    [id], callback);
  }

//Get para tratar o CPF para validação
static getCpf(cpf,callback){
  return db.query("SELECT * FROM users WHERE cpf = ?", 
  [cpf], callback);
}

//Tratando metodo para adicionar 
  static adicionar(dados,callback){
    return db.query("INSERT INTO users (name, cpf, email) VALUES (? , ?, ?)"
    , [dados.name,dados.cpf,dados.email], callback);
  }

////Tratando metodo para editar 
  static editar(dados,callback){
    return db.query("UPDATE users SET name=?, cpf=?, email=? WHERE id = ?"
    , [dados.name,dados.cpf,dados.email, dados.id], callback);
  }

//Tratando metodo para deletar
  static deletar(id,callback){
    return db.query("DELETE FROM users WHERE id = ?", 
    [id], callback);
  }
}

