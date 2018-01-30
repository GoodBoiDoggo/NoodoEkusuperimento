angular.module('app.checkout')
    .controller('checkoutController', checkoutController);

checkoutController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile', 'order'];

function checkoutController($location, $anchorScroll, cart, authentication, Catalog, FB, profile, order) {
    var vm = this;
    vm.itemIds = '';
    vm.loggedIn = false;
    vm.qtyToAdd = 1;
    vm.loaded = false;

    vm.fbid = $location.search().fbid;

    vm.userData = {};
    vm.cartData = {};
    vm.clickedItem = {};
    vm.selectedAction = '0';
    vm.clickItem = clickItem;
    vm.viewItem = viewItem;
    vm.loadDDA = loadDDA;
    vm.submitOrder = submitOrder;
    pageInit();

    function submitOrder() {

        vm.order.orderItems = angular.copy(vm.order.cartItems);
        delete vm.order.cartItems;
        delete vm.order.id;
        delete vm.order.status;
        delete vm.order.class;
        //console.log(vm.order);
        vm.order.address = vm.orderAddress + ',' + vm.orderPostal;
        order.create(vm.order)
            .then(function(res) {
                console.log(vm.order);
                console.log('Order successful');
                cart.clear(vm.userData._id)
                    .then(function(res) {
                        $location.path('/order')

                    }, function(err) {
                        vm.message = 'Cart not cleared. Server error encountered.';
                    });
            }, function(err) {
                console.log('Order failed. Server error encountered.');
            });
    }

    function loadDDA() {
        vm.orderAddress = angular.copy(vm.userData.address);
        vm.orderPostal = angular.copy(vm.userData.postalcode);
    }

    function viewItem() {

        $location.path('/catalog/' + vm.clickedItem.prodCode.substring(0, 6));
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

        cart.get(vm.userData._id)
            .then(function(res) {
                console.log('Cart loaded.');
                vm.order = angular.copy(res.data);
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