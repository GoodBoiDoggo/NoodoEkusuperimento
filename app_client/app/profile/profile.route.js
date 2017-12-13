angular.module('app.profile')
        .config(getRoutes);
		
    getRoutes.$inject = ['$routeProvider'];

    function getRoutes($routeProvider) {
        $routeProvider
	        .when('/profile', {
	            templateUrl: 'profile/profile.html',
	            controller: 'profileController',
	            controllerAs: 'vm',
	            access:{restricted: true}
	        })
            .otherwise({ redirectTo: '/catalog' });
    }