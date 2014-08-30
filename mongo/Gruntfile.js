module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.initConfig({
    typescript : {
      app : {
        src : ["src/app/ChatServer.ts"],
        dest : "app/ChatServer.js"
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
      case 'server':
        console.log("server");
      break;
      default:
        console.log("default");
      break;
    }
  });

  grunt.registerTask("default", ["typescript" , "uglify"]);

};
