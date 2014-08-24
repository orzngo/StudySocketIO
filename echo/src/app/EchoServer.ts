/// <reference path="./declare/declare.d.ts" />

var fs = require('fs');
var app = require('http').createServer(function(req:any, res:any) {
    res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(fs.readFileSync('index.html'));  
}).listen(3100);
var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket:any) {
    socket.on('msg', function(data:any) {
          io.sockets.emit('msg', data);
            });
});
