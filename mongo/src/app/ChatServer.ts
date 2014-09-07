/// <reference path="./declare.d.ts" />

import User = require('./model/User');
import Mongoose = require('mongoose');
import SocketIO = require('socket.io');

import Socket = SocketIO.Socket;
import SocketManager = SocketIO.SocketManager;

class ChatServer {
  private _server:SocketManager;

  private _activeUsers:User[] = new Array<User>();


  constructor(port:Number){
    Mongoose.connect('mongodb://localhost/orzngo');
    this._server = SocketIO.listen(port);

    this._server.sockets.on('connection', (socket:Socket) => {
      console.log('connection');
      socket.on('register', (data:{name:String}) => {
        console.log('register');
        User.findOrCreate({name:data.name, ip:socket.handshake.headers.address}, (err:any, user:User) => {
          console.log('registerd');
          this._activeUsers[socket.id] = user;
          this._initializeSocketEvents(socket);
          socket.emit('registerd', 'registerd');
        });
      });
    });
  }

  private _initializeSocketEvents(socket:Socket) {
    socket.on('msg', (data:any) => {
      this._server.sockets.emit('msg', data,function(){
        console.log(data);
      });
    });

    socket.on('disconnect', () => {
      delete this._activeUsers[socket.id];
      socket.disconnect();
    });
  }
}

export = ChatServer;

