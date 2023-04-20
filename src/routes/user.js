const express = require('express');
const Router    = express.Router()
const UsersController = require('../controllers/users-controller')
const verifyToken = require("../authorization/verify-token");
const verifyPermission = require("../authorization/role-check");
const userController = new UsersController();

Router.use(express.json());
Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); 
});
Router.post('/users', (req, res, next) => userController.createUser(req, res, next));
Router.get('/users', verifyToken, verifyPermission(), (req, res, next) => userController.getUsers(req, res, next));
Router.get('/users/:id', verifyToken, verifyPermission(), (req, res, next) => userController.getUser(req, res, next));

Router.post('/register', (req, res, next) => userController.register(req, res, next));
Router.post('/login', (req, res, next) => userController.login(req, res, next));
Router.post('/sendRegisterLink', verifyToken, verifyPermission(), (req, res, next) => userController.sendRegisterLink(req, res, next));

module.exports = Router
