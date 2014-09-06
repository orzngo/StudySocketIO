/// <reference path='../../../declare.d.ts' />

import BaseDocument = require('./BaseDocument');

interface UserDocument extends BaseDocument {
  name : String;
  ip : String;
}

export = UserDocument;
