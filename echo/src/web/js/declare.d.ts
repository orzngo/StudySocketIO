/// <reference path="../../declare/jquery.d.ts" />
/// <reference path="../../declare/socket.io/socket.io.d.ts" />

declare var io : {
  connect(url:string): Socket;
}
interface Socket {
  on(event: string, callback: (data: any) => void ):any;
  emit(event: string, data: any):any;
}
