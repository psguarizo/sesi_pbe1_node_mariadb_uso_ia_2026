
const db = require('../db');

// Listar todos os usos de IA
function listar(req, res) {
    db.query('SELECT * FROM usoia', (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });
}

// Buscar uso de IA pelo ID
function buscar(req, res) {
    const id = req.params.id;

    db.query(
        'SELECT * FROM usoia WHERE id = ?',
        [id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            res.json(resultado);
        }
    );
}

// Cadastrar uso de IA
function cadastrar(req, res) {
    const {
        usuarioId,
        sistema,
        tipo,
        finalidade,
        tecnologia,
        nivelRisco,
        revisaoHumana
    } = req.body;

    db.query(
        `INSERT INTO usoia
        (usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            usuarioId,
            sistema,
            tipo,
            finalidade,
            tecnologia,
            nivelRisco,
            revisaoHumana
        ],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            res.status(201).json({
                mensagem: 'Uso de IA cadastrado com sucesso!',
                id: resultado.insertId
            });
        }
    );
}

// Editar uso de IA
function editar(req, res) {
    const id = req.params.id;

    const {
        usuarioId,
        sistema,
        tipo,
        finalidade,
        tecnologia,
        nivelRisco,
        revisaoHumana
    } = req.body;

    db.query(
        `UPDATE usoia SET
        usuarioId = ?,
        sistema = ?,
        tipo = ?,
        finalidade = ?,
        tecnologia = ?,
        nivelRisco = ?,
        revisaoHumana = ?
        WHERE id = ?`,
        [
            usuarioId,
            sistema,
            tipo,
            finalidade,
            tecnologia,
            nivelRisco,
            revisaoHumana,
            id
        ],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: 'Uso de IA atualizado com sucesso!'
            });
        }
    );
}

// Excluir uso de IA
function excluir(req, res) {
    const id = req.params.id;

    db.query(
        'DELETE FROM usoia WHERE id = ?',
        [id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: 'Uso de IA excluído com sucesso!'
            });
        }
    );
}

// Resumo dos níveis de risco
function resumo(req, res) {
    db.query(
        `SELECT
            nivelRisco,
            COUNT(*) AS total
        FROM usoia
        GROUP BY nivelRisco`,
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            const resumo = {
                Alto: 0,
                Medio: 0,
                Baixo: 0
            };

            resultado.forEach(item => {
                resumo[item.nivelRisco] = item.total;
            });

            res.json(resumo);
        }
    );
}

module.exports = {
    listar,
    buscar,
    cadastrar,
    editar,
    excluir,
    resumo
};
