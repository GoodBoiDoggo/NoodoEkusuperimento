console.log("APP MODULE REACHED!");
	angular.module('app',[
		'ngRoute',
		'appRoutes',
		'angularController',
		'catalogController',
		'itemController',
		'catalogService',
		'userService'
		]);

