const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usos_ia',
    port: 3306
});

db.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar:', erro);
        return;
    }

    console.log('Banco conectado com sucesso!');
});

module.exports = db;