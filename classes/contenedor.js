const {MongoClient} = require('mongodb')
const {mongoOptions, chat} = require('../options/options')

class ContenedorMongo {
    constructor (conexion, db, coleccion) {
        this.mongo = new MongoClient(mongoOptions.connection)
        this.db = mongoOptions.ecommerceCollection
        this.coleccion = mongoOptions.chatSchema
    }

    async connect() {
        try {
            await this.mongo
            console.log("conectado")

        }catch(err) {
            throw err
        }
    }

    async getAll(){
        try{
            const items = await this.mongo
                .db(this.db)
                .collection(this.coleccion)
                .find({})
                return items
        } catch (err) {
            throw err
        }
    }
    async getById(id){
        try {
            const items = await this.mongo
                .db(this.db)
                .collection(this.coleccion)
                .findOne({id: id})
            return items
        } catch (err){
            throw err
        }
    }

    async addItem(item) {
        try {
            await this.mongo
            .db(this.db)
            .collection(this.coleccion)
            .insertOne(item)
        return item.id
        } catch (err) {
            throw err
        }
    }

    async updateItem(id, item) {
        try {
            return await this.mongo
            .db(this.db)
            .collection(this.coleccion)
            .updateOne({id: id}, {$set:item})
        } catch (err) {
            throw err
        }
    }

    async deleteItem(id) {
        try {
            return await this.mongo
            .db(this.db)
            .collection(this.coleccion)
            .deleteOne({id: id})
        } catch (err) {
            throw err
        }
    }

}

module.exports = ContenedorMongo;
