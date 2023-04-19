const express   = require('express');
const app       = express();
const rolePermissions = require("../constants");

function verifyRole(rolesWithAccess) {
    return (req, res, next) => {
        let role = req.user.role
        
        if (role) {
            if (role == 'ADMIN' || (rolesWithAccess && Object.values(rolesWithAccess).includes(role))) {
                return next();
            } else {
                res.status(403).json({error: "Unauthorized"});
            }
        } else {
            res.status(403).json({error: "Unauthorized"});
        }
    }
}
  
module.exports = verifyRole;
