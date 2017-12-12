angular.module('app')
	.run(function ($rootScope, $location, $route, AuthService) {
		console.log("module run");
	  $rootScope.$on('$routeChangeStart',
	    function (event, next, current) {
		  console.log("$rootScope.$on('$routeChangeStart')");
	
	      AuthService.getUserStatus()
	      .then(function(){
	    	  console.log("AUTHHHHHHHHH");
	          console.log('restricted?: ' + next.access.restricted);
	    	  console.log(event);
	    	  console.log(next);
	    	  console.log(current);
	        if (next.access.restricted && !AuthService.isLoggedIn()){

	        	if(next.templateUrl == 'catalog/catalog.html'){
	        		console.log("already going to catalog.");
	        	}
	        	else{
		          $location.path('/catalog');
		          $route.reload();
	        	}
	        }
	      }),function(err){
	    	  console.log("Error encountered.")
	      };
	  });
	});