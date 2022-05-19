const { productOptions } = require('../options/options')

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
        productOptions('articulos').insert(producto)
        .then(art => art)
        .catch ((err) => {
            console.log(err)
            throw err
        })
    }
    obtenerProducto() {
        productOptions('articulos').select('*')
        .then(rows=> rows)
        .catch((err) => {
            console.log(err) 
            throw err
            }
        )
    }
    agregarProducto = (req,res) => {
        let producto  = req.body
        this.guardarProducto(producto)
        console.log('producto agregado')
        res.redirect('/')
    }
    listarProducto =(req,res) => {
        let producto = this.obtenerProducto()
        res.render('main', {lisprod: producto, listsExists: true})
    }
}

module.exports = Producto