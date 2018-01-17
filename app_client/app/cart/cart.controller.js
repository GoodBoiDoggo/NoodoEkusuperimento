angular.module('app.cart')
    .controller('cartController', cartController);

cartController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog'];

function cartController($location, $anchorScroll, cart, authentication, Catalog) {
    var vm = this;
    vm.itemIds = '';
    vm.loggedIn = false;
    vm.loaded = false;
    vm.fbid = $location.search().fbid;
    vm.userData = {};
    vm.cartData = {};
    vm.message = '';
    pageInit();

    function loadCart() {
        //1531998
        // vm.cartData.totalPrice = 1531998;
        // vm.cartData.cartItems = [{
        //         prodCode: "I0000108-0",
        //         itemQty: 5,
        //         subtotal: 20000
        //     },
        //     {
        //         prodCode: "I0000206-0",
        //         itemQty: 2,
        //         subtotal: 11998
        //     },
        //     {
        //         prodCode: "I0000510-0",
        //         itemQty: 3,
        //         subtotal: 1500000
        //     }

        // ];



        if (vm.fbid) {
            cart.get()
                .then(function(res) {
                    console.log('Cart loaded.');
                    vm.cartData = res.data;
                }, function(err) {
                    console.log('Cart load failed: Server encountered error');
                });
        } else {
            authentication.currentUser()
                .then(function(res) {
                    console.log(res.data);
                    vm.userData = res.data;
                    cart.get(vm.userData._id)
                        .then(function(res) {
                            console.log('Cart loaded.');

                            vm.cartData = res.data;
                            if (vm.cartData.cartItems.length > 0) {
                                //parse product codes
                                for (i = 0; i < vm.cartData.cartItems.length; i++) {
                                    vm.itemIds = vm.itemIds.concat(vm.cartData.cartItems[i].prodCode.substring(0, 6));
                                    vm.cartData.cartItems[i].displaySize = parseFloat(vm.cartData.cartItems[i].prodCode.substring(6).replace('-', '.'));
                                    vm.cartData.cartItems[i].displayName = 'Loading...';
                                    if (i != vm.cartData.cartItems.length - 1) {
                                        vm.itemIds = vm.itemIds.concat('-');
                                    }
                                }
                                loadItemDetails();
                            } else {
                                vm.message = 'Your cart is empty';
                            }
                        }, function(err) {
                            console.log('Cart load failed: Server encountered error');
                        });
                }, function(err) {

                });



        }

    }

    function loadItemDetails() {
        console.log('Loading item details');
        Catalog.getItems(vm.itemIds).then(function(res) {
            vm.itemData = angular.copy(res.data);
            if (vm.itemData) {
                console.log(vm.itemData);
                for (i = 0; i < vm.cartData.cartItems.length; i++) {
                    for (ii = 0; ii < vm.itemData.length; ii++) {
                        if (vm.cartData.cartItems[i].displayName == 'Loading...') {
                            if (vm.cartData.cartItems[i].prodCode.substring(0, 6) == vm.itemData[ii].prodcode) {
                                vm.cartData.cartItems[i].displayName = vm.itemData[ii].prodname;
                                vm.cartData.cartItems[i].cartImage = vm.itemData[ii].imgname;
                                break;
                            }
                        }
                    }
                }
            } else {
                vm.itemFound = false;
            }
        }, function(err) {
            console.log('Server error encountered.');
        })
    }

    function pageInit() {
        $anchorScroll();
        loadCart();
    }
}