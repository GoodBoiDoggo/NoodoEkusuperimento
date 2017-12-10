angular.module('app.item')
        .config(getRoutes);

    getRoutes.$inject = ['$routeProvider'];

    function getRoutes($routeProvider) {
        $routeProvider
	        .when('/catalog/:id', {
	            templateUrl: 'item/item.html',
	            controller: 'itemController',
	            controllerAs: 'vm'
	        })
            .otherwise({ redirectTo: '/catalog' });
    }