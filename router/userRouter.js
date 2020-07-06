//Instanciando o Express para os tratamentos
const express = require('express');
const router = express.Router();

//Instanciando a classe de Model e de Respostas
const UserModel = require('../model/UserModel');
const RespostaClass = require('../model/RespostaClass');

//Tratando a rota POST
router.post("/", function(req, resp, next) {  
  let resposta = new RespostaClass();
  UserModel.getCpf(req.body.cpf, function(error, retorno) {    
    if(error) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro!";
      console.log("erro: ", error);      
    } else {
      if (retorno.length > 0) {        
        resposta.erro = true;
        resposta.msg = "CPF já cadastrado.";     
      } else {
        UserModel.adicionar(req.body, function(error, retorno) {    
          //se deu erro
          if(error) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro!";
            console.log("erro: ", error);        
          } else {
              if (retorno.affectedRows > 0) {
                resposta.msg = "Cadastrado com sucesso!"; 
                resposta.dados = req.body;      
              } else {
                resposta.erro = true;
                resposta.msg = "Não foi possivel cadastrar o usuário.";
                console.log("erro: ", error);
              }     
            }               
        });
      }     
    } 
    resp.json(resposta);  
  })   
});

//Tratando a rota GET
router.get("/", function(req, resp, next) {
  UserModel.getTodos(function(error, retorno) {
    let resposta = new RespostaClass();
    if(error) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro!";
      console.log("erro: ", error); 
    } else {
        resposta.dados = retorno; 
    }
    resp.json(resposta); 
  });
});

//Tratando a rota GET pelo ID
router.get("/:id?", function(req, resp, next) {
  UserModel.getId(req.params.id, function(error, retorno) {
    let resposta = new RespostaClass();
    if(error) {
      resposta.error = true;
      resposta.msg = "Ocorreu um erro!";
      console.log("erro: ", error); 
    } else {
        resposta.dados = retorno; 
    }
    resp.json(resposta);
  });
});

//Tratando a rota DELETE pelo ID
router.delete("/:id?", function(req, resp, next) {
  UserModel.deletar(req.params.id, function(error, retorno) {
    let resposta = new RespostaClass();
    if(error) {
      resposta.error = true;
      resposta.msg = "Ocorreu um erro!";
      console.log("erro: ", error); 
    } else {
      if (retorno.affectedRows > 0) {
        resposta.msg = "Usuário excluído!";           
      } else {
        resposta.erro = true;
        resposta.msg = "Não foi possivel excluir o usuário.";
        console.log("erro: ", error);
      }      
    }
    resp.json(resposta);
  });
});

//Tratando a rota PUT
router.put("/", function(req, resp, next){
  let resposta = new RespostaClass();
  UserModel.editar(req.body, function(error, retorno) {    
    if(error) {
      resposta.erro = true;
      resposta.msg = "Ocorreu um erro!";
      console.log("erro: ", error); 
    } else { 
    resposta.dados = req.body;   
    resp.json(resposta); 
    }
  });
});

//Exportando o Router
module.exports = router;
