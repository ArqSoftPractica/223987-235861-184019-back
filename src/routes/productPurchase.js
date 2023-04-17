const express = require('express');
const Router    = express.Router()
const ProductPurchaseController = require('../controllers/productsPurchases-controller')
const productPurchaseController = new ProductPurchaseController();

Router.use(express.json());

Router.post('/productPurchases', (req, res, next) => productPurchaseController.createProductPurchase(req, res, next));
Router.get('/productPurchases/:id', (req, res, next) => productPurchaseController.getProductPurchase(req, res, next));
Router.get('/productPurchases/:purchaseId/products', (req, res, next) => productPurchaseController.getProductsOfPurchase(req, res, next));

module.exports = Router