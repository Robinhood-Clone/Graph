const Sequelize = require('sequelize')
var moment = require('moment')

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
            numberPeople: Sequelize.INTEGER,
            stockSymbol: Sequelize.STRING
        })
        stockPrice = sequelize.define('stockPrice', {
            name: Sequelize.STRING,
            value: Sequelize.FLOAT,
            date: Sequelize.DATE
        })
        return stockInfo.hasMany(stockPrice);

    })
    .then(() => {
        // forces to drop tables
        return sequelize.sync({ force: true });
    })
    //seed data
    .then(() => {
        stockInfo.create({
            name: "Apple",
            holdPercentage: "90",
            numberPeople: "1438920"
        })
            .then((entry) => {
                let stockPriceArr = [];
                let curPrice = Math.random() * 5 + 265;
                // let today = new Date();
                // let hour = 9;
                // let minutes = 5;
                let variability = 0.05;

                let now = moment();
                let yearAgo = moment(now).subtract(365, 'day');
                let cur = moment(yearAgo).startOf('day').hours(9);

                console.log(now, yearAgo, cur, new Date(moment(cur).add(cur.utcOffset(), 'minutes')));

                while (cur <= now) {
                    while (cur.hours() < 18) {
                        stockPriceArr.push({
                            name: "Apple",
                            value: curPrice,
                            date: new Date(moment(cur)), //.add(cur.utcOffset(), 'minutes')
                            stockInfoId: entry.id
                        });
                        cur.add(5, 'minutes');
                        curPrice += Math.pow(-1, Math.round(Math.random())) * (Math.random() * variability);
                    }
                    cur.add(1, 'day').startOf('day').hours(9); //utc time
                }

                stockPrice.bulkCreate(stockPriceArr);

            })

    })

module.exports = stockPrice;


