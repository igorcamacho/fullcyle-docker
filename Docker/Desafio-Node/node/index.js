const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let sql = "DROP TABLE IF EXISTS people"
connection.query(sql)

sql = "CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key (id))"
connection.query(sql)
sql = `INSERT INTO people(name) values('Igor')`
connection.query(sql)

sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)

connection.end()

app.get('/', (req,res) => {
    const conn = mysql.createConnection(config)
    conn.query('SELECT name FROM people', (err, rows) => {
        if (err) throw err

        let response = '<h1>Full Cycle</h1>'
        rows.forEach(row => {
            response += `<h2>${row.name}</h2>`
        });
        conn.end()
        res.send(response)
        
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
 