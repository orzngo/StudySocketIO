/// <reference path='../../../declare.d.ts' />

import BaseSchema = require('./BaseSchema');

class UserSchema extends BaseSchema {
  constructor() {
    var schema = {
      name : String,
      age : Number
    };
    var options = {};
    super(schema, options);
    this.plugin(require('mongoose-findorcreate'));
  }

}

export = UserSchema;
