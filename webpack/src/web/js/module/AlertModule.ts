/// <reference path='../declare.d.ts' />


class AlertModule {
  static console():void {
    console.log("console.log!");
  }

  static alert():void {
    alert("alert!");
  }

}

export = AlertModule;
