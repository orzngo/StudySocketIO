/// <reference path="../declare.d.ts" />
/// <reference path="./ISchemaFormat.ts" />

module ChatServer.model {

  export class BaseSchema {
    static mongoose = require('mongoose');
    static initialized:boolean = false;
    static _model:any;

    private _instance:any;
    private _schema:ISchemaFormat;

    static initialize(schema:ISchemaFormat):void {
      var mongoose = BaseSchema.mongoose;
      var format:any = schema.format;
      if(!schema.noTimestamp){
        format.created = {type:Date, Default: Date.now};
        format.updated = {type:Date, Default: Date.now};
      }
      var schemaObject = new mongoose.Schema(format);
      BaseSchema._setupPlugins(schemaObject);

      mongoose.model(schema.modelName, schemaObject);
      BaseSchema._model = mongoose.model(schema.modelName);

      BaseSchema.initialized = true;

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
      BaseSchema.Model().findOrCreate(opt, (err:any, instance:any, created:Boolean):void =>{
        this._instance = instance;
        callback(err, instance, created);
      });
    }

    toJSONString():String {
      var result:String;
      var targetObject:any;
      var id:String;
      var prefix:String = "_";
      
      if (this._instance) {
        targetObject = this._instance
        id = targetObject._id;
        prefix = "";
      } else {
        targetObject = this;
        id = null;
      }
      result = '{\n"_id" : ' + id + ',\n';

      for (var i in this._schema.format){
        var key = i;
        if (targetObject[prefix + key]){
          result +='"' + i + '"' + " : " + ((targetObject[key].toJSONString) ? targetObject[key].toJSONString() : targetObject[key] + ",\n");
        }
      }
      result += "}";
      return result;
    }
  }
}
