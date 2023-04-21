const express = require('express');
const Router    = express.Router()
const SalesController = require('../controllers/sales-controller')
const verifyToken = require("../authorization/verify-token");
const verifyPermission = require("../authorization/role-check");
const salesController = new SalesController();

Router.use(express.json());

Router.post('/sales', verifyToken, (req, res, next) => salesController.createSale(req, res, next));
Router.get('/sales', verifyToken, (req, res, next) => salesController.getSales(req, res, next));
Router.get('/sales/:id', verifyToken, (req, res, next) => salesController.getSale(req, res, next));

module.exports = Router
