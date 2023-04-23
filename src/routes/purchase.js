const express = require('express');
const Router    = express.Router()
const PurchaseController = require('../controllers/purchases-controller')
const purchaseController = new PurchaseController();
const verifyCompanyApiKey = require("../authorization/verify-company-api-key");

Router.use(express.json());

Router.post('/purchases', (req, res, next) => purchaseController.createPurchase(req, res, next));
Router.get('/purchases', (req, res, next) => purchaseController.getPurchases(req, res, next));
Router.get('/purchases/:id', (req, res, next) => purchaseController.getPurchase(req, res, next));
Router.get('/purchases/provider/:id', verifyCompanyApiKey, (req, res, next) => purchaseController.getPurchasesPerProvider(req, res, next));
module.exports = Router