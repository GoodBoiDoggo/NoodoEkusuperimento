angular.module('app.cart')
    .controller('cartController', cartController);

cartController.$inject = ['$location', 'cart'];

function cartController($location, cart) {
    var vm = this;
    vm.loggedIn = false;
    vm.loaded = false;
    vm.fbid = $location.search().fbid;
    vm.userData = {};

    pageInit();

    function loadCart() {
        cart.get()
            .then(function(res) {
                console.log('Cart loaded.');
                vm.cartData = res.data;
            }, function(err) {
                console.log('Cart load failed: Server encountered error');
            });
    }

    function pageInit() {
        loadCart();
    }
}