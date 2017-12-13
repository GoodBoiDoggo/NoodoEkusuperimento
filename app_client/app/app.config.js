angular.module('app')
	.run(function ($rootScope, $location, $route, AuthService) {
		console.log("module run");
	  $rootScope.$on('$routeChangeStart',
	    function (event, next, current) {
		  console.log("$rootScope.$on('$routeChangeStart')");
	
	      AuthService.getUserStatus()
	      .then(function(){
	    	  if(next.access != undefined){
		    	  console.log("AUTHHHHHHHHH");
		          console.log('restricted?: ' + next.access.restricted);
		    	  console.log(event);
		    	  console.log(next);
		        if (next.access.restricted && !AuthService.isLoggedIn()){
	
			          $location.path('/catalog/I00001');
			          $route.reload();
		        }
	    	  } 
	      }),function(err){
	    	  console.log("Error encountered.")
	      };
	  });
	});