/// <reference path="./declare.d.ts" />
import io = require('socket.io-client');

module ORZChatClient {
  import Socket = io.Socket;
  export class ChatClient {
    private _socket:Socket;

    constructor() {
    }

    connect(port:Number, name:String):void {
      this._print('connection');
      this._socket = io.connect('http://www8008up.sakura.ne.jp:' + port);
      this._socket.on('connect', () => {
        this._print('connectedB');
        this._register(name);
      });
    }

    private _register(name:String):void {
      this._socket.emit('register', {name:name}, () => {
        this._socket.on('registerd', () => {
          this._print('registerd');
          this._initializeSocketEvents(this._socket);
        });
      });
    }

    private _initializeSocketEvents(socket:Socket):void {
      socket.on('msg', this._print);
      socket.on('disconnect', () => {
        this._print('disconnected');
      });
    }

    private _print(data:any):void {
      console.log(data);
    }
  
  }
}

var client:ORZChatClient.ChatClient = new ORZChatClient.ChatClient();

client.connect(3100, 'orzngo');

