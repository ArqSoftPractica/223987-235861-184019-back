const User = require('../db/models/users')

module.exports = class UserRepository {
    async createUser(userData) {
        const user = await User.create({
            userName: userData.userName,
            password: userData.password,
            email: userData.email,
            companyId: userData.companyId,
            role: userData.role
        });
        return user
    }

    async getUsers() {
        return await User.findAll();
    }
}
