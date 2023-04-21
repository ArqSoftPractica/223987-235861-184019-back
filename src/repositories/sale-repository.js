const db = require('../db/connection/connection')
const Sale = db.sale

module.exports = class SaleRepository {
    async createSale(productData) {
        const sale = await Sale.create({
            companyId: productData.companyId,
            totalcost: productData.totalCost,
            clientName: productData.clientName
        });
        return sale
    }

    async getSale(saleId) {
        return await Sale.findOne({ where: { id: saleId } });
    }

    async getSales() { 
        return await Sale.findAll();
    }

    async deleteSale(id) {
        await Sale.destroy({where: { id: id }});
    }
}
