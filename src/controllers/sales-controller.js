const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const Bull = require('bull');
const SaleRepository = require('../repositories/sale-repository');
const ProductRepositroy = require('../repositories/product-repository');
const ProductSaleRepository = require('../repositories/productSale-repository');
const CompanyRepository = require('../repositories/company-repository');

module.exports = class saleController {
    constructor() {
        this.productRepository = new ProductRepositroy();
        this.saleRepository = new SaleRepository();
        this.productSaleRepository = new ProductSaleRepository();
        this.comanyRepository = new CompanyRepository();
        this.salesQueue = new Bull("sale-queue");
    }

    async createSale(req, res, next) {
        try{
            if (!req.body.companyId) {
                next(new RestError('companyIdRequired', 400));    
            }

            if (!req.body.productsSold || !Array.isArray(req.body.productsSold)) {
                next(new RestError('productsSold required. You need to send an array of products please.', 400));    
            }

            let company = await this.comanyRepository.getCompany(req.body.companyId)

            if (!company) {
                next(new RestError('Company doesn\'t exist.', 404));    
            }

            let removingProductsFromStock = await this.productRepository.changeProductsStock(req.body.productsSold, false)
            try {
                let saleCreated = await this.saleRepository.createSale(req.body);
                try {
                    let productsSold = await this.productSaleRepository.createProductsSale(req.body.productsSold, company.id, saleCreated.id);            
                    let allSaleData = {
                        id: saleCreated.id,
                        date: saleCreated.date,
                        companyId: saleCreated.companyId,
                        totalCost: saleCreated.totalCost,
                        clientName: saleCreated.clientName,
                        updatedAt: saleCreated.updatedAt,
                        createdAt: saleCreated.createdAt,
                        productsSold: productsSold,
                    }
                    try {
                        this.salesQueue.add(productsSold);
                    } catch (err) {
                        console.error(err)
                    }

                    res.json(allSaleData);
                } catch (err) {
                    let saleDeleted = await this.saleRepository.deleteSale(saleCreated.id);
                    let addProductStockBack = await this.productRepository.changeProductsStock(req.body.productsSold, true)
                    this.handleRepoError(err, next)    
                }
            } catch (err) {
                let addProductStockBack = await this.productRepository.changeProductsStock(req.body.productsSold, true)
                this.handleRepoError(err, next)
            }
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getSale(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new RestError('id required', 400));    
        }
        try{
            let sale = await this.saleRepository.getSale(id);
            if (sale) {
                let productSales = await this.productSaleRepository.getProductSalesFromSale(id)
                let totalSaleInfo = {
                    id: sale.id,
                    date: sale.date,
                    companyId: sale.companyId,
                    totalCost: sale.totalCost,
                    clientName: sale.clientName,
                    updatedAt: sale.updatedAt,
                    createdAt: sale.createdAt,
                    productsSold: productSales,
                }
                res.json(totalSaleInfo);
            } else {
                next(new RestError(`sale not found`, 404));    
            }
        }catch(err){
            this.handleRepoError(err, next)
        }
    }

    async getSales(req, res, next) {
        try {
            let sales = await this.saleRepository.getSales();
            
            res.json(sales);
        } catch (err) { 
            this.handleRepoError(err, next)
        }
    }

    async getSalesByCompanyWithSaleProducts(req, res, next) {
        try {
            let user = req.user
            if (!user) {
                next(new RestError(`Invalid token`, 404));    
            }

            if (!user.companyId) {
                next(new RestError(`Invalid token`, 404));    
            }

            let sales = await this.saleRepository.getSalesByCompanyWithSaleProducts(user.companyId)
            
            res.json(sales);
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
