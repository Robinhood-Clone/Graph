const Sequelize = require('sequelize')

var sequelize = new Sequelize('', 'root', null, {
    dialect: "mysql"
})

var stockPrice = null;
var stockInfo = null;

sequelize.query("CREATE DATABASE IF NOT EXISTS Graph;")
    .then(() => {
        return sequelize.query("USE Graph;");
    })
    .then(() => {
        return sequelize.query("DROP TABLE IF EXISTS `stockPrices`;")
    })
    .then(() => {
        stockInfo = sequelize.define('stockInfo', {
            name: Sequelize.STRING,
            holdPercentage: Sequelize.FLOAT,
            numberPeople: Sequelize.INTEGER
        })
        stockPrice = sequelize.define('stockPrice', {
            name: Sequelize.STRING,
            price: Sequelize.FLOAT,
            dateTime: Sequelize.DATE
        })
        return stockInfo.hasMany(stockPrice);

    })
    .then( () => {
        // forces to drop tables
        return sequelize.sync({force: true});
    })
    //seed data
    .then( () => {
        stockInfo.create({
            name: "Apple",
            holdPercentage: "90",
            numberPeople: "1438920"
        })
        .then( (entry) => {
            let stockPriceArr = [];
            for(let i = 0; i < 1000; i++) {
                stockPriceArr.push({
                    name: "Apple",
                    price: "5.00",
                    dateTime: new Date(),
                    stockInfoId: entry.id
                });
            }

            stockPrice.bulkCreate(stockPriceArr);

        })

    })



