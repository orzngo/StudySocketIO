/// <reference path="./declare.d.ts" />

$(function() {
  var socket:Socket = io.connect("http://www8008up.sakura.ne.jp:3100");
  $('form').submit(function() {
    socket.emit('msg', $('input').val());
    $('input').val('');
    return false;
  });
  socket.on('msg', function(data:any) {
    data = $('<div/>').text(data).html();
    $('div').prepend(data + '<br>');
  });
});
