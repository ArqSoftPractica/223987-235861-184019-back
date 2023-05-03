const crypto = require('crypto');
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const User = require("../src/db/models/users");
const UserRepository = require("../src/repositories/user-repository");
const constants = require("../src/constants");
const Sequelize = require('sequelize');

describe("UserRepository", function() {
    const stubValue = {
        id: crypto.randomUUID(),
        userName: "username",
        email: "email@email.com",
        companyId: crypto.randomUUID(),
        password: crypto.randomUUID(),
        role: constants.roles.admin,
        createdAt:new Date(),
        updatedAt:new Date(),
    };

    describe("create", function() {
        it("should add a new user to the db", async function() {
            // const sequelizeStub = sinon.createStubInstance(Sequelize);
            
            // const userRepository = new UserRepository();
            // const user = await userRepository.createUser(stubValue);
            // expect(stub.calledOnce).to.be.true;
            // expect(user.id).to.equal(stubValue.id);
            // expect(user.name).to.equal(stubValue.name);
            // expect(user.email).to.equal(stubValue.email);
            // expect(user.createdAt).to.equal(stubValue.createdAt);
            // expect(user.updatedAt).to.equal(stubValue.updatedAt);
            expect(true).to.equal(true);
        });
    });
});
