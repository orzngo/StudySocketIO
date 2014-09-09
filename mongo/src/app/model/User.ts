/// <reference path='../declare.d.ts' />

import mongoose = require('mongoose');
import UserSchema = require('./mongoose/schema/UserSchema');
import UserModel = require('./mongoose/model/User');
import UserDocument = require('./mongoose/document/UserDocument');

class User {
  static schema:UserSchema = new UserSchema();

  static UserModel:UserModel = <UserModel>mongoose.model('User', User.schema);

  //モデルのインスタンス
  private _user:UserDocument;

  //その他のインスタンス
  private _socketId:String

  static findOrCreate(opt:{}, callback:(err:any, instance:User) => void):void {
    User.UserModel.findOrCreate(opt, (err:any, document:UserDocument) => {
      var user:User = new User(document);
      callback(err, user);
    });
  }


  constructor (document:UserDocument);
  constructor (name:String);
  constructor (value:any, ip?:String, socketId?:String) {
    if (value instanceof String) {
      this._user = new User.UserModel({name:value, ip:ip});
    } else {
      this._user = value;
    }
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
