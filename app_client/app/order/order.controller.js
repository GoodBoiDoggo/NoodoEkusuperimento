angular.module('app.order')
    .controller('orderController', orderController);

orderController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile', 'order', 'Inventory'];

function orderController($location, $anchorScroll, cart, authentication, Catalog, FB, profile, order, Inventory) {
    var vm = this;
    vm.clickedOrder = {};
    vm.orderStatus = orderStatus;
    vm.cancelOrder = cancelOrder;
    vm.fbid = $location.search().fbid;
    vm.cancelClicked = false;
    vm.orderClick = orderClick;
    vm.viewInCatalog = viewInCatalog;

    pageInit();

    function viewInCatalog(data) {
        $location.path('/catalog/' + data);
    }

    function orderClick(data) {
        vm.itemIds = '';
        vm.cancelClicked = false;
        vm.clickedOrder = angular.copy(data);
        for (i = 0; i < vm.clickedOrder.orderItems.length; i++) {
            vm.itemIds = vm.itemIds.concat(vm.clickedOrder.orderItems[i].prodCode.substring(0, 6));
            vm.clickedOrder.orderItems[i].displaySize = parseFloat(vm.clickedOrder.orderItems[i].prodCode.substring(6).replace('-', '.'));
            vm.clickedOrder.orderItems[i].displayName = 'Loading name...';
            if (i != vm.clickedOrder.length - 1) {
                vm.itemIds = vm.itemIds.concat('-');
            }
        }
        Catalog.getItems(vm.itemIds).then(function(res) {
            vm.itemData = angular.copy(res.data);
            if (vm.itemData) {
                console.log(vm.itemData);
                for (i = 0; i < vm.clickedOrder.orderItems.length; i++) {
                    for (ii = 0; ii < vm.itemData.length; ii++) {
                        if (vm.clickedOrder.orderItems[i].displayName == 'Loading name...') {
                            if (vm.clickedOrder.orderItems[i].prodCode.substring(0, 6) == vm.itemData[ii].prodcode) {
                                vm.clickedOrder.orderItems[i].displayName = vm.itemData[ii].prodname;
                                vm.clickedOrder.orderItems[i].displayPrice = vm.itemData[ii].prodprice;
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
        });
    }

    function cancelOrder(orderId) {

        order.cancel(orderId)
            .then(function(res) {
                loadUser();
                vm.message = 'Order ' + orderId + ' successfully cancelled.';
                console.log('Cancel success');
                restoreAllInventory();
            }, function(err) {
                vm.message = 'Order cancellation failed. Server error encountered.';
                console.log('Cancel failed');
            });
    }

    function orderStatus(status) {
        if (status == 'CL') return 'Order issued';
        else if (status == 'CA') return 'Order cancelled';
    }

    function pageInit() {
        vm.userData = {};
        vm.orderData = {};

        loadUser();
    }

    function loadUser() {
        if (vm.fbid) {
            if (FB.isLoaded()) {
                vm.userData = FB.getFbProfile();
                loadOrder();
            } else {
                FB.loadFbProfile(vm.fbid)
                    .then(function(res) {
                        vm.userData = res.data;
                        FB.setFbProfile(vm.userData);
                        loadOrder();
                    }, function(err) {
                        console.log('Cart load failed: User data not available.');

                    });
            }


        } else {
            if (profile.isLoaded()) {
                console.log('preloaded');
                vm.userData = profile.getUser();
                loadOrder();
            } else {
                profile.loadUser()
                    .then(function(res) {
                        console.log(res.data);
                        vm.userData = res.data;
                        profile.setUser(vm.userData);
                        loadOrder();
                    }, function(err) {
                        vm.message = 'Cart load failed: Failed to get user data.';
                        console.log('Cart load failed: Failed to get user data.');
                    });
            }
        }
    }

    function loadOrder() {
        order.get(vm.userData._id)
            .then(function(res) {
                console.log('Success');
                vm.orderData = res.data;
                console.log(vm.orderData);
                if (vm.orderData.length == 0) {
                    vm.message = 'You have no order history.';
                }
            }, function(err) {
                console.log('Success, please');
            });
    }

    function restoreAllInventory() {
        console.log(vm.orderData);
        for (c = 0; c < vm.clickedOrder.orderItems.length; c++) {
            restoreInventory(vm.clickedOrder.orderItems[c]);
        }
    }

    function restoreInventory(data) {
        vm.restore = {};
        vm.restore.prodCode = angular.copy(data.prodCode);
        vm.restore.qtyAvailable = angular.copy(data.itemQty);
        Inventory.replenish(vm.restore)
            .then(function(res) {
                console.log(data.prodCode + ' replenishment success (+' + data.itemQty + ')');
            }, function(err) {
                console.log(data.prodCode + ' replenishment failed (+' + data.itemQty + ')');
            });
    }
}