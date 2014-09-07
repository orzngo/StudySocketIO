/// <reference path='../../../declare.d.ts' />

import BaseSchema = require('./BaseSchema');

class UserSchema extends BaseSchema {
  constructor(schema: any, options: any = {}) {
    super(schema, options);
    this.plugin(require('mongoose-findorcreate'));
  }

}

export = UserSchema;
