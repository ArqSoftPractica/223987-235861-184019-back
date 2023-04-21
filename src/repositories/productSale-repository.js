const db = require('../db/connection/connection')
const ProductSale = db.productSale

module.exports = class ProductSaleRepository {
    async createProductSale(productData, companyId) {
        const productSale = await ProductSale.create({
            productId: productData.id,
            productCost: productData.productCost,
            productQuantity: productData.productQuantity,
            companyId: companyId
        });
        return productSale
    }

    async createProductsSale(productsData, companyId, saleId) {
        const newList = [];
        for (let i = 0; i < productsData.length; i++) {
            let productToInsert = {
                productId: productsData[i].id,
                productCost: productsData[i].productCost,
                productQuantity: productsData[i].productQuantity,
                companyId: companyId,
                saleId: saleId
            }
            newList.push(productToInsert);
        }
        
        const productsSale = await db.sequelize.transaction(async (t) => {
            const createdProuctSales = [];
            for (const item of newList) {
              let createdProuctSale = await ProductSale.create(item, { transaction: t });
              createdProuctSales.push(createdProuctSale);
            }
            return createdProuctSales
        })

        return productsSale
    }

    async getProductsSale(productSaleId) {
        return await ProductSale.findAll({ where: { id: productSaleId } });
    }

    async getProductSalesFromSale(saleId) {
        return await ProductSale.findAll({ where: { saleId: saleId } });
    }
}
