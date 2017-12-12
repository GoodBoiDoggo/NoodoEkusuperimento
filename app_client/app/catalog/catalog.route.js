angular.module('app.catalog')
        .config(getRoutes);
		
    getRoutes.$inject = ['$routeProvider'];

    function getRoutes($routeProvider) {
        $routeProvider
	        .when('/catalog', {
	            templateUrl: 'catalog/catalog.html',
	            controller: 'catalogController',
	            controllerAs: 'vm',
	            access:{restricted: false}
	        })
            .otherwise({ redirectTo: '/catalog' });
    }