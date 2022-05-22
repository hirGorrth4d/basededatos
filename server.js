const express = require('express')
const { engine } = require('express-handlebars') 
const app = express ()
const http = require ("http")
const server = http.createServer(app)

const port = process.env.PORT || 8080
const {Server} = require("socket.io")
const io = new Server(server)
const Mensajes = require('./classes/mensajes')
const Producto = require('./classes/producto')
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

const productApi = new Producto()


app.get('/', (req,res) => {
    const productos =  productApi.getAll()
    let messages =  messageApi.getAll()
    res.render('main', {title: 'Productos', productos, messages})
})

io.on("connection", (socket) =>{
    //productos
    socket.emit("producto", productApi)
    socket.on("producto_respuesta", (data) =>{
        console.log(data)
    })
    socket.on("dataProdCliente", (product) =>{
        productApi.addProduct(product)
        console.log(productApi)
        io.sockets.emit("update-products", productApi)
    })

    //mensajes
    console.log("usuario conectado")
    socket.emit("mensaje_chat", messageApi.getAll())
    socket.on("mensaje_respuesta", (data) =>{
        console.log(data)
    })

    socket.on("dataMensajesCliente", async (message)=>{
        console.log(data)
        const data = {
            email: message.email,
            message: message.message,
            date: new Date().toLocaleDateString(),
        }
        await messageApi.save(data)

        console.log(messageApi)

        io.sockets.emit("mensaje_chat", data)
    })
})



server.listen(port, () =>{
    console.log("server running on")
})