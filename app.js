var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get("/", function(req, resp) {
    resp.sendFile(__dirname + '/index.html');
});

function action(msg){
    if (msg == 'next') {
        io.emit("action", "next");
    } else {
        io.emit("action", "prev");
    }
}

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("action", function(msg){
        action(msg);
    });
});

http.listen(3000, function(){
    console.log("Server up")
});
