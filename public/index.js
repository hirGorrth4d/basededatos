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

const form = document.querySelector('#form')
const titleInput = document.querySelector('#title')
const priceInput = docuemnt.querySelector('#price')
const stockInput = docuemnt.querySelector('#stock')
const codigoInput = docuemnt.querySelector('#codigo')

const table = document.querySelector('#table')

form .addEventListener('submit', e => {
    e.preventDefault()
    if (titleInput.value && priceInput.value && stockInput.value && codigoInput.values) {
        const product = {
            title: titleInput.value,
            price: priceInput.value,
            stock: stockInput.value,
            codigo: codigoInput.value
        }
        socket.emit('dataProdCliente', product)
        titleInput.value = ''
        priceInput.value = ''
        stockInput.value = ''
        codigoInput.value = ''
    }
})
socket.on('update-products', product => {
	const template = Handlebars.compile(
		"<td>{{title}}</td><td>{{price}}</td><td><img src={{thumbnail}} style='width:50px;'></img></td>"
	);

	const tr = document.createElement('tr');

	tr.innerHTML = template(product);

	table.appendChild(tr);
});

const messageForm = document.querySelector('#messages');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

const chat = document.querySelector('#chat');
const errors = document.querySelector('#errors');

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	errors.innerHTML = '';

	if (!emailInput.value) {
		const error = document.createElement('p');

		error.innerText = 'Please enter an email';
		errors.appendChild(error);
	}

	if (!messageInput.value) {
		const error = document.createElement('p');

		error.innerText = 'Please enter a message';
		errors.appendChild(error);
	}

	if (messageInput.value && emailInput.value) {
		const message = {
			email: emailInput.value,
			message: messageInput.value,
		};
		socket.emit('mensaje_chat', message);
		emailInput.value = '';
		messageInput.value = '';
	}
});

socket.on('dataMensajesCliente', message => {
	const template = Handlebars.compile(
		'<span style="color: blue; font-weight: 600;">{{this.email}}: </span><span style="color: brown;">[{{this.date}}] </span><span style="color: green; font-style: italic;">{{this.message}}</span>'
	);

	const li = document.createElement('li');

	li.innerHTML = template(message);

	chat.appendChild(li);
});

// const renderMensajes = (data) =>{

//     const date = Date.now()
//     const today = new Date(date)
    
//     let html = data.map(x => {
//         return `
//         <p><strong>${x.email}[${x.date}]:</strong> ${x.message}</p>
//         `
//     }).join(" ")
//     document.querySelector("#chat").innerHTML = html


// }

// const renderProducto = (data) =>{
//     let html = data.map(x =>{
//         return `<tr>
//                     <td>${x.title}</td>
//                     <td>${x.price}</td>
//                     <td>${x.stock}</td>
//                     <td>${x.codigo}</td>
//                 </tr>`
//     }).join(" ")
//     document.querySelector("#tablaProd").innerHTML = html
// }

// const addMensajes = () =>{
//     console.log("hola")

//     let objMensajes = {
//         email: document.querySelector("#mail").value,
//         msn: document.querySelector("#mensaje").value
    
//     }

//     socket.emit("dataMensajesCliente", objMensajes)
//     document.querySelector("#mensaje").value = " "
//     return false
// }

// const addProducto= () =>{
//     console.log("producto")
//     let objProducto = {
//         prod: document.querySelector("#producto").value,
//         price: document.querySelector("#precio").value,
//         stock: document.querySelector("#stock").value,
//         codigo: document.querySelector("#codigo").value
//     }
//     socket.emit("dataProdCliente", objProducto)
//     document.querySelector("#producto").value = " "
//     document.querySelector("#precio").value = " "
//     document.querySelector("#stock").value = " "
//     document.querySelector("#codigo").value = " "
//     return false
// }