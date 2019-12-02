const express = require('express')
const request = require('request')
const Sequelize = require('sequelize')

var bodyParser = require('body-parser')
var cors = require('cors')

var sequelize = new Sequelize('Graph', 'root', null, {
    dialect: 'mysql'
})                

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {

    sequelize.query("SELECT * from `stockPrices`")
    .then((result) => {
        res.write(JSON.stringify(result));
        return sequelize.query("SELECT * from `stockInfos`")
    })
    .then((result) => {
        res.write(JSON.stringify(result));
        res.end();
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))