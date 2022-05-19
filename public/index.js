const socket = io()

socket.on("mensaje_chat", (data) => {
    console.log(data)
    renderMensajes(data)
    socket.emit("mensaje_respuesta", "hola servidor")

})

socket.on("producto", (data) =>{
    renderProducto(data)
    socket.emit("producto_respuesta", "producto agregado")
})


const renderMensajes = (data) =>{

    const date = Date.now()
    const today = new Date(date)
    
    let html = data.map(x => {
        return `
        <p><strong>${x.email}[${today.toUTCString()}]:</strong> ${x.msn}</p>
        `
    }).join(" ")
    document.querySelector("#chat").innerHTML = html


}

const renderProducto = (data) =>{
    let html = data.map(x =>{
        return `<tr>
                    <td>${x.prod}</td>
                    <td>${x.price}</td>
                </tr>`
    }).join(" ")
    document.querySelector("#tablaProd").innerHTML = html
}

const addMensajes = () =>{
    console.log("hola")

    let objMensajes = {
        email: document.querySelector("#mail").value,
        msn: document.querySelector("#mensaje").value
    
    }

    socket.emit("dataMensajesCliente", objMensajes)
    document.querySelector("#mensaje").value = " "
    return false
}

const addProducto= () =>{
    console.log("producto")
    let objProducto = {
        prod: document.querySelector("#producto").value,
        price: document.querySelector("#precio").value
    }
    socket.emit("dataProdCliente", objProducto)
    document.querySelector("#producto").value = " "
    document.querySelector("#precio").value = " "
    return false
}