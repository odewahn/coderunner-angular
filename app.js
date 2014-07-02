(function(){
		
   var app = angular.module('console', []);

   app.controller('CoderunnerControl', function( $scope ) {
	
	  // Set up some default values
	  this.supported_languages=["ruby", "python" , "lua", "javascript", "coffeescript"];
	  this.selected_language = "ruby"

      var handle = this;

      this.mode = "editor"
      this.control_button_label = "Run"


      // Toggle the mode between code view and output view
      this.toggleMode = function() {
	     if (handle.mode === "editor") {
            handle.mode = "output";
            handle.control_button_label = "Edit"
	     } else {
            handle.mode = "editor";
            handle.control_button_label = "Run"		
	     }
      }

      //I'd start the JSREPL right in here -- it'll be great!

     // oh, and I should put the codemirror and the console in here, as well!

   });

   // Note: per the angular docs, the compiler stirips "data-" on attributes before it
   // attempts to do any matching, so we don't need to include it in the directive
   app.directive('executable', function() {
	  return {
	     restrict: 'A',
	     replace: true,
	     transclude: true,
	     templateUrl: 'coderunner.html',
	     link: function(scope, element, attrs) {
		    console.log(attrs.language);
	     }
	  }
   });


})();