/// <reference path='../../../declare.d.ts' />

import mongoose = require('mongoose');

interface BaseDocument extends mongoose.Document {
  created : Date;
  updated : Date;
}

export = BaseDocument;
