const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const ProductPurchaseRepository = require('../repositories/productPurchase-repository');

module.exports = class ProductPurchaseController {
    constructor() {
        this.productPurchaseRepository = new ProductPurchaseRepository();
    }

    async createProductPurchase(req, res, next) {
        try {
            let productPurchaseCreated = await this.productPurchaseRepository.createProductPurchase(req.body);
        
            res.json(productPurchaseCreated);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getProductPurchase(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new RestError('id required', 400));    
        }

        try {
            let productPurchase = await this.productPurchaseRepository.getProductPurchase(id);
            if (productPurchase) {
                res.json(productPurchase);
            } else {
                next(new RestError(`product purchase not found`, 404));    
            }
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getProductsOfPurchase(req, res, next) {
        const purchaseId = req.params.purchaseId;
        if (!purchaseId) {
            next(new RestError('purchaseId required', 400));    
        }
        try {
            let productPurchase = await this.productPurchaseRepository.getProductsOfPurchase(purchaseId);
            if (productPurchase) {
                res.json(productPurchase);
            } else {
                next(new RestError(`product purchase not found`, 404));    
            }
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async handleRepoError(err, next) {
        //error de base de datos.
        let http_code = (err.code == 11000)?409:400;
        next(new RestError(err.message, http_code));
    }
}
