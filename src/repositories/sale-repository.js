const db = require('../db/connection/connection')
const Sale = db.sale
const ProductSale = db.productSale
const Product = db.product

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

    async getSalesByCompanyWithSaleProducts(companyId) { 
        return await Sale.findAll({
            where: { companyId: companyId },
            include: [{
                model: ProductSale,
                as: 'saleProducts',
                required: false,
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['name']
                }]
            }],
        });
    }

    async deleteSale(id) {
        await Sale.destroy({where: { id: id }});
    }
}
