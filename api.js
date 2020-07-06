//Instanciando Express
const express = require("express");

//Instanciando Bodyparser
const bodyparser = require('body-parser');

//Instanciando Cors para leitura de arquivos e segurança
const cors = require("cors");

//Fazendo a API entender e usar Express
const api = express();

//Criando a porta da API
const porta = 3000;

//Instanciando o Router do Express
const router = express.Router();

//Fazendo a api usar e entender o Cors
api.use(cors());

//Rota para os Users
const userRouter = require('./router/userRouter');

//Fazendo a API usar e entender o Body-parser
api.use(bodyparser.urlencoded({extended: true}));

//Fazendo a API verificar o tamanho máximo de arquivos recebidos pelo Body-parser em JSON
api.use(bodyparser.json({limit: '20mb', extended: true}));

//Expondo e tornando disponivel a rota para acesso da API 
api.use('/public', express.static(__dirname + '/public'));

//Rotas e verificação da API
router.get("/", (req, resp) => resp.json({
  mensagem: 'API Online...'
}));

//Passando a rota padrao para a API
api.use("/", router);

//passando a rota Users para a API
api.use("/users", userRouter);

//API escutando na porta, mostrando no Console
api.listen(porta);
console.log("Run API Express")




