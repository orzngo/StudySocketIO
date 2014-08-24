module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.initConfig({
    typescript : {
      app : {
        src : ["echo/src/app/EchoServer.ts"],
        dest : "echo/src/app/EchoServer.js"
      },
      web : {
        src : ["echo/src/web/js/Client.ts"],
        dest : "echo/src/web/js/Client.js"
      }
    },
    uglify : {
      app : {
        dist : {
          src : ["echo/src/app/EchoServer.js"],
          dest : "echo/app/echo.min.js"
        }
      },
      web : {
        dist : {
          src : ["echo/src/web/js/Client.js"],
          dest : "echo/web/js/client.min.js"
        }
      }
    }
  });

  // `registerTask` でタスクに名前をつける
  // "default" でデフォルトのタスクを設定
  grunt.registerTask("default", ["typescript" , "uglify"]);

};
