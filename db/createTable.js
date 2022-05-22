const { chatOptions, productOptions} = require('../options/options')

const knexMysql = require('knex')(productOptions)
const knexSqlite = require('knex')(chatOptions)

knexMysql.schema.hasTable('products').then((exists) => {
    if (exists) return;
    return knexMysql.schema.createTable('products', (table) => {
        table.increments()
        table.string('title').notNullable()
        table.integer('price').notNullable()
        table.integer('stock').notNullable()
        table.string('codigo').notNullable()
    })
}).catch((err) => console.log(err))

knexSqlite.schema.hasTable('messages').then((exists) => {
    if (exists) return;
    return knexSqlite.schema.createTable('messages', (table) => {
        table.increments()
        table.string('email')
        table.string('message')
        table.string('date')
    })
}).catch((err) => console.log(err))