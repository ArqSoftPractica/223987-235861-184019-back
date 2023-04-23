const db = require('../db/connection/connection')
const Purchase = db.purchase

module.exports = class PurchaseRepository {
    async createPurchase(purchaseData) {
        const purchase = await Purchase.create({
            companyId: purchaseData.companyId,
            providerId: purchaseData.providerId,
            date: purchaseData.date,
            totalcost: purchaseData.totalcost,
        });
        return purchase
    }

    async getPurchase(purchaseId) {
        return await Purchase.findOne({ where: { id: purchaseId } });
    }

    async getPurchases() { 
        return await Purchase.findAll();
    }
    async deletePurchase(id) {
        await Purchase.destroy({where: { id: id }});
    }

    async getPurchasesPerProvider(providerId, from, to) {
        return await Purchase.findAll({ where: { providerId: providerId, date: { [db.Sequelize.Op.between]: [from, to] } } });
    }

}
