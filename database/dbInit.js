const Sequelize = require('sequelize')
var moment = require('moment')

var sequelize = new Sequelize('', 'root', null, {
    host: "database",
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
        let stocksArr = [
            {
                name: "3M",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "MMM"
            },
            {
                name: "Ford",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "F"
            },
            {
                name: "GE",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "GE"
            },
            {
                name: "Fitbit",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "FIT"
            },
            {
                name: "GoPro",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "GPRO"
            },
            {
                name: "Microsoft",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "MSFT"
            },
            {
                name: "Apple",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "AAPL"
            },
            {
                name: "Disney",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "DIS"
            },
            {
                name: "Cronos Group",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CRON"
            },
            {
                name: "Canopy Growth",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CGC"
            },
            {
                name: "Snap",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SNAP"
            },
            {
                name: "AMD",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "AMD"
            },
            {
                name: "Plug Power",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PLUG"
            },
            {
                name: "Facebook",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "FB"
            },
            {
                name: "Tesla",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "TSLA"
            },
            {
                name: "Zynga",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "ZNGA"
            },
            {
                name: "Twitter",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "TWTR"
            },
            {
                name: "Amazon",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "AMZN"
            },
            {
                name: "Alibaba",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "BABA"
            },
            {
                name: "Chesapeake Energy",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CHK"
            },
            {
                name: "Uber",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "UBER"
            },
            {
                name: "Bank of America",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "BAC"
            },
            {
                name: "NIO",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "NIO"
            },
            {
                name: "Netflix",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "NFLX"
            },
            {
                name: "AT&T",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "T"
            },
            {
                name: "Starbucks",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SBUX"
            },
            {
                name: "NVIDIA",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "NVDA"
            },
            {
                name: "Aphria",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "APHA"
            },
            {
                name: "Groupon",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "GRPN"
            },
            {
                name: "Square",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SQ"
            },
            {
                name: "Sprint",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "S"
            },
            {
                name: "Sirius XM",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SIRI"
            },
            {
                name: "Coca-Cola",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "KO"
            },
            {
                name: "Vanguard S&P 500 ETF",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "VOO"
            },
            {
                name: "Beyond Meat",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "BYND"
            },
            {
                name: "Corbus Pharmaceuticals",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CRBP"
            },
            {
                name: "Slack",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "WORK"
            },
            {
                name: "Activision Blizzard",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "ATVI"
            },
            {
                name: "Nike",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "NKE"
            },
            {
                name: "Lyft",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "LYFT"
            },
            {
                name: "Micron Technology",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "MU"
            },
            {
                name: "Visa",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "V"
            },
            {
                name: "Vivint Solar",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "VSLR"
            },
            {
                name: "Intel",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "INTC"
            },
            {
                name: "Nokia",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "NOK"
            },
            {
                name: "PG&E",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PCG"
            },
            {
                name: "Cisco",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CSCO"
            },
            {
                name: "SPDR S&P 500 ETF",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SPY"
            },
            {
                name: "J.C. Penny",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "JCP"
            },
            {
                name: "Tilray",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "TLRY"
            },
            {
                name: "Paypal",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PYPL"
            },
            {
                name: "Tencent",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "TCEHY"
            },
            {
                name: "ETFMG Alternative Harvest",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "MJ"
            },
            {
                name: "Glu Mobile",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "GLUU"
            },
            {
                name: "Berkshire Hathaway",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "BRK.B"
            },
            {
                name: "New Residential Investment",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "NRZ"
            },
            {
                name: "Yamana Gold",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "AUY"
            },
            {
                name: "iQIYI",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "IQ"
            },
            {
                name: "Roku",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "ROKU"
            },
            {
                name: "Salesforce",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CRM"
            },
            {
                name: "Walmart",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "WMT"
            },
            {
                name: "Boeing",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PCG"
            },
            {
                name: "Geron",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PCG"
            },
            {
                name: "Denbury",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "DNR"
            },
            {
                name: "Viking Therapeutics",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "VKTX"
            },
            {
                name: "Kodak",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "KODK"
            },
            {
                name: "Pfizer",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PFE"
            },
            {
                name: "Enphase Energy",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "ENPH"
            },
            {
                name: "GM",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "GM"
            },
            {
                name: "Alphabet",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "GOOG"
            },
            {
                name: "Twilio",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "TWLO"
            },
            {
                name: "Shopify",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SHOP"
            },
            {
                name: "JD.com",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "JD"
            },
            {
                name: "Verizon",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "VZ"
            },
            {
                name: "Dropbox",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "DBX"
            },
            {
                name: "Catalyst Pharmaceuticals",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CPRX"
            },
            {
                name: "Luckin Coffee",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "LK"
            },
            {
                name: "Costco",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "COST"
            },
            {
                name: "Pinterest",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PINS"
            },
            {
                name: "Sony",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SNE"
            },
            {
                name: "Bilibili",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "BILI"
            },
            {
                name: "Cara Therapeutics",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CARA"
            },
            {
                name: "AK Steel",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "AKS"
            },
            {
                name: "CRISPR",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CRSP"
            },
            {
                name: "AbbVie",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "ABBV"
            },
            {
                name: "CVS",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "CVS"
            },
            {
                name: "SunPower",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SPWR"
            },
            {
                name: "YETI",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "YETI"
            },
            {
                name: "Target",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "TGT"
            },
            {
                name: "Limelight Networks",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "LLNW"
            },
            {
                name: "Teva Pharmaceutical",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "TEVA"
            },
            {
                name: "McDonald's",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "MCD"
            },
            {
                name: "Under Armour",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "UAA"
            },
            {
                name: "Stitch Fix",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "SFIX"
            },
            {
                name: "Johnson & Johnson",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "JNJ"
            },
            {
                name: "Zoom",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "ZM"
            },
            {
                name: "Kraft Foods",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "KHC"
            },
            {
                name: "OmiseGO",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "OMG"
            },
            {
                name: "Dollar Tree",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "DLTR"
            },
            {
                name: "Phillips 66",
                holdPercentage: "90",
                numberPeople: "1438920",
                stockSymbol: "PSX"
            }
        ];

        stockInfo.bulkCreate(stocksArr)
            .then((entry) => {
                let stockPriceArr = [];
                let curPrice = Math.random() * 5 + 265;
                let variability = 0.05;

                let now = moment();
                let yearAgo = moment(now).subtract(7, 'day');
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


