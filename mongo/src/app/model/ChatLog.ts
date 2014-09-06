/// <reference path='../declare.d.ts' />

import mongoose = require('mongoose');
import BaseSchema = require('./mongoose/schema/BaseSchema');
import User = require('./User');
import UserModel = require('./mongoose/model/User');
import UserDocument = require('./mongoose/document/UserDocument');
import ChatLogModel = require('./mongoose/model/ChatLog');
import ChatLogDocument= require('./mongoose/document/ChatLogDocument');

class ChatLog {
  static schema:BaseSchema = new BaseSchema({
    text : String,
    speaker : {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  static ChatLogModel:ChatLogModel = <ChatLogModel>mongoose.model('ChatLog', ChatLog.schema);

  private _log:ChatLogDocument;
  private _speaker:User;

  constructor(text:String, speaker:User) {
    this._speaker = speaker;
    this._log = new ChatLog.ChatLogModel({text:text, speaker:speaker.document});
    this._log.populate('speaker', (error:any, instance:ChatLogDocument):void => {
      this._log = instance;
    });
  }

  get speaker():User {
    return this._speaker;
  }


}

export = ChatLog;
