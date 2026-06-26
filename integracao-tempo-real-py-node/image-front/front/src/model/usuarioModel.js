const mysql = require("mysql2");

const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

function logar(req, res) {
    const email = req.params.email;
    const senha = req.params.senha;
    const met = 1;

    enviarResposta(email, senha, met)
    .then(function (resposta) {
        console.log(resposta);
        res.json ({
            lista: resposta
        });
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function cadastrarUsuario(req, res) {
    console.log("passous2")
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;
    const met = 2;

    enviarResposta(email, senha, met)
    .then(function (resposta) {
        console.log(resposta);
        res.json ({
            lista: resposta
        });
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function enviarResposta(par1, par2, met) {
    let instrucaoSql;

    if (met == 1) {
        instrucaoSql = `
        SELECT id AS 'idUsuario', email AS 'Email' FROM usuario WHERE email = '${par1}' AND senha = '${par2}';
        `;
    } else if(met == 2) {
        instrucaoSql = `INSERT INTO usuario (email, senha) VALUES ("${par1}", "${par2}");`;
    }
    
    return executarInstrucao(instrucaoSql);
}

function executarInstrucao(instrucao) {
    
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    logar,
    cadastrarUsuario,
    enviarResposta,
    executarInstrucao
}