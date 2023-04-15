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

    async login(req, res, next) {
        const email = req.body.email;
        let pwd = req.body.password;
        
        if(!email){
            next(new RestError('username required', 400));    
        }
        if(!pwd){
            next(new RestError('password required', 400));     
        }

        try {
            let userReturned = await this.userRepository.getUserByEmailPassword(email, pwd);
            if (userReturned) {
                userReturned.password = undefined;
                res.json(userReturned);
            } else {
                next(new RestError(`Either the user doesn\'t exist or user and password don\'t match`, 401));    
            }
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async getUser(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new RestError('id required', 400));    
        }

        try {
            let userReturned = await this.userRepository.getUser(id);
            if (userReturned) {
                userReturned.password = undefined;
                res.json(userReturned);
            } else {
                next(new RestError(`User not found`, 404));    
            }
        } catch (err) {
            this.handleRepoError(err, next)
        }
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

            req.body.password = undefined
            
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
