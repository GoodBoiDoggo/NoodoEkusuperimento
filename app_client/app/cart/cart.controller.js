angular.module('app.cart')
    .controller('cartController', cartController);

cartController.$inject = ['$location', 'cart', 'authentication', 'Catalog'];

function cartController($location, cart, authentication, Catalog) {
    var vm = this;
    vm.itemIds = '';
    vm.loggedIn = false;
    vm.loaded = false;
    vm.fbid = $location.search().fbid;
    vm.userData = {};
    vm.cartData = {};

    pageInit();

    function loadCart() {
        vm.cartData.totalPrice = 1531998;
        vm.cartData.cartItems = [{
                prodCode: "I0000108-0",
                itemQty: 5,
                subtotal: 20000
            },
            {
                prodCode: "I0000206-0",
                itemQty: 2,
                subtotal: 11998
            },
            {
                prodCode: "I0000510-0",
                itemQty: 3,
                subtotal: 1500000
            }

        ];
        //parse product codes
        for (i = 0; i < vm.cartData.cartItems.length; i++) {
            vm.itemIds = vm.itemIds.concat(vm.cartData.cartItems[i].prodCode.substring(0, 6));
            vm.cartData.cartItems[i].displayCode = vm.cartData.cartItems[i].prodCode.substring(0, 6);
            vm.cartData.cartItems[i].displaySize = parseFloat(vm.cartData.cartItems[i].prodCode.substring(6).replace('-', '.'));
            vm.cartData.cartItems[i].displayName = 'Loading...';
            if (i != vm.cartData.cartItems.length - 1) {
                vm.itemIds = vm.itemIds.concat('-');
            }
        }
        loadItemDetails();

        // if (vm.fbid) {
        //     cart.get()
        //         .then(function(res) {
        //             console.log('Cart loaded.');
        //             vm.cartData = res.data;
        //         }, function(err) {
        //             console.log('Cart load failed: Server encountered error');
        //         });
        // } else {
        //     authentication.currentUser()
        //         .then(function(res) {
        //             console.log(res.data);
        //             vm.userData = res.data;
        //             cart.get(vm.userData._id)
        //                 .then(function(res) {
        //                     console.log('Cart loaded.');
        //                     console.log(res);
        //                     vm.cartData = res.data;
        //                 }, function(err) {
        //                     console.log('Cart load failed: Server encountered error');
        //                 });
        //         }, function(err) {

        //         });



        // }

    }

    function loadItemDetails() {
        console.log('Loading item details');
        Catalog.getItems(vm.itemIds).then(function(res) {
            vm.itemData = angular.copy(res.data);
            if (vm.itemData) {
                console.log(vm.itemData);
                for (i = 0; i < vm.cartData.cartItems.length; i++) {
                    vm.cartData.cartItems[i].displayName = vm.itemData[i].prodname;
                }
            } else {
                vm.itemFound = false;
            }
        }, function(err) {
            console.log('Server error encountered.');
        })
    }

    function pageInit() {
        loadCart();
    }
}