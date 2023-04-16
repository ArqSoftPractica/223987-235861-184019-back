const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const PurchaseRepository = require('../repositories/purchase-repository');

module.exports = class purchaseController {
    constructor() {
        this.purchaseRepository = new PurchaseRepository();
    }

    async createPurchase(req, res, next) {
        /*try {
            let productCreated = await this.productRepository.createProduct(req.body);
        
            res.json(productCreated);
        } catch (err) {
            this.handleRepoError(err, next)
        }*/
    }

    async getPurchase(req, res, next) {
        /*const id = req.params.id;
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
        */
    }

    async getPurchases(req, res, next) {
        /*try {
            let queryParams = {};
            if (req.query.isActive) {
                queryParams['isActive'] = req.query.isActive == 'true'
            }
            let products = await this.productRepository.getProducts(queryParams);
            
            res.json(products);
        } catch (err) {
            this.handleRepoError(err, next)
        }
        */
    }



    async handleRepoError(err, next) {
        //error de base de datos.
        let http_code = (err.code == 11000)?409:400;
        next(new RestError(err.message, http_code));
    }
}