require('newrelic');
const express = require('express');
var cors = require('cors')
const app = express();
const RestError = require('./src/controllers/rest-error')
require('dotenv').config();

app.use(express.json());
const dbconnection  = require('./src/db/connection/connection');
const user = require('./src/routes/user');
const company = require('./src/routes/company');
const provider = require('./src/routes/provider');
const product = require('./src/routes/product');
const sale = require('./src/routes/sale');
const salesReport = require('./src/routes/saleReport');
const purchase = require('./src/routes/purchase');

var salesReportQueue = require("./src/service/sales-bull-queue-service");

app.use(cors())
app.use(user)
app.use(company)
app.use(provider)
app.use(product)
app.use(purchase)
app.use(sale)
app.use(salesReport)

dbconnection.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use((err,req ,res, next) => {
    let errorStatus = err instanceof RestError? err.status: 500
    let logErrorMessage = `Error on endpoint: ${req.originalUrl} Error Status: ${errorStatus} Error Message:${err.message}`
    if (req.user && req.user._id) {
        logErrorMessage = `USER: ${req.user._id} ` + logErrorMessage
    }
    res.status(errorStatus);
    res.json({error:err.message});
});

const server = app.listen(process.env.PORT ?? 3000, function(){
    console.log(`Listening to port ${process.env.PORT ?? 3000}`);
});

(async() => {
  await salesReportQueue.initSalesReportQueue();
})();

module.exports = server;