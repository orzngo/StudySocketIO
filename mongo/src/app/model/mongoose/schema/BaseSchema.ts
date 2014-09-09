/// <reference path='../../../declare.d.ts' />

import mongoose = require('mongoose');

class BaseSchema extends mongoose.Schema {
  constructor(schema: any = {}, options: any = {}) {
    if (!options.noTimestamp) {
      schema.created = {type : Date , default:Date.now};
      schema.updated = {type : Date , default:Date.now};
    }
    super(schema, options);
  }

}

export = BaseSchema;
