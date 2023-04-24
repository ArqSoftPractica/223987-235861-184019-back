const express = require('express');
const Router    = express.Router()
const SaleReportController = require('../controllers/salesReport-controller')
const saleReportController = new SaleReportController();
const verifyCompanyApiKey = require('../authorization/verify-company-api-key');
const verifyToken = require('../authorization/verify-token');
const verifyCompanyId = require('../authorization/verify-company-id');
const verifyPermission = require("../authorization/role-check");

Router.use(express.json());

Router.get('/saleReport/:companyId', verifyToken, verifyPermission(), verifyCompanyId, (req, res, next) => saleReportController.getSaleReport(req, res, next));
Router.get('/saleReport', verifyCompanyApiKey, (req, res, next) => saleReportController.getAllSalesReport(req, res, next));

module.exports = Router
