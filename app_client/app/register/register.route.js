angular.module('app.register')
    .config(getRoutes);

getRoutes.$inject = ['$routeProvider'];

function getRoutes($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'register/register.html',
            controller: 'registerController',
            controllerAs: 'vm',
            access: { restricted: false }
        })
        .otherwise({ redirectTo: '/catalog' });
}