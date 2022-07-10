const express = require('express')
const { engine } = require('express-handlebars') 
const app = express ()
const http = require ("http")
const server = http.createServer(app)
const {faker} = require("@faker-js/faker")

const port = process.env.PORT || 8080
const {Server} = require("socket.io")
const io = new Server(server)
const Mensajes = require('./classes/mensajes')
const Producto = require('./classes/producto')
const chatDao = require('./daos/chatDao');
const productDao = require('./daos/productDao');
app.use(express.static(__dirname+"/public"))

app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'index',
    extname: 'hbs'
}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))


const messageApi = new Mensajes()
let chat_db = []
const productApi = new Producto()


// FAKER

let productTest = []

const createFakes = (cant = 5 ) => {
    for (let i = 0; i <= cant; i++) {
        productTest.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            foto: faker.image.avatar()
        })
    }
}

app.get('/', (req,res) => {
    const productos =  productDao.getAll()
    let messages =  chatDao.getAll()
    res.render('main', {title: 'Productos', productos, messages})
})
//fake productos api
app.get('/productos-test', (req,res)=>{
    res.send({data: productTest})
})

app.post('/productos-test', (req,res) => {
    createFakes(req.query.cant)
    res.send('data creada')
})




// Normalizer

const normalizr = require('normalizr')
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema

//mensajes websocket
io.on("connection", (socket) =>{
    //productos
    socket.emit("producto", productDao)
    socket.on("producto_respuesta", (data) =>{
        console.log(data)
    })
    socket.on("dataProdCliente", (product) =>{
        productDao.addProduct(product)
        console.log(productDao)
        io.sockets.emit("update-products", productDao)
    })

    //mensajes
    console.log("usuario conectado")
    socket.emit("mensaje_chat", chatDao.getAll())
    socket.on("mensaje_respuesta", (data) =>{
        console.log(data)
    })

    socket.on("dataMensajesCliente", async (message)=>{
        console.log(data)
        const data = {
            email: message.email,
            message: message.message,
            date: new Date().toLocaleDateString(),
            edad: message.edad,
            nombre: message.nombre
        }
        await chatDao.save(data)
        chat_db.push(data)

        console.log(chatDao)

        io.sockets.emit("mensaje_chat", data)
        // norm
        const user = new schema.Entity('user', {}, {idAttribute: 'email'})
        const chatSchema = new schema.Entity("author", {authour: user}, {idAttribute: 'email'})
        
        const normalizedData = normalize(chat_db, [chatSchema])
        const denormalizeData = denormalize(chat_db, [chatSchema])


        console.log(normalizedData);
        console.log(denormalizeData);
    })
})



server.listen(port, () =>{
    console.log("server running on")
})