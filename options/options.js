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

module.exports = {
    productOptions,
    chatOptions
}