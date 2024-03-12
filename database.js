let _pgClient; // Declaração de variável para armazenar o cliente Postgres

module.exports = {
    /**
     * Método para inicializar o cliente Postgres
     * @param {Object} pgClient Cliente Postgres
     */
    __construct: function (pgClient) {
        _pgClient = pgClient;
    },

    /**
     * Função para selecionar detalhes dos usuários
     * @param {Array} fields Campos para seleção
     * @param {Function} callback Função de retorno
     */
    selectUsersDetails: function (fields, callback) {
        let query = "SELECT * FROM cadastro;";
        _pgClient.query(query, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, res.rows);
            }
        });
    },
    selectUser: function (fields, callback) {
        let query = "SELECT * FROM cadastro WHERE id = $1;";
        _pgClient.query(query, fields, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, res.rows);
            }
        });
    },

    insertUser: function (fields, callback) {
        console.log('insertUser');
        console.log(fields);
        let query = 'INSERT INTO cadastro ("Nome", "Sobrenome", "Email", "CPF") VALUES ($1, $2, $3, $4)';
        _pgClient.query(query, fields, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, 'error');
            } else {
                callback(null, 'OK');
            }
        });
    },

    deleteUser: function (fields, callback) {
        let query = 'DELETE FROM cadastro WHERE id = $1';
        _pgClient.query(query, fields, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, 'error');
            }
            if (res.rowCount === 0) {
                callback(null, 'id not found');
            }
            else {
                callback(null, 'OK');
            }
        });
    },

    putUser: function (fields, callback) {
        let query = 'UPDATE cadastro SET "Nome" = $2, "Sobrenome" = $3, "Email" = $4, "CPF" = $5 WHERE id = $1';
        _pgClient.query(query, fields, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, 'error');
            }
            if (res.rowCount === 0) {
                callback(null, 'id not found');
            }
            else {
                callback(null, 'OK');
            }
        });
    },

    patchUser: function (fields, callback) {
        let query = 'UPDATE cadastro SET "Nome" = $2, "Sobrenome" = $3, "Email" = $4, "CPF" = $5 WHERE id = $1';
        _pgClient.query(query, fields, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, 'error');
            }
            if (res.rowCount === 0) {
                callback(null, 'id not found');
            }
            else {
                callback(null, 'OK');
            }
        });
    },


};