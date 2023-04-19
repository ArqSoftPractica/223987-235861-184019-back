const express = require('express');
const Router    = express.Router();
const CompanyController = require('../controllers/companies-controller');
const verifyToken = require("../authorization/verify-token");
const verifyPermission = require("../authorization/role-check");
const companyController = new CompanyController();

Router.use(express.json());

Router.get('/companies', verifyToken, (req, res, next) => companyController.getCompanies(req, res, next));

module.exports = Router
