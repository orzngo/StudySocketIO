/// <reference path="./declare.d.ts" />
/// <reference path="./model/User.ts" />
/// <reference path="./model/ChatLog.ts" />

module ChatServer{
  import User = model.User;

  export class ChatServer {
    private _mongoose:any;
    private _server:any;

    private _activeUsers:{ [id:string] : User; };


    constructor(port:Number){
      this._mongoose = require('mongoose');
      this._mongoose.connect('mongodb://localhost/orzngo');
      this._server = require('socket.io').listen(port);


      this._server.sockets.on('connection', function(socket:any) {
        socket.on('register', function(data:{name:String}) {
          if(!this._activeUsers[socket.id]) {
            var user:User = new User(data.name, socket.handshake.address.address);
            this._activeUsers[socket.id] = user;
            user.save({}, function(){console.log("saved");});

            this._initializeSocketEvents(socket);

          }
        });


      });
    }


    private _initializeSocketEvents(socket:any) {
        socket.on('msg', function(data:any) {
          this._server.sockets.emit('msg', data);
        });

        socket.on('disconnect', function(){
          this._server.sockets.emit('sysmsg', this._activeUsers[socket.id].name + ' disconnected.');
          delete this._activeUsers[socket.id];
        });
    }
  }
}


var server = new ChatServer.ChatServer(3100);
