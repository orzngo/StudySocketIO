/// <reference path='../../../declare.d.ts' />

import mongoose = require('mongoose');
import UserDocument = require('../document/UserDocument');

interface UserModel extends mongoose.Model<UserDocument> {
  findOrCreate(opt:{}, callback:Function):void;
}

export = UserModel;
