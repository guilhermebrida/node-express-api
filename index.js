const pg = require('pg')
const express = require('express')
const dbMethods = require('./database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const bodyParser = require('body-parser');

swaggerDocument.schemes = ['http'];
var options = {
    explorer: true
};

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, options));


const apiVersion = 'v1'



let pgClient;
const pool = new pg.Pool({
    host    : 'localhost',
    port    : 5432,
    user    : 'postgres',
    password: 'postgres',
    database: 'postgres',
    connectionLimit: 100,
    multipleStatements: true
});

pool.connect( (err, client) => {

    if (err) {
        console.log(err);
        console.log("DATABASE NOT CONNECTED");
    }

    pgClient = client;
    console.log("DATABASE CONNECTED");

    dbMethods.__construct(pgClient);

});



app.get(`/${apiVersion}/users`, (req, res) => {
    dbMethods.selectUsersDetails(null, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao obter os detalhes dos usuários.');
        } else {
            res.status(200).json({ users: result });
        }
    });
});

app.post(`/${apiVersion}/add`, (req, res) => {
    const { nome, sobrenome, email, cpf } = req.body;
    const fields = [nome, sobrenome, email, cpf]
    console.log(fields);
    dbMethods.insertUser(fields, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao obter os detalhes dos usuários.');
        } else {
            res.status(200).json({ insertedUser: result });
        }
    });
});

app.delete(`/${apiVersion}/users`, (req, res) => {
    console.log(req.query.id);
    const userId =  Array(req.query.id);
    console.log(userId);
    dbMethods.deleteUser(userId, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao obter os detalhes dos usuários.');
        } else {
            res.status(200).json({ deletedUser: result });
        }
    });
});

app.put(`/${apiVersion}/users`, (req, res) => {
    console.log(req.query);
    const userId =  req.query.id;
    const { nome, sobrenome, email, cpf } = req.body;
    const fields = [userId, nome, sobrenome, email, cpf]
    console.log(fields);
    dbMethods.putUser(fields, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao obter os detalhes dos usuários.');
        } else {
            res.status(200).json({ modifiedUser: result });
        }
    });
});



app.get(`/${apiVersion}/users/:id`, (req, res) => {
    const id = req.params.id;
    const fields = [id];
    console.log(fields);
    dbMethods.selectUser(fields, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao obter os detalhes dos usuários.');
        } else {
            res.status(200).json({ user: result });
        }
    });
});


app.patch(`/${apiVersion}/users/:id`, (req, res) => {
    console.log(req.query);
    console.log(req.params.id);
    const userId =  req.query.id;
    const { nome, sobrenome, email, cpf } = req.body;
    const fields = [userId, nome, sobrenome, email, cpf]
    console.log(fields);
    dbMethods.patchUser(fields, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao obter os detalhes dos usuários.');
        } else {
            res.status(200).json({ modifiedUser: result });
        }
    });
});




app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});