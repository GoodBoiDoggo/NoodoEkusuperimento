angular.module('app.cart')
    .controller('cartController', cartController);

cartController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile'];

function cartController($location, $anchorScroll, cart, authentication, Catalog, FB, profile) {
    var vm = this;
    vm.itemIds = '';
    vm.loggedIn = false;
    vm.qtyToAdd = 1;
    vm.loaded = false;
    vm.fbid = $location.search().fbid;
    if (vm.fbid) {
        vm.fbParam = '?fbid=' + vm.fbid;
    } else {
        vm.fbParam = '';
    }

    vm.userData = {};
    vm.cartData = {};
    vm.clickedItem = {};
    vm.selectedAction = '0';
    vm.clickItem = clickItem;
    vm.updateCart = updateCart;
    vm.changeQty = changeQty;
    vm.clearCart = clearCart;
    vm.toCheckout = toCheckout;
    pageInit();

    function toCheckout() {
        $location.path('/checkout');
    }

    function changeQty() {
        vm.selectedAction = '1';
        vm.newQty = angular.copy(vm.clickedItem.itemQty);
    }

    function clearCart() {
        cart.clear(vm.userData._id)
            .then(function(res) {
                loadCart();
                vm.message = 'Cart cleared.';
            }, function(err) {
                vm.message = 'Cart not cleared. Server error encountered.';
            });
    }

    function updateCart(action) {
        if (action === 'QTY') {
            vm.clickedItem.itemQty = angular.copy(vm.newQty);
            vm.clickedItem.subtotal = vm.clickedItem.itemQty * vm.clickedItem.displayPrice;
            cart.update(vm.userData._id, vm.clickedItem)
                .then(function(res) {
                    loadCart();
                    vm.message = 'Quantity updated.';
                    console.log('Item quantity updated.');
                }, function(err) {
                    vm.message = 'Item quantity not updated. Server error encountered';
                    console.log('Item quantity update failed. Server error encountered');
                });
        } else if (action === 'DEL') {
            cart.delete(vm.userData._id, vm.clickedItem)
                .then(function(res) {
                    loadCart();
                    vm.message = 'Item deleted.';
                    console.log('Item deleted from cart.');
                }, function(err) {
                    vm.message = 'Item not deleted. Server error encountered';
                    console.log('Item delete failed. Server error encountered');
                });
        }
    }

    function clickItem(index) {
        vm.clickedItem = vm.cartData.cartItems[index];
        vm.selectedAction = '0';
    }

    function loadUser() {
        if (vm.fbid) {
            FB.getFbProfile(vm.fbid)
                .then(function(res) {
                    vm.userData = res.data[0];
                    loadCart();
                }, function(err) {
                    console.log('Cart load failed: User data not available.');

                });

        } else {
            if (profile.isLoaded()) {
                vm.userData = profile.getUser();
                loadCart();
            } else {
                profile.loadUser()
                    .then(function(res) {
                        console.log(res.data);
                        vm.userData = res.data;
                        profile.setUser(vm.userData);
                        loadCart();
                    }, function(err) {
                        vm.message = 'Cart load failed: Failed to get user data.';
                        console.log('Cart load failed: Failed to get user data.');
                    });
            }
        }
    }

    function loadCart() {
        vm.itemIds = '';
        //DUMMY DATA
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
        cart.get(vm.userData._id)
            .then(function(res) {
                console.log(res);
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
                    vm.message = '';
                } else {
                    vm.message = 'Your cart is empty';
                }
            }, function(err) {
                vm.message = 'Cart load failed: Server encountered error';
                console.log('Cart load failed: Server encountered error');
            });




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
                                vm.cartData.cartItems[i].displayPrice = vm.itemData[ii].prodprice;
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
        vm.message = 'Loading cart...';
        loadUser();

    }
}