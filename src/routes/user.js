const express = require('express');
const Router    = express.Router()
const UsersController = require('../controllers/users-controller')
const userController = new UsersController();

Router.use(express.json());

Router.post('/users', (req, res, next) => userController.createUser(req, res, next));
Router.get('/users', (req, res, next) => userController.getUsers(req, res, next));

module.exports = Router
