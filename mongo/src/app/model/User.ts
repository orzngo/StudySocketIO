/// <reference path="./BaseSchema.ts" />

module ChatServer.model {
  export class User extends BaseSchema{
    private _socket:String;
    private _name:String;
    private _ip:String;

    constructor(name:String, ip:String = null, socket:String = null){
      this._name = name;
      this._ip = ip;
      this._socket = socket;
      super({
        modelName:'User',
        format : {
          name: String,
          ip: String
        }
      });


    }

    save(opt:any = {}, callback:Function = function(){}):void {
      opt.name = this._name;
      opt.ip = this._ip;
      super.save(opt,callback);
    }

    get name() : String {
      return this._name;
    }

    get ip() : String {
      return this._ip;
    }

    get socket() : String {
      return this._socket;
    }

  }
}
