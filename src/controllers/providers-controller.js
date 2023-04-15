const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const ProviderRepository = require('../repositories/provider-repository');

module.exports = class ProviderController {
    constructor() {
        this.providerRepository = new ProviderRepository();
    }

    async createProvider(req, res, next) {
        try {
            let providerCreated = await this.providerRepository.createProvider(req.body);
        
            res.json(providerCreated);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getProvider(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new RestError('id required', 400));    
        }

        try {
            let provider = await this.providerRepository.getProvider(id);
            if (provider) {
                res.json(provider);
            } else {
                next(new RestError(`Provider not found`, 404));    
            }
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getProviders(req, res, next) {
        try {
            let queryParams = {};
            if (req.query.isActive) {
                queryParams['isActive'] = req.query.isActive == 'true'
            }
            let providers = await this.providerRepository.getProviders(queryParams);
            
            res.json(providers);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async editProvider(req, res, next) {
        try {
            const id = req.params.id;
            let provider = await this.providerRepository.editProvider(id, req.body);
            
            res.json(provider);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async deactivateProvider(req, res, next) {
        try {
            const id = req.params.id;
            let provider = await this.providerRepository.editProvider(id, {isActive: false});
            
            res.json(provider);
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
