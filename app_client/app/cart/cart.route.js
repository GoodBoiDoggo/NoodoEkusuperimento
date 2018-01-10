angular.module('app.cart')
    .config(getRoutes);

getRoutes.$inject = ['$routeProvider'];

function getRoutes($routeProvider) {
    $routeProvider
        .when('/cart', {
            templateUrl: 'cart/cart.html',
            controller: 'cartController',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/catalog' });
}