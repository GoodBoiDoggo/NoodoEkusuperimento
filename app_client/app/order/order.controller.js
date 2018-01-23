angular.module('app.order')
    .controller('orderController', orderController);

orderController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile'];

function orderController($location, $anchorScroll, cart, authentication, Catalog, FB, profile) {
    var vm = this;
}