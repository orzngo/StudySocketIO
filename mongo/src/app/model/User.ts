/// <reference path='../declare.d.ts' />

import mongoose = require('mongoose');
import BaseSchema = require('./mongoose/schema/BaseSchema');
import UserModel = require('./mongoose/model/User');
import UserDocument = require('./mongoose/document/UserDocument');



class User {
  static schema:BaseSchema = new BaseSchema({
    name:String,
    ip:String,
  });

  static UserModel:UserModel = <UserModel>mongoose.model('User', User.schema);

  //モデルのインスタンス
  private _user:UserDocument;

  //その他のインスタンス
  private _socketId:String

  constructor (name:String, ip?:String, socketId?:String) {
    this._user = new User.UserModel({name:name, ip:ip});
    this._socketId = socketId;
  }

  get name():String {
    return this._user.name;
  }

  set name(val:String) {
    this._user.name = val;
  }

  get ip():String {
    return this._user.ip;
  }

  set ip(val:String) {
    this._user.ip = val;
  }

  get socketId():String {
    return this._socketId;
  }

  set socketId(val:String) {
    this._socketId = val;
  }

  get document():UserDocument {
    return this._user;
  }

  save(callback:(error:any, res:UserDocument) => void):void {
    this._user.save(callback);
  }

}

export = User;
