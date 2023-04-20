const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const CompanyRepository = require('../repositories/company-repository');

module.exports = class CompanyController {
    constructor() {
        this.companyRepository = new CompanyRepository();
    }
    
    async getCompanies(req, res, next) {
        try {
            let companies = await this.companyRepository.getCompanies();
            
            res.json(companies);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async handleRepoError(err, next) {
        //error de base de datos.
        let http_code = (err.code == 11000)?409:400;
        let errorDesription = err.errors[0].message ?? err.message
        next(new RestError(errorDesription, http_code));
    }
}
