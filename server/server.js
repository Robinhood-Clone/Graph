const express = require('express')
const request = require('request')
const Sequelize = require('sequelize')
// var database = require('./database/dbInit.js')

var bodyParser = require('body-parser')
var cors = require('cors')
var moment = require('moment')

var sequelize = new Sequelize('Graph', 'root', null, {
    dialect: 'mysql'
})                

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(__dirname + '/../client/dist'))

app.use('/stocks/:stockID', express.static(__dirname + '/../client/dist'))

app.get('/stockName/:stockID', (req, res) => {
    let stockID = req.params.stockID;
    console.log("stockID", stockID);
    sequelize.query("SELECT name from `stockInfos` WHERE stockSymbol = '"+ stockID + "';" )
    .then ( (result) => {
        // console.log("resultname", result[0]);
        res.send(JSON.stringify([result[0]]))
    })
    // .then ( () => {
    //     // res.end()
    //     return sequelize.query("SELECT * from stockprices INNER JOIN stockinfos ON (stockprices.stockInfoId = stockinfos.id AND stockinfos.stockSymbol = '" + stockID + "');" ) //( select curdate() ); WHERE DATE(date) < CURDATE() 
    // })
    // .then ( (result) => {
    //     console.log(result);
    //     res.write(JSON.stringify(result));
    //     res.end();
    // })
})

app.get('/stockPrice', (req, res) => {
    let now = moment().hours(0);
    sequelize.query("SELECT * from stockprices" ) //( select curdate() ); WHERE DATE(date) < CURDATE() 
    .then((result) => {
        res.send(JSON.stringify(result));
    })
})

app.get('/stockInfo/:stockID', (req, res) => {
    let stockID = req.params.stockID;
    // sequelize.query("SELECT * from stockprices INNER JOIN stockinfos ON (stockprices.stockInfoId = stockinfos.id AND stockinfos.stockSymbol = '" + stockID + "');" ) //( select curdate() ); WHERE DATE(date) < CURDATE() 
    sequelize.query("SELECT * from stockprices")
    .then ( (result) => {
        console.log(result);
        res.send(JSON.stringify(result));
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))