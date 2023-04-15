const db = require('../db/connection/connection')
const Provider = db.provider

module.exports = class ProviderRepository {
    async createProvider(providerData) {
        const provider = await Provider.create({
            name: providerData.name,
            address: providerData.address,
            email: providerData.email,
            phone: providerData.phone
        });
        return provider
    }

    async getProvider(providerId) {
        return await Provider.findOne({ where: { id: providerId } });
    }

    async getProviders(queryParams) {
        let queryParamsDb = {};
        if (queryParams['isActive'] != undefined) {
            queryParamsDb['isActive'] = queryParams['isActive']
        }
        return await Provider.findAll({ where: queryParamsDb });
    }

    async editProvider(id, body) {
        body.id = undefined;
        return Provider
                .update(body, { where: {id: id}})
                .then(([numOfRows, updatedRows]) => {
                    return Provider.findOne({ where: {id: id} });
                })
    }
}
