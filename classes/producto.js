const { productOptions } = require('../options/options')
const knex = require('knex')(productOptions)

class Producto {
    async addProduct(newData) {
        try {
            await knex('products').insert({
                title: newData.title,
                price: newData.price,
                stock: newData.stock,
                codigo: newData.codigo
            })
        } catch (err) {
            console.log(err)
        }
    }
    async getById(id) {
        try {
            const product = await knex('products').where({id})

            return product
        } catch (err) {
            console.log(err)
        }
    }
    async update(id, data) {
        try {
            return await knex('products').where({id}).update(
                {
                    title: data.title,
                    price: data.price,
                    stock: data.stock,
                    codigo: data.codigo
                },
                '*'
            )
        } catch (err) {
            console.log(err)
        }
    }
    async getAll() {
        return await knex('products')
    }
    async deleteById(id) {
        await knex('products').where({id}).del()
    }
    
}

module.exports = Producto