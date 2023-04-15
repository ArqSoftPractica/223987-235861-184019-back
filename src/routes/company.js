const express = require('express');
const Router    = express.Router()
const CompanyController = require('../controllers/companies-controller')
const companyController = new CompanyController();

Router.use(express.json());

Router.get('/companies', (req, res, next) => companyController.getCompanies(req, res, next));

module.exports = Router
