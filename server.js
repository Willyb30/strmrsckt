var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var port = process.env.PORT || 3000;

//io.server=http;
// server init
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));




//Time room
app.get('/time/*/master', function(req, res) {
  res.sendFile(__dirname + '/index.html');
res.send('Welcome to time room master'+__dirname);
});
app.get('/time/*/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
res.send('Welcome to time room control'+__dirname);
});
app.get('/time', function(req, res) {
  res.sendFile(__dirname + '/RoomSelect.html');
res.send('Welcome to time room select'+__dirname);
});

// Full Control room
app.get('/control/*/master', function(req, res) {
res.sendFile(__dirname + '/FullControl.html');
//res.send('Welcome to control room master'+__dirname);
});
app.get('/control/*/', function(req, res) {
  res.sendFile(__dirname + '/FullControl.html');
//res.send('Welcome to control room control'+__dirname);
});
app.get('/control/', function(req, res) {
  res.sendFile(__dirname + '/RoomSelect.html');
//res.send('Welcome to time room select'+__dirname);
});
app.get('/Webrtc/', function(req, res) {
  res.sendFile('https://strmrlivesigserver.onrender.com/WebRtc');
//res.send('Welcome to time room select'+__dirname);
});

// Root
app.get('/*/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
//res.send('Welcome to index.html'+__dirname);
});

//app.listen(port+1, () => console.log(`App Listening on ${ port+1 }`));

http.listen(port,function(){console.log('server running on'+port)})

// ------------------- socket connection ----------------------------

io.on('connection', function(socket) {
    console.log("connection of someone on io")
    
  socket.on('create', function(room) {
    socket.join(room);
      console.log('** joined room : '+room);
  });

socket.on('message',function(msg,room,name){
        
        
        console.log('message from '+name+' in '+room+' : '+msg);
        
        io.to(room).emit('message',msg,name);
    });
     socket.on('test',function(msg){
        
        
        console.log('test message : '+msg);
        
        io.emit('message',msg,"");
    });

    //StrmrRequests
    
    socket.on('request Init',function(msg,room,name){
        console.log('request Init from '+name+' in '+room+' : '+msg);
        io.to(room).emit('request Init',msg,name);
    });
    
    socket.on('Init',function(gamedata,sportdata,targetclientname,room,Name)
    {
        console.log(gamedata)
        console.log(sportdata)
        console.log(targetclientname)
        io.to(room).emit('InitGame',gamedata,sportdata,targetclientname);
    });
    
     socket.on('Set Scoring',function(teamid,value,amount,room,Name)
    {
        io.to(room).emit('Set Scoring',teamid,value,amount,Name);
    });
   
   socket.on('Set Period',function(period,room,Name)
    {
       console.log("set period by"+Name)
        io.to(room).emit('Set Period',period,Name);
    });
    socket.on('Scoring',function(t1score,t2score,room,Name)
    {
        io.to(room).emit('UpdateScoring',t1score,t2score,Name);
    });
    socket.on('Set Event',function(teamid,value,amount,room,Name)
    {
        io.to(room).emit('Set Event',teamid,value,amount,Name);
    });
    socket.on('Set Foul',function(teamid,value,amount,room,Name)
    {
        io.to(room).emit('Set Foul',teamid,value,amount,Name);
    });
    
    socket.on('Show People',function(teamid,peopleid,peopleextradata,room,Name)
    {
        io.to(room).emit('Show People',teamid,peopleid,peopleextradata,Name);
    });

    socket.on('SetDowns',function(down,distance,room,Name)
    {
        io.to(room).emit('Set Down',down,distance,Name);
    });
    
    socket.on('Timer Start',function(value,room,Name)
    {
        console.log("timer started by "+Name)
        io.to(room).emit('Timer Start',value,room,Name);
    });
    socket.on('Timer Stop',function(value,room,Name)
    {
        io.to(room).emit('Timer Stop',value,room,Name);
    });
    socket.on('Timer Reset',function(value,room,Name)
    {
        io.to(room).emit('Timer Reset',value,Name);
        console.log("timer reset");
    });
    
    socket.on('Timer Set',function(min,sec,room,Name)
    {
        io.to(room).emit('Timer Set',min,sec,Name);
        console.log("time set")
    });
    

    
    
});
