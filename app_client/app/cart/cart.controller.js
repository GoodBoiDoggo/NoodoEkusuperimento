angular.module('app.cart')
    .controller('cartController', cartController);

cartController.$inject = ['$location', 'cart'];

function cartController($location, cart) {
    var vm = this;
    vm.loggedIn = false;
    vm.loaded = false;
    vm.fbid = $location.search().fbid;
    vm.userData = {};
    vm.cartData = {};
    pageInit();
    loadCart();
    // function loadUser() {
    //     if (vm.fbid) {
    //         FB.fbLoggedIn(vm.fbid)
    //             .then(function(res) {
    //                 if (res.data['0'].loginsession) {
    //                     vm.userData = res.data['0'];
    //                     vm.loggedIn = true;
    //                 } else {
    //                     vm.loggedIn = false;
    //                 }
    //             }, function(err) {
    //                 vm.loggedIn = false;
    //             });
    //     } else {
    //         if (authentication.isLoggedIn()) {
    //             authentication.currentUser()
    //                 .then(function(res) {
    //                     vm.userData = res.data;
    //                     vm.loggedIn = true;
    //                     if (res.data.active) {
    //                         vm.useractive = true;
    //                     }
    //                 }, function(e) {
    //                     console.log(e);
    //                 });
    //         }

    //     }
    // }

    function loadCart() {
        cart.get()
            .then(function(res) {
                console.log('Cart loaded.');
                vm.cartData = res;
            }, function(err) {
                console.log('Cart load failed: Server encountered error');
            });
    }

    function pageInit() {

    }
}