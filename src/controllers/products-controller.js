const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const ProductRepository = require('../repositories/product-repository');

module.exports = class productController {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(req, res, next) {
        try {
            let productCreated = await this.productRepository.createProduct(req.body);
        
            res.json(productCreated);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getProduct(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new RestError('id required', 400));    
        }

        try {
            let product = await this.productRepository.getProduct(id);
            if (product) {
                res.json(product);
            } else {
                next(new RestError(`product not found`, 404));    
            }
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getProducts(req, res, next) {
        try {
            let queryParams = {};
            if (req.query.isActive) {
                queryParams['isActive'] = req.query.isActive == 'true'
            }
            let products = await this.productRepository.getProducts(queryParams);
            
            res.json(products);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async editProduct(req, res, next) {
        try {
            const id = req.params.id;
            let product = await this.productRepository.editProduct(id, req.body);
            
            res.json(product);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async deactivateProduct(req, res, next) {
        try {
            const id = req.params.id;
            let product = await this.productRepository.editProduct(id, {isActive: false});
            
            res.json(product);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async handleRepoError(err, next) {
        //error de base de datos.
        let http_code = (err.code == 11000)?409:400;
        let errorDesription = err.message
        if (err.errors && err.errors.length > 0 && err.errors[0].message) {
            errorDesription = err.errors[0].message
        }
        next(new RestError(errorDesription, http_code));
    }
}
