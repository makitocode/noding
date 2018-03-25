//se crea el objeto socket de la librería de socket.io del lado cliente (io)
var socket = io.connect('http://localhost:2018', {'forceNew': true});

//Se escuchan los eventos del socket
socket.on('messages', (data)=>{
    console.log(data)
    render(data);
});

//Plantilla hecha a mano para la interfaz del chat
function render(data){
    var html = data.map(function(item, index){
        return(`<div>
                <strong>${item.autor}</strong>
                <em>${item.texto}</em>
                </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
    var payload = {
        autor: document.getElementById('nombreUsuario').value,
        texto: document.getElementById('texto').value
    };
    socket.emit('new-message', payload);
    return false;
}