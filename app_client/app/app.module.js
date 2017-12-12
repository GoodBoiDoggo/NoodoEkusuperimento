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

var appModule = 
	angular
    .module('app', [
        /* Shared Modules */
        'app.core',
        /* Feature Modules */
  //      'app.welcome',
        'app.catalog',
        'app.item'
    ]);
    appModule.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
	