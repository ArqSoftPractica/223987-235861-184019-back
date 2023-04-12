const express = require('express');
const Router    = express.Router()
const UsersController = require('../controllers/users-controller')
const userController = new UsersController();

Router.use(express.json());

Router.get('/users', (req, res, next) => userController.getUser(req, res, next));

module.exports = Router
