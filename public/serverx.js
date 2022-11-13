var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.use(express.static('public'));

app.get("/", function(req,res){
    console.log(req);
    var isjs=req.url.includes('.js');
    console.log(isjs);
    if (req.url.includes('.js')==false){
      res.sendFile(__dirname+'/webrtcserver.html');  
    }
    

})
io.sockets.on('connection', function(socket) {
  socket.on('create', function(room) {
    socket.join(room);
      console.log('** created room : '+room);
  });
    
    
});

io.on('connection',function(socket){
    console.log('a user is connected');
    socket.on('disconnect',function(){
        console.log('a use has disconnected');
    });
    socket.on('chat message',function(msg,room){
        
        
        console.log('message recu : '+msg);
        console.log('room is'+room)
        io.to(room).emit('chat message',msg)
    });
})
http.listen(3000,function(){
    console.log('server running on,3000')
    
})

