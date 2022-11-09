const express = require('express')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const app = express()
const port = 3000
var response = '<h1>Full Cycle Rocks!</h1>'
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = "CREATE TABLE IF NOT EXISTS people(name VARCHAR(50) NOT NULL)"
connection.query(createTable)
const sql = `INSERT INTO people(name) values('${randomName}')`
connection.query(sql)
const query = `SELECT name FROM people`

app.get('/', (req,res) => {
    
    connection.query(query, (error, results, fields) => {
        if(error) 
            res.json(error);
        else
            res.send(getList(results));
            console.log('executou!');
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function getList(results) {
    results.forEach(element => {
        response += '<li>'+ element.name +'</li>'
    });
   
    return response
}