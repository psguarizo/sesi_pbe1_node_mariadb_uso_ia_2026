
const db = require('../db');

// Listar usuários
function listar(req, res) {
    db.query('SELECT id, nome, email FROM usuario', (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });
}

// Buscar usuário pelo ID
function buscar(req, res) {
    const id = req.params.id;

    db.query(
        'SELECT id, nome, email FROM usuario WHERE id = ?',
        [id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            res.json(resultado);
        }
    );
}

// Cadastrar usuário
function cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, PASSWORD(?))';

    db.query(sql, [nome, email, senha], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({
                mensagem: 'Erro ao cadastrar usuário'
            });
        }

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
}

// Editar usuário

function editar(req, res) {
    const id = req.params.id;
    const { nome, email, senha } = req.body;

    const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = PASSWORD(?) WHERE id = ?';

    db.query(sql, [nome, email, senha, id], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json(erro);
        }

        res.json({
            mensagem: 'Usuário atualizado com sucesso!'
        });
    });
}

// Excluir usuário
function excluir(req, res) {
    const id = req.params.id;

    db.query(
        'DELETE FROM usuario WHERE id = ?',
        [id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: 'Usuário excluído com sucesso!'
            });
        }
    );
}

// Login

function login(req, res) {
    const { email, senha } = req.body;

    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = PASSWORD(?)';

    db.query(sql, [email, senha], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json(erro);
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                mensagem: 'Email ou senha incorretos!'
            });
        }

        res.json({
            mensagem: 'Login realizado com sucesso!',
            usuario: resultado[0]
        });
    });
}


module.exports = {
    listar,
    buscar,
    cadastrar,
    editar,
    excluir,
    login
};
