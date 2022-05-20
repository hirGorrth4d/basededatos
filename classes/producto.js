const { productOptions } = require('../options/options')
const knex = require('knex')(productOptions)

class Producto {
    constructor (db, table) {
        this.save = (product) => {
            db.schema.hasTable(table).then((exists) => {
                if (!exists) {
                    return db.schema.createTable(table, (t) => {
                        t.increments('id').primary()
                        t.string('name', 50)
                        t.integer('precio')
                    })
                }
            })
            db(table).insert(product)
            .then(()=>console.log('producto agregado'))
            .catch((err) => {
                console.log(err)
                throw err
            })
        }
        this.getAll = async() => {
            const product = await db.from(table)
            .select('*')
            .then((rows) => rows)
            return product
        }
    }
    guardarProducto(producto) {
        knex('articulos').insert(producto)
        .then(art => art)
        .catch ((err) => {
            console.log(err)
            throw err
        }).finally(()=>{
            knex.destroy()
        })
    }
    obtenerProducto() {
        knex('articulos').select('*')
        .then(rows=> rows)
        .catch((err) => {
            console.log(err) 
            throw err
            }
        ).finally(()=>{
            knex.destroy()
        })
    }
    agregarProducto = (req,res) => {
        let producto  = req.body
        this.guardarProducto(producto)
        console.log('producto agregado')
        res.redirect('/')
    }
    
}

module.exports = Producto