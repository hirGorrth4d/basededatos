const express = require('express')
const app = express ()
const http = require ("http")
const server = http.createServer(app)

const port = process.env.PORT || 8080

const {Server} = require("socket.io")
const io = new Server(server)
const Mensajes = require('./classes/mensajes')
const Producto = require('./classes/producto')

const {engine} = require('express-handlebars')
const chatOptions = require('./options/options')

const messageApi = new Mensajes(chatOptions, 'messages')

const productApi = new Producto('ecommerce', 'productos')


io.on("connection", (socket) =>{
    //productos
    socket.emit("producto", productos)
    socket.on("producto_respuesta", (data) =>{
        console.log(data)
    })
    socket.on("dataProdCliente", (data) =>{
        productos.push(data)
        console.log(productos)
        io.sockets.emit("producto", productos)
    })

    //mensajes
    console.log("usuario conectado")
    socket.emit("mensaje_chat", mensajes)
    socket.on("mensaje_respuesta", (data) =>{
        console.log(data)
    })

    socket.on("dataMensajesCliente",(data)=>{
        console.log(data)
        mensajes.push(data)
        console.log(mensajes)
        // socket.emit("mensaje_chat", mensajes)
        io.sockets.emit("mensaje_chat", mensajes)
    })
})

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', productApi.listarProducto())

app.get('/productos', productApi.agregarProducto())


server.listen(port, () =>{
    console.log("server running on")
})