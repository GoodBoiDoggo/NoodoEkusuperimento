angular.module('app.welcome')
        .config(getRoutes);

    getRoutes.$inject = ['$routeProvider'];

    function getRoutes($routeProvider) {
        $routeProvider
	        .when('/', {
	            templateUrl: 'welcome/welcome.html',
	            controller: 'welcomeController',
	            controllerAs: 'vm'
	        })
            .otherwise({ redirectTo: '/catalog' });
    }