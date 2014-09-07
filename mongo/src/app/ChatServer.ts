/// <reference path="./declare.d.ts" />

import User = require('./model/User');
import Mongoose = require('mongoose');
import SocketIO = require('socket.io');

import Socket = SocketIO.Socket;
import SocketManager = SocketIO.SocketManager;

class ChatServer {
  private _server:SocketManager;

  private _activeUsers:{ [id:string] : User; };


  constructor(port:Number){
    Mongoose.connect('mongodb://localhost/orzngo');
    this._server = SocketIO.listen(port);


    this._server.sockets.on('connection', function(socket:Socket) {
      socket.on('register', function(data:{name:String}){
        User.findOrCreate({name:name, ip:socket.handshake.headers.address}, (err:any, user:User) => {
          this._activeUsers[socket.id] = user;
          this._initializeSocketEvents(socket);
          socket.emit('registerd', 'registerd');
        });
      });
    });
  }

  private _initializeSocketEvents(socket:Socket) {
    socket.on('msg', function(data:any) {
      this._server.sockets.emit('msg', data,function(){
        console.log(data);
      });
    });

    socket.on('disconnect', function(){
      delete this._activeUsers[socket.id];
      socket.disconnect();
    });
  }
}

export = ChatServer;

