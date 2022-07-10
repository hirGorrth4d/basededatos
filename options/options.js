const mongoose = require('mongoose');
const {Schema} = mongoose


const productOptions = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
    pool: {min: 0, max: 8}
}

const chatOptions = {
    client: 'sqlite3',
    connection: {
        filename: '../db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

const mongoOptions = {
    connection: mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }),
    ecommerceCollection: 'ecommerce',
    chatSchema: new Schema ({
        author: [{
            id: {type: String, require: true, max: 100},
            nombre:{type: String, require: true, max: 100} ,
            apellido: {type: String, require: true, max: 100},
            edad: {type: String, require: true, max: 100},
            alias: {type: String, require: true, max: 100},
            avatar: {type: String, require: true, max: 100},
        }],
        text: {type: String, require: true, max: 100}
    }),
    
}
const chat = mongoose.model(mongoOptions.ecommerceCollection, mongoOptions.chatSchema)

module.exports = {
    productOptions,
    chatOptions,
    mongoOptions,
    chat
}