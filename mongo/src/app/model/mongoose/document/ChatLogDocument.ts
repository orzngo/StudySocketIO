/// <reference path='../../../declare.d.ts' />

import mongoose = require('mongoose');
import BaseDocument = require('./BaseDocument');
import UserDocument = require('./UserDocument');

interface ChatLogDocument extends BaseDocument {
  text:String;
  speaker:UserDocument;
}

export = ChatLogDocument;
