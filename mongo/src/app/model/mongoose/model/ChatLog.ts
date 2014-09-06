/// <reference path='../../../declare.d.ts' />

import mongoose = require('mongoose');
import ChatLogDocument = require('../document/ChatLogDocument');

interface ChatLogModel extends mongoose.Model<ChatLogDocument> {
  findOrCreate(opt:{}, callback:Function):void;
}

export = ChatLogModel;
