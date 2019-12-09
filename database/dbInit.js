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
            value: Sequelize.FLOAT,
            date: Sequelize.DATE
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
            let curPrice = Math.random()*5 + 265;
            let today = new Date();
            let hour = 9;
            let minutes = 5;
            let variability = 0.05;

            for( let i = 0 ; i < 1; i++) {

                while(hour < 18) {
                    if( minutes%60 === 0 ) { hour += 1; }
                    stockPriceArr.push({
                        name: "Apple",
                        value: curPrice,
                        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, hour, minutes%60),
                        stockInfoId: entry.id
                    });
                    minutes += 5;
                    curPrice += Math.pow(-1, Math.round(Math.random())) * (Math.random()*variability);
                }
                hour = 9;
                minutes = 5;
            }

            stockPrice.bulkCreate(stockPriceArr);

        })

    })



