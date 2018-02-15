angular.module('app.cart')
    .controller('cartController', cartController);

cartController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile', 'Inventory'];

function cartController($location, $anchorScroll, cart, authentication, Catalog, FB, profile, Inventory) {
    var vm = this;
    vm.itemIds = '';
    vm.confirmDelete = false;
    vm.loggedIn = false;
    vm.qtyToAdd = 1;
    vm.loaded = false;
    vm.fbid = $location.search().fbid;
    if (vm.fbid) {
        vm.fbParam = '?fbid=' + vm.fbid;
    } else {
        vm.fbParam = '';
    }
    vm.loadFailCount = 0;
    vm.minQty = 0;
    vm.stock = 0;
    vm.userData = {};
    vm.cartData = {};
    vm.clickedItem = {};
    vm.stocksArray = [];
    vm.refresh = false;
    vm.loadCount = 0;
    vm.selectedAction = '0';
    vm.clickItem = clickItem;
    vm.updateCart = updateCart;
    vm.changeQty = changeQty;
    vm.clearCart = clearCart;
    vm.toCheckout = toCheckout;
    vm.stockAvailable = stockAvailable;
    vm.refreshStock = refreshStock;
    vm.refreshAllStocks = refreshAllStocks;
    vm.loadItemStocks = loadItemStocks;
    vm.getStockStatus = getStockStatus;
    pageInit();

    function refreshAllStocks() {
        vm.refresh = false;
        loadAllStocks();
        vm.message = 'Refreshing stocks...';
        $anchorScroll();

    }

    function getStockStatus(dataIn) {
        if (vm.stocksArray[dataIn] == -1) {
            return 'LOADING FAILED';
        } else if (vm.cartData.cartItems[dataIn].itemQty > vm.stocksArray[dataIn]) {
            return 'NOT ENOUGH STOCK';
        } else {
            return '';
        }
    }

    function refreshStock() {
        vm.refresh = true;

        loadItemStocks(vm.clickedItem.prodCode, vm.clickedIndex);

    }

    function stockAvailable(ind) {
        console.log('EVALUATED' + ind);
        if (vm.loadCount == vm.cartData.cartItems.length || vm.refresh) {
            if (vm.stocksArray[ind] == -1)
                return 'notloaded';
            else if (vm.cartData.cartItems[ind].itemQty > vm.stocksArray[ind]) {
                return 'notenough'
            } else return '';
        } else {
            return '';
        }

    }

    function evaluateLoad() {
        if (vm.loadFailCount > 0) {
            vm.message = 'The item(s) highlighted yellow failed to load its stocks. Please refresh.';
        }

    }

    function loadAllStocks() {
        vm.loadCount = 0;
        vm.loadFailCount = 0;
        vm.refresh = false;
        for (itemIndex = 0; itemIndex < vm.cartData.cartItems.length; itemIndex++) {
            loadItemStocks(vm.cartData.cartItems[itemIndex].prodCode, itemIndex);
        }

    }

    function loadItemStocks(data, dataIndex) {

        Inventory.get(data)
            .then(function(res) {

                vm.stocksArray[dataIndex] = res.data[0].qtyAvailable;
                // if (dataIndex == 3) { //TESTING PURPOSES
                //     vm.stocksArray[dataIndex] = -1;
                //     vm.loadFailCount++;
                // }
                if (!vm.refresh) {
                    vm.loadCount++;
                    if (vm.loadCount == vm.cartData.cartItems.length) {
                        vm.message = ''
                        vm.cartData = angular.copy(vm.cartData);
                        evaluateLoad();
                    }

                }
                if (vm.refresh) {
                    vm.cartData = angular.copy(vm.cartData);
                    clickItem(vm.clickedIndex);

                }

            }, function(err) {

                vm.stocksArray[dataIndex] = -1;
                vm.loadFailCount++;
                if (!vm.refresh) {
                    vm.loadCount++;
                    if (vm.loadCount == vm.cartData.cartItems.length) {
                        vm.message = ''
                        vm.cartData = angular.copy(vm.cartData);
                        evaluateLoad();
                    }
                }


            });
    }

    function toCheckout() {
        vm.validItems = 0;

        for (i = 0; i < vm.stocksArray.length; i++) {
            console.log(vm.cartData.cartItems[i]);
            if (vm.stocksArray[i] == -1) {
                $anchorScroll();
                vm.message = 'Some item stocks failed to load(marked yellow), please refresh the stocks.';
                break;
            } else if (vm.stocksArray[i] < vm.cartData.cartItems[i].itemQty) {
                $anchorScroll();
                vm.message = 'Some item stocks are not enough for you requested amount(marked red), please reduce the quantity or remove the item.';
                break;
            } else {
                vm.validItems++;
            }
        }
        if (vm.validItems == vm.cartData.cartItems.length)
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
            vm.confirmDelete = false;
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
        vm.clickedIndex = index;
        vm.clickedItem = vm.cartData.cartItems[index];
        vm.stock = vm.stocksArray[index];
        if (vm.stock >= 1)
            vm.minQty = 1;
        vm.selectedAction = '0';
    }

    function loadUser() {
        if (vm.fbid) {
            FB.loadFbProfile(vm.fbid)
                .then(function(res) {
                    vm.userData = res.data;
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
        vm.cartData = {};
        vm.stocksArray = [];
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
                    // vm.cartData.cartItems[0].itemQty = 100;
                    vm.message = 'Loading stocks...';
                    loadAllStocks();
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