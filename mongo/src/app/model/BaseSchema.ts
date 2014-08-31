/// <reference path="../declare.d.ts" />
/// <reference path="./ISchemaFormat.ts" />

module ChatServer.model {

  export class BaseSchema {
    static mongoose = require('mongoose');
    static initialized:boolean = false;
    static _model:any;

    private _schema:ISchemaFormat;
    private _instance:any;

    static initialize(schema:ISchemaFormat):void {
      console.log("initialize start");
      var mongoose = BaseSchema.mongoose;
      var format:any = schema.format;
      if(!schema.noTimestamp){
        format.created = {type:Date, Default: Date.now()};
        format.updated = {type:Date, Default: Date.now()};

        var schemaObject = new mongoose.Schema(format, {collection: schema.modelName});
        BaseSchema._setupPlugins(schemaObject);

        mongoose.model(schema.modelName, schemaObject);
        BaseSchema._model = mongoose.model(schema.modelName);

        BaseSchema.initialized = true;

      }
    }

    private static _setupPlugins(schema:any):void {
      schema.plugin(require('mongoose-findorcreate'));
    }

    constructor(schema:ISchemaFormat) {
      this._schema = schema;
      if(!BaseSchema.initialized){
        BaseSchema.initialize(schema);
      }
    }

    static Model():any {
      if (!BaseSchema.initialized) {
        throw new Error('initialize required.');
      }
      return BaseSchema._model;
    }

    save(opt:any, callback:Function):void {
      console.log(opt);
      BaseSchema.Model().findOrCreate(opt, function(err:any, instance:any, created:Boolean):void{
        this._instance = instance;
        callback(err, instance, created);
      });
    }


  }
}
