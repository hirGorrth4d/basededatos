const Contenedor = require('../classes/contenedor');
const mongoOptions = require('../options/options');

const productsDao = new Contenedor(mongoOptions, "ecommerce", "productos")

module.exports = productsDao