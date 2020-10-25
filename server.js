const io = require('socket.io')(5000)

io.on('connection', socket => {
    const id = socket.handshake.query.id
    console.log(id)
    socket.join(id)

    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)// chechking the recipients and filtering which is not the sender himself
            newRecipients.push(id)

            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})


