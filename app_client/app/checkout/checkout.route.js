angular.module('app.checkout')
    .config(getRoutes);

getRoutes.$inject = ['$routeProvider'];

function getRoutes($routeProvider) {
    $routeProvider
        .when('/checkout', {
            templateUrl: 'checkout/checkout.html',
            controller: 'checkoutController',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/catalog' });
}