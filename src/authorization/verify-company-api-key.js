const express   = require('express');
const app       = express();
const crypto = require('crypto')
const CompanyRepository = require('../repositories/company-repository');
const companyRepository = new CompanyRepository()

async function verifyCompanyApiKey(req, res, next) {
    try {
        let apiKey = req.headers['X-API-Key'] || req.headers['x-api-key'];
        if (apiKey) {
            try {
                const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');
                let company = await companyRepository.getCompanyByApiKey(hashedApiKey);
                if (company) {
                    req.company = company;
                    next();
                } else {
                    return res.status(401).send('Invalid api key.');    
                }
            } catch (error) {
                return res.status(401).send({ error: error.message });
            }
        } else {
            let errorMessage = 'No api key provided. Api key is required.'
            return res.status(401).send({ error:errorMessage });
        }
    } catch (error) {
        let errorMessage = `Please send api key in the header in form of: x-api-key. Error: ${error.message} ==> Error: 401`
        return res.status(401).send({ error: errorMessage });
    }
}

module.exports = verifyCompanyApiKey;