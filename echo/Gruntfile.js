module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.initConfig({
    typescript : {
      app : {
        src : ["src/app/EchoServer.ts"],
        dest : "app/EchoServer.js"
      },
      web : {
        src : ["src/web/js/Client.ts"],
        dest : "src/web/js/Client.js"
      }
    },
    uglify : {
      web : {
        src : "src/web/js/Client.js",
        dest : "web/js/client.min.js"
      }
    }
  });

  grunt.registerTask("compile", function(target){
    switch (target){
      case 'echo':
        console.log("echo");
      break;
      default:
        console.log("default");
      break;
    }
  });

  grunt.registerTask("default", ["typescript" , "uglify"]);

};
