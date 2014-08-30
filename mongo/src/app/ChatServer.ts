/// <reference path="./declare.d.ts" />

var io = require('socket.io').listen(3100);

io.sockets.on('connection', function(socket:any) {
    socket.on('msg', function(data:any) {
          io.sockets.emit('msg', data);
            });
});
