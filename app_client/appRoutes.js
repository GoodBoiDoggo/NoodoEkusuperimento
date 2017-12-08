angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	console.log("Approutes");
    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'angularController',
            controllerAs: 'vm'
            	
        })
        
       
        .when('/catalog', {
            templateUrl: 'views/catalog.html',
            controller: 'catalogController',
            controllerAs: 'vm'
        })
        
        .when('/item/:id', {
        	templateUrl: 'views/itemPage.html',
        	controller:'itemController',
        	controllerAs:'vm'
        })
    .otherwise({ redirectTo: '/' });
    
    console.log("Approutes2");
    $locationProvider.html5Mode(true);

}]);