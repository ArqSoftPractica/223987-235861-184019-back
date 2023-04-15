const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const UserRepository = require('../repositories/user-repository')
const CompanyRepository = require('../repositories/company-repository');

module.exports = class UsersController {
    constructor() {
        this.userRepository = new UserRepository();
        this.companyRepository = new CompanyRepository();
    }
    
    async getUsers(req, res, next) {
        try {
            let users = await this.userRepository.getUsers();
            
            res.json(users);
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async createUser(req, res, next) {
        try {
            let companyName = req.body.companyName;
            let company = await this.companyRepository.getCompanyByName(companyName);

            if (!company) {
                company = await this.companyRepository.createCompany(companyName);
            }

            req.body.companyId  = company.id;

            let userCreated = await this.userRepository.createUser(req.body);
            
            res.json(userCreated);
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
