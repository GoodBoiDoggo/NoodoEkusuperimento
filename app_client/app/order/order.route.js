angular.module('app.checkout')
    .config(getRoutes);

getRoutes.$inject = ['$routeProvider'];

function getRoutes($routeProvider) {
    $routeProvider
        .when('/order', {
            templateUrl: 'order/order.html',
            controller: 'orderController',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/catalog' });
}