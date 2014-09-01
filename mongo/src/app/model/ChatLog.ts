/// <reference path="./BaseSchema.ts" />
/// <reference path="./User.ts" />

module ChatServer.model {
  export class ChatLog extends BaseSchema {
    private _user:User;
    private _text:String;

    constructor(user:User, text:String) {
      this._user = user;
      this._text = text;

      super({
        modelName:'ChatLog',
        format : {
          user : [User],
          text : String
        }
      });

    }

    get user():User {
      return this._user;
    }

    get text():String {
      return this._text;
    }

  }

}
