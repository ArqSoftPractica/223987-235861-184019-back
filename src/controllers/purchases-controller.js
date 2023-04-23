const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const PurchaseRepository = require('../repositories/purchase-repository');
const CompanyRepository = require('../repositories/company-repository');
const ProductRepositroy = require('../repositories/product-repository');
const ProductPurchaseRepository = require('../repositories/productPurchase-repository');
const ProviderRepository = require('../repositories/provider-repository');

module.exports = class purchaseController {
    constructor() {
        this.purchaseRepository = new PurchaseRepository();
        this.companyRepository = new CompanyRepository();
        this.productRepository = new ProductRepositroy();
        this.productPurchaseRepository = new ProductPurchaseRepository();
        this.providerRepository = new ProviderRepository();
    }

    async createPurchase(req, res, next) {
        try{
            if (!req.body.companyId) {
                next(new RestError('companyIdRequired', 400));    
            }
            if(!req.body.providerId) {
                next(new RestError('providerId required.', 400));
            }

            if (!req.body.productsPurchased || !Array.isArray(req.body.productsPurchased)) {
                next(new RestError('productsPurchased required. You need to send an array of products please.', 400));    
            }

            let company = await this.companyRepository.getCompany(req.body.companyId)

            if (!company) {
                next(new RestError('Company doesn\'t exist.', 404));    
            }

            let provider = await this.providerRepository.getProvider(req.body.providerId)

            if(!provider) {
                next(new RestError('Provider doesn\'t exist.', 404));
            }

            try {
                let purchasCreated = await this.purchaseRepository.createPurchase(req.body);
                try {
                    let productsPurchased = await this.productPurchaseRepository.createProductsPurchase(req.body.productsPurchased, company.id, purchasCreated.id);            
                    /*let allPurchaseData = {
                        id: purchasCreated.id,
                        date: purchasCreated.date,
                        companyId: purchasCreated.companyId,
                        providerId: purchasCreated.providerId,
                        totalCost: purchasCreated.totalCost,
                        updatedAt: purchasCreated.updatedAt,
                        createdAt: purchasCreated.createdAt,
                        productsPurchased: productsPurchased,
                    }*/
                    res.json(productsPurchased);
                    //let addingProductsToStock = await this.productRepository.changeProductsStock(req.body.productsPurchased, true)
                    //res.json(allPurchaseData);
                } catch (err) {
                    let purchaseDeleted = await this.purchaseRepository.deletePurchase(purchasCreated.id);
                    this.handleRepoError(err, next)    
                }
            } catch (err) {
                this.handleRepoError(err, next)
            }
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
                let productPurchases = await this.productPurchaseRepository.getProductsPurchasesFromPurchase(id)
                let totalPurchaseInfo = {
                    id: purchase.id,
                    date: purchase.date,
                    companyId: purchase.companyId,
                    providerId: purchase.providerId,
                    totalCost: purchase.totalCost,
                    updatedAt: purchase.updatedAt,
                    createdAt: purchase.createdAt,
                    productPurchases: productPurchases,
                }
                res.json(totalPurchaseInfo);
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