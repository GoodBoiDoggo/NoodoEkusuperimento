angular.module('app.login')
    .config(getRoutes);

getRoutes.$inject = ['$routeProvider'];

function getRoutes($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginController',
            controllerAs: 'vm',
            access: { restricted: false }
        })
        .otherwise({ redirectTo: '/catalog' });
}