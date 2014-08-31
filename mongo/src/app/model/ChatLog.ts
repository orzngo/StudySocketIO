/// <reference path="./BaseSchema.ts" />
/// <reference path="./User.ts" />

module ChatServer.model {
  export class ChatLog extends BaseSchema {
    private _user:User;
    private _text:String;
  
    constructor() {
      super({
        modelName:'ChatLog',
        format : {
user : [User],
text : String
        }
      });
    }

  }

}
