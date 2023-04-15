const Company = require('../db/models/company')

module.exports = class CompanyRepository {
    async createCompany(companyName) {
        const company = await Company.create({ name: companyName});
        return company;
    }

    async getCompanyByName(companyName) {
        const company = await Company.findOne({
            where: {
                name: companyName,
            },
        });
        return company;
    }
}
