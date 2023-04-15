const express = require('express');
const Router    = express.Router()
const ProductController = require('../controllers/products-controller')
const productController = new ProductController();

Router.use(express.json());

Router.post('/products', (req, res, next) => productController.createProduct(req, res, next));
Router.get('/products', (req, res, next) => productController.getProducts(req, res, next));
Router.get('/products/:id', (req, res, next) => productController.getProduct(req, res, next));
Router.delete('/products/:id', (req, res, next) => productController.deactivateProduct(req, res, next));
Router.put('/products/:id', (req, res, next) => productController.editProduct(req, res, next));

module.exports = Router
