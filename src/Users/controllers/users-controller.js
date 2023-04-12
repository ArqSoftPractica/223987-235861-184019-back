const express   = require('express');
const Router    = express.Router()

module.exports = class EventsController {
    constructor() {
        //To be used later
    }
    
    async getUser(req, res, next) {
        res.json({name: "Mangocho", email: "mangochoGomex@pipicucu.com"});
    }
}
