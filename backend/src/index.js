import express from 'express'
import {Server as WebSocketServer} from 'socket.io'
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
import {v4 as uuid} from 'uuid'
import TRANSACCION from './models/transaccion.model'
import "./database"

//setting server
app.set("port", process.env.PORT || 3000);



//static file

app.use(express.static(path.join(__dirname, 'public')))


//socket.io
const dataJson = {
    "mensaje":"nueva trasaccion",
    "cantidad":"8",
     "fecha":"33/10/45",
     "id": uuid()
}
const guardarTransaccion = async(req, res)=>{
    const data = new TRANSACCION({
        "mensaje":dataJson.mensaje,
         "monto":dataJson.cantidad,
        "date":dataJson.fecha,
         "id": uuid()
    })
    await data.save()
}


io.on('connection', (socket) => {
    guardarTransaccion()
    console.log('a user connected', socket.id );

    socket.emit('mensaje', dataJson)

    socket.on("pong", ()=>{
        console.log('recivido en el pong')
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(app.get('port'), function() {
    console.log('escuchando en el puerto : ', app.get("port"))
  })