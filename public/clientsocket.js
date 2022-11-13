 var socket = io();
 var Socket = io.connect();
 var splitUrl = window.location.href;
 var room = splitUrl.split('/')[3];
 var name = splitUrl.split('/')[4];

 socket.emit('create', room);
 if(name!="undefined" && name!=""){
         issender=true;
     }
 var send = function () {
     var text = document.getElementById('m').value;
     socket.emit('chat message', text, room);
    
 }

 var receive = function (msg) {
     var li = document.createElement('li');
     li.innerText = msg;
     document.getElementById('messages').appendChild(li);
     offer_other=msg
    
 document.querySelector('#hisoffer').textContent = JSON.stringify(msg)

     
 }
 socket.on('chat message', receive);