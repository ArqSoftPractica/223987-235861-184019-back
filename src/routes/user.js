const express = require('express');
const Router    = express.Router()
const UsersController = require('../controllers/users-controller')
const userController = new UsersController();

Router.use(express.json());

Router.post('/users', (req, res, next) => userController.createUser(req, res, next));
Router.get('/users', (req, res, next) => userController.getUsers(req, res, next));
Router.get('/users/:id', (req, res, next) => userController.getUser(req, res, next));

Router.post('/login', (req, res, next) => userController.login(req, res, next));
Router.post('/sendRegisterLink', (req, res, next) => userController.sendRegisterLink(req, res, next));

module.exports = Router
