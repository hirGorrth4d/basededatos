const Contenedor = require('../classes/contenedor');
const mongoOptions = require('../options/options');

const chatDao = new Contenedor(mongoOptions.connection, mongoOptions.ecommerceCollection, mongoOptions.chatSchema)

module.exports = chatDao