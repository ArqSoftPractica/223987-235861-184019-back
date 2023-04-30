const express   = require('express');
const app       = express();
const crypto = require('crypto')
const CompanyRepository = require('../repositories/company-repository');
const companyRepository = new CompanyRepository()
const logger = require('../logger/systemLogger');

async function verifyCompanyApiKey(req, res, next) {
    try {
            try {
                if (req.params.companyId) {
                    let company = await companyRepository.getCompany(req.params.companyId);
                    if (company) {
                        req.companyId = company.id;
                        return next();
                    } else {
                        let errorMessage = 'Invalid api key.'
                        logger.logError(errorMessage);
                        return res.status(401).send(errorMessage);    
                    }   
                } else {
                    logger.logError('Please add companyId in the body');
                    return res.status(400).send({ error: error.message });    
                }
            } catch (error) {
                logger.logError(error.message, error);
                return res.status(401).send({ error: error.message });
            }
    } catch (error) {
        let errorMessage = `Please send api key in the header in form of: x-api-key. Error: ${error.message} ==> Error: 401`
        logger.logError(errorMessage);
        return res.status(401).send({ error: errorMessage });
    }
}

module.exports = verifyCompanyApiKey;