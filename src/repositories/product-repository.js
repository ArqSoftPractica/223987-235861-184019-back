const db = require('../db/connection/connection')
const Product = db.product

module.exports = class ProductRepository {
    async createProduct(productData) {
        const product = await Product.create({
            name: productData.name,
            companyId: productData.companyId,
            description: productData.description,
            image: productData.image,
            price: productData.price,
            totalProductCount: productData.totalProductCount
        });
        return product
    }

    async getProduct(productId) {
        return await Product.findOne({ where: { id: productId } });
    }

    async getProducts(queryParams) {
        let queryParamsDb = {};
        if (queryParams['isActive'] != undefined) {
            queryParamsDb['isActive'] = queryParams['isActive']
        }
        return await Product.findAll({ where: queryParamsDb });
    }

    async editProduct(id, body) {
        body.id = undefined;
        return Product
                .update(body, { where: {id: id}})
                .then(([numOfRows, updatedRows]) => {
                    return Product.findOne({ where: {id: id} });
                })
    }
}
