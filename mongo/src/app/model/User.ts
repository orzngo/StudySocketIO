/// <reference path="./IMongooseSchema.ts"/>

module ChatServer.model.schema {
  class User implements IMongooseSchema{
    private _name:String;
    private _ip:String;

    constructor(name:String, ip:String = null){
      this._name = name;
      this._ip = ip;
    }

    get name() : String {
      return this._name;
    }

    get ip() : String {
      return this._ip;
    }

    get schema() : any {
      return {
name:String,
ip:String,
created:{type:Date, default: Date.now()},
updated:{type:Date, default: Date.now()}
      }
    }
  }
}
