/// <reference path="./declare.d.ts" />

import User = require('./model/User');
import Mongoose = require('mongoose');
import SocketIO = require('socket.io');

module ChatServer{
  import Socket = SocketIO.Socket;
  import SocketManager = SocketIO.SocketManager;

  export class ChatServer {
    private _server:SocketManager;

    private _activeUsers:{ [id:string] : User; };


    constructor(port:Number){
      Mongoose.connect('mongodb://localhost/orzngo');
      this._server = SocketIO.listen(port);


      this._server.sockets.on('connection', function(socket:Socket) {
        socket.on('register', function(data:{name:String}){
          var user:User = new User(data.name, socket.handshake.headers.address, socket.id);
        });
      });
    }


    private _initializeSocketEvents(socket:any) {
        socket.on('msg', function(data:any) {
        });

        socket.on('disconnect', function(){
        });
    }
  }
}


var server = new ChatServer.ChatServer(3100);
