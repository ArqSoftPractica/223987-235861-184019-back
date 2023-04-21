const express = require('express');
const Router    = express.Router()
const SaleReportController = require('../controllers/salesReport-controller')
const saleReportController = new SaleReportController();

Router.use(express.json());

Router.get('/saleReport/:companyId', (req, res, next) => saleReportController.getSaleReport(req, res, next));
Router.get('/saleReport', (req, res, next) => saleReportController.getAllSalesReport(req, res, next));

module.exports = Router
