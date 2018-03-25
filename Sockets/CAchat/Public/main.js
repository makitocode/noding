//se crea el objeto socket de la librería de socket.io del lado cliente (io)
var socket = io.connect('http://localhost:2018', {'forceNew': true});

//Se escuchan los eventos del socket
socket.on('messages', (data)=>{
    console.log(data)
    render(data);
});

//Plantilla hecha a mano para la interfaz del chat
function render(data){
    var html = `<div>
                    <strong>${data.autor}</strong>
                    <em>${data.texto}</em>
                </div>`;
    document.getElementById('messages').innerHTML = html;
}