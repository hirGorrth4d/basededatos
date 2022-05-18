class Mensajes {
    constructor (db, table) {
        this.save = (message) => {
            db.schema.hasTable(table).then((exists) => {
                if (!exists) {
                    return db.schema.createTable(table, (t) => {
                        t.increments('id').primary()
                        t.string('name', 255)
                        t.integer('date')
                        t.string('text')
                    })
                }
            })
            db(table)
                .insert(message)
                .then(()=>console.log('mensaje agregado'))
                .catch((err) => {
                    console.log(err)
                    throw err
                })
        }
        this.getAll = async () => {
            const message = await db.from(table)
            .select('*')
            .then((rows)=> rows)
            return message
        }
    }
}

module.exports = Mensajes