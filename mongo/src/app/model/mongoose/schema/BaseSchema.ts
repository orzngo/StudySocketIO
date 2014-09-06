/// <reference path='../../../declare.d.ts' />

import mongoose = require('mongoose');

class BaseSchema extends mongoose.Schema {
  constructor(schema?: Object, options?: any) {
    if (!options.noTimestamp) {
      options.created = {type : Date , default:Date.now};
      options.updated = {type : Date , default:Date.now};
    }
    super(schema, options);
  }

}

export = BaseSchema;
