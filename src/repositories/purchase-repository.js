const db = require('../db/connection/connection')
const Purchase = db.purchase

module.exports = class PurchaseRepository {
    async createPurchase(productData) {
        /*const product = await Product.create({
            name: productData.name,
            companyId: productData.companyId,
            description: productData.description,
            image: productData.image,
            price: productData.price,
            totalProductCount: productData.totalProductCount
        });
        return product
        */
    }

    async getPurchase(purchaseId) {
        //return await Product.findOne({ where: { id: productId } });
    }

    async getPurchases(queryParams) {
        /*let queryParamsDb = {};
        if (queryParams['isActive'] != undefined) {
            queryParamsDb['isActive'] = queryParams['isActive']
        }
        return await Product.findAll({ where: queryParamsDb });
        */
    }

}
