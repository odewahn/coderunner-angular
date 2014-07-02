(function(){
		
   var app = angular.module('console', []);

   app.controller('CoderunnerControl', function() {
	  this.supported_languages=["ruby", "python" , "lua", "javascript", "coffeescript"];
	  this.selected_language = "ruby"
      this.mode = "editor"
      this.control_button_label = "Run"

      //I'd start the JSREPL right in here -- it'll be great!

     // oh, and I should put the codemirror and the console in here, as well!

   });

   app.directive('coderunner',function() {
	  return {
	     restrict: 'E',
	     templateUrl: 'coderunner.html'	
	  }
   });


})();