console.log("APP MODULE REACHED!");
//	angular.module('app',[
//		'ngRoute',
//		'appRoutes',
//		'angularController',
//		'catalogController',
//		'itemController',
//		'catalogService',
//		'userService'
//		]);

	angular
    .module('app', [
        /* Shared Modules */
        'app.core',
        /* Feature Modules */
  //      'app.welcome',
        'app.catalog',
        'app.item'
    ])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
	.run(function ($rootScope, $location, $route, AuthService) {
	  $rootScope.$on('$routeChangeStart',
	    function (event, next, current) {
	      AuthService.getUserStatus()
	      .then(function(){
	    	  console.log("AUTHHHHHHHHH");
	    	  console.log(event);
	    	  console.log(next);
	    	  console.log(current);
	        if (next.access.restricted && !AuthService.isLoggedIn()){
	          $location.path('/catalog');
	          $route.reload();
	        }
	      });
	  });
	});