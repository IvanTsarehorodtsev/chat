var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

app.get('/', function(req, res){
  console.log("Started!");
});

let userList = [];

io.on('connection', function(socket){

    socket.on("disconnect", function() {
        io.emit("user disconnected", socket.id);
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('user connected', function(name){
        var hasUser = userList.some(function(item) {
            return item.username === name;
        });
        
        let newUser = {
            username: name,
            socket: socket.id,
            status: "online"
        }

        if(!hasUser) {
            userList.push(newUser);
        } else {
            userList.map(function(item) {
                if(item.username === name) {
                    item.socket = socket.id;
                }
                return item;
            })
        }
        
        io.emit('user connected', userList);
    });

    socket.on("user typing" , function(user) {
        io.emit('user typing', user);
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
