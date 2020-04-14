const express=require('express')
const socketio=require('socket.io')
const app=express()
const http=require('http')
const server=http.createServer(app)
const io=socketio(server)
const PORT=process.env.PORT||2345
app.use('/',express.static(__dirname+'/frontend'))
let usersocketsID={}
io.on('connection',(socket)=>{
    console.log('New socket formed on '+socket.id)
    socket.emit('connected')
    socket.on('login',(data)=>{
        
        usersocketsID[data.username]=socket.id // assigning username a socket id
        // console.log(usersocketsID); 
    })
    socket.on('send_msg',(data)=>{
        if(data.message.startsWith('@')){
            let reciepent=data.message.split(':')[0].substr(1)
            let socket_id_of_reciepent=usersocketsID[reciepent];
            // console.log(socket_id_of_reciepent);
            io.to(socket_id_of_reciepent).emit('recv_msg',data)


        }
        else{
            io.emit('recv_msg',data)//sends to all the client where as socket.broadcast.emit send to all excepts the sender

        }
    })
})

server.listen(PORT,()=>console.log('server started at http://localhost:2345'))

