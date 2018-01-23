angular.module('app.checkout')
    .controller('checkoutController', checkoutController);

checkoutController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile'];

function checkoutController($location, $anchorScroll, cart, authentication, Catalog, FB, profile) {
    var vm = this;
}