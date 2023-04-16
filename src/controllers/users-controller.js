const express   = require('express');
const Router    = express.Router();
const RestError = require('./rest-error');
const UserRepository = require('../repositories/user-repository')
const CompanyRepository = require('../repositories/company-repository');
const nodemailer = require("nodemailer");
const request = require('request');
const { default: axios } = require('axios');
const sendinblueApiKey = "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";
const emailTemplateId = 1;

module.exports = class UsersController {
    constructor() {
        this.userRepository = new UserRepository();
        this.companyRepository = new CompanyRepository();
    }

    async sendRegisterLink(req, res, next) {
        const email = req.body.email;
        let companyId = req.body.companyId;
        
        if(!email){
            next(new RestError('Recipient email required', 400));    
        }
        if(!companyId){
            next(new RestError('CompanyId required', 400));     
        }

        try {
            let company = await this.companyRepository.getCompany(companyId);

            if (!company) {
                next(new RestError('No company with the suggested companyId', 400));     
            }
            
            let body = {
                to: [{ email: email }],
                templateId: emailTemplateId,
                params: {
                    recipient_email: email,
                    company_name: company.name,
                    registration_link: 'https://www.google.com'
                }
            };
            
            let sendinblueUrl = 'https://api.sendinblue.com/v3/smtp/email';
            let headers = { headers: {
                'api-key': sendinblueApiKey,
                'Content-Type': 'application/json'
            } }

            axios.post(sendinblueUrl, body, headers)
                .then(async response => {
                    if (response.status == 200 || response.status == 204 || response.status == 201) {
                        res.status(204);
                        res.json();
                    } else {
                        this.handleRepoError(Error('Error sending registration email: ' + response.data), next);
                    }
                })
                .catch(function (error) {
                    console.log('Error', error.message);
                    next(new RestError(error.message, error.response.status));
                });
        } catch (err) {
            this.handleRepoError(err, next)
        }
    }

    async login(req, res, next) {
        const email = req.body.email;
        let pwd = req.body.password;
        
        if(!email){
            next(new RestError('email required', 400));    
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
