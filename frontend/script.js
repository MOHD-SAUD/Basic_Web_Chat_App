let socket=io()   // we can define in argument to server to which we want to connect but because we connecting to the same server to which our web page has been served se no need to give arguemnts
socket.on('connected',()=>{
    console.log(socket.id)
})


$(()=>{
    let msgbox=$('#msgbox')
    let msg_send=$('#msg_send')
    let msglog=$('#msglog')
    let loginbox=$('#loginbox')
    let loginbtn=$('#loginbtn')
    let login_div=$('#login-div')
    let chat_div=$('#chat-div')
    let user=''
    loginbtn.click(()=>{
        user=loginbox.val()
        if(user=="") window.alert("Please enter correct username")
        else{
            $('#salutation').append("<b>Hello "+user+"!</b>")
            login_div.hide()
            chat_div.show()
            // msglog.show()
            // making an instance and sending the username
            socket.emit('login',{username:user})
        }
    })



    msg_send.click(()=>{
        // let msg=msgbox.val()
        // msgbox.clear()
        socket.emit('send_msg',{username:user,message:msgbox.val()})
        msgbox.val("")
    })

    socket.on('recv_msg',(data)=>{
        msglog.append('<li>'+data.username+":"+data.message+'</li>')
    })
})