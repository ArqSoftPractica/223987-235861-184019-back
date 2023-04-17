const db = require('../db/connection/connection')
const ProductPurchase = db.productPurchase

module.exports = class ProductPurchaseRepository {
    async createProductPurchase(productData) {
        const productPurchase = await ProductPurchase.create({
            date: productData.date,
            providerId: productData.providerId,
            totalcost: productData.totalcost,
        });
        return productPurchase
    }

    async getProductPurchase(productPurchaseId) {
        return await ProductPurchase.findOne({ where: { id: productPurchaseId } });
    }

    async getProductsOfPurchase(purchaseId) { 
        return await ProductPurchase.findAll({ where: { purchaseId: purchaseId } });
    }

}