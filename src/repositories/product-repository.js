const db = require('../db/connection/connection')
const Product = db.product
var AsyncLock = require('async-lock');
var lock = new AsyncLock();
const KEY_LOCK_EDIT_PRODUCT = 'KEY_LOCK_EDIT_PRODUCT';

module.exports = class ProductRepository {
    async createProduct(productData) {
        const product = await Product.create({
            name: productData.name,
            companyId: productData.companyId,
            description: productData.description,
            image: productData.image,
            price: productData.price,
            stock: productData.stock
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
        let product = undefined
        await lock.acquire(KEY_LOCK_EDIT_PRODUCT + id, await async function() {
            product = await Product
                .update(body, { where: {id: id}})
                .then(([numOfRows, updatedRows]) => {
                    return Product.findOne({ where: {id: id} });
                });
        })
        return product
    }

    async changeProductStock(id, stockNumberToChange) {
        await lock.acquire(KEY_LOCK_EDIT_PRODUCT + id, await async function() {
            let productToUpdate = await Product.findOne({ where: { id: id } });
            if (!productToUpdate) {
                throw Error(`No product with id: ${productToUpdate.id}`)
            }
            if (productToUpdate.isActive && productToUpdate.isActive == false) {
                throw Error(`${productToUpdate.name} with id: ${productToUpdate.id} is INACTIVE.`)
            }
            let newStockValue = productToUpdate.stock + stockNumberToChange
            if (newStockValue >= 0) {
                await Product.update(
                    {stock: newStockValue},
                    { where: { id: id } }
                )
                .then(([numOfRows, updatedRows]) => {
                    return Product.findOne({ where: {id: id} });
                })
            }
        })
    }

    async changeProductsStock(productsWithQuantityToChange, addToStock) {
        await db.sequelize.transaction(async (t) => {
            for (const item of productsWithQuantityToChange) {
                await lock.acquire(KEY_LOCK_EDIT_PRODUCT + item.id, await async function() {
                    let productToChangeQuantity = await Product.findOne({ where: { id: item.id } });
                    if (!productToChangeQuantity) {
                        throw Error(`No product with id: ${item.id}`)
                    }
                    if (productToChangeQuantity.isActive == false) {
                        throw Error(`${productToChangeQuantity.name} with id: ${productToChangeQuantity.id} is INACTIVE.`)
                    }

                    let correctQuantity;
                    if (addToStock == true) {
                        correctQuantity = item.productQuantity
                    } else{
                        correctQuantity= -item.productQuantity
                    }

                    let newStock = productToChangeQuantity.stock + correctQuantity;
                    if (newStock >= 0) {
                        await Product.update(
                            { stock: newStock} ,
                            { where: { id: item.id } }
                        )
                    } else {
                        throw Error(`No stock for product: ${productToChangeQuantity.name}, with id: ${productToChangeQuantity.id}. Current stock is ${productToChangeQuantity.stock}, while the purchase tries to get ${item.productQuantity}`)
                    }
                })
            }
        })
    }
}
