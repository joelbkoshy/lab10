const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = 3028
const hostname = 'localhost'

const db = "automobiles"
const tbl = "services"

// Cross origins
app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

// var corsOptions = {
//     origin: '*',
//     methods: "GET",
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// MySQl connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: db
});

// Connect with MySql
connection.connect((err) => {
    if (err)
        throw (err)
    console.log("MySql Connected")
})

// routes
app.get('/', (req, res) => {
    // Display all data
    // res.status(200)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    connection.query("SELECT * from " + tbl, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/new', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['id'])
    connection.query("INSERT into " + tbl + " VALUES (" + resp['user_id'] + "," + resp['service_id'] + ",\'" + resp['service_vehicle'] + "\',\'" + resp['service_type'] + "\',\'" + resp['service_status'] + "\')", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/update', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['id'])
    connection.query("UPDATE " + tbl + " SET user_id= " + resp['user_id'] + ", service_vehicle=\'" + resp['service_vehicle'] + "\',service_type=\'" + resp['service_type'] + "\',service_status=\'" + resp['service_status'] + "\' where service_id = " + resp['service_id'], function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/delete', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var delId = req.body['delID']

    connection.query("DELETE from " + tbl + " where service_id = " + delId, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.get('/*', (req, res) => {
    res.status(404)
    res.end("<h1>404 Error</h1>")
})

// Http connection
app.listen(port, hostname, function() {
    console.log(`App listening at http://${hostname}:${port}`)
})