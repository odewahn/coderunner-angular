(function(){
		
   var app = angular.module('console', []);

   app.controller('CoderunnerControl', function( $scope ) {
	
	  // Set up some default values
      var handle = this;
      this.mode = "editor"
      this.control_button_label = "Run"

      // These are set by the directive that processes the executable code example
      this.language = "";
      this.code = "";
      this.codemirror = null;
      this.jqconsole = null;

      // load jsrepl execution environment
      this.jsrepl_loaded = false;
      this.jsrepl = new JSREPL({  
		    input: function() {},  
		    output: function(data) {
		      handle.jqconsole.Write(data);
		    },  
		    result: function(data) {
		      handle.jqconsole.Write("=> " + data);
		    },  
		    error: function() {},  
		    progress: function() {},  
		    timeout: {  
		      time: 30000,  
		      callback: function() {}  
		    }  
		});


      // Create a codemirror item and attach it to the passed element
      // note that the element should be a textarea
      this.initCodemirror = function(e) {
	     handle.codemirror = CodeMirror.fromTextArea(e, {
			lineNumbers: true
		  });
      }


      // Initialize the console where output is displayed
      this.initJQConsole = function(e) {
	     handle.jqconsole = e.jqconsole("Starting " + handle.language + " interpreter...\n > " );
      };


      // Load the given language
      this.initJSREPL = function() {
         handle.jsrepl.loadLanguage(handle.language, function() {
            handle.jsrepl_loaded = true;
		    $scope.$apply();   // force the watch to reload so that the UI gets refreshed
		 }, true);

      }

      // this runs when the console mode is entered
      this.runCode = function() {
         handle.jsrepl.eval(handle.code);
      }; 

      // Toggle the mode between code view and output view
      this.toggleMode = function() {
         handle.code = handle.codemirror.getValue();	
	     if (handle.mode === "editor") {
            handle.mode = "output";
            handle.control_button_label = "Edit"
            handle.runCode();
	     } else {
            handle.mode = "editor";
            handle.control_button_label = "Run"	
	     }
      }

   });

   // Note: per the angular docs, the compiler stirips "data-" on attributes before it
   // attempts to do any matching, so we don't need to include it in the directive
   app.directive('executable', function() {
	  return {
	     restrict: 'A',
	     replace: true,
	     transclude: true,
	     scope: true,
	     templateUrl: 'coderunner.html',
	     link: function(scope, element, attrs) {
		    scope.coderunnerCtrl.language = attrs.language;
		    // Grab the original code sample that has been transcluded in
		    code = element.find(".editor").text();
		    // replace the div with a textarea containing the code
		    element.find(".editor").html("<textarea>"+code+"</textarea>");
		    scope.coderunnerCtrl.code = code;
		    scope.coderunnerCtrl.initCodemirror(element.find(".editor").find("textarea")[0]); //set up codemirror
		    scope.coderunnerCtrl.initJQConsole(element.find(".output"));
		    scope.coderunnerCtrl.initJSREPL();
	     }
	  }
   });


})();