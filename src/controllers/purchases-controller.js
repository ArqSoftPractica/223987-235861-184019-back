const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const PurchaseRepository = require('../repositories/purchase-repository');

module.exports = class purchaseController {
    constructor() {
        this.purchaseRepository = new PurchaseRepository();
    }

    async createPurchase(req, res, next) {
        try{
            let purchaseCreated = await this.purchaseRepository.createPurchase(req.body);
            res.json(purchaseCreated);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getPurchase(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new RestError('id required', 400));    
        }
        try{
            let purchase = await this.purchaseRepository.getPurchase(id);
            if (purchase) {
                res.json(purchase);
            } else {
                next(new RestError(`purchase not found`, 404));    
            }
        }catch(err){
            this.handleRepoError(err, next)
        }
    }

    async getPurchases(req, res, next) {
        try {
            let purchases = await this.purchaseRepository.getPurchases();
            
            res.json(purchases);
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