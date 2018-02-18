angular.module('app.checkout')
    .controller('checkoutController', checkoutController);

checkoutController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile', 'order', 'Inventory'];

function checkoutController($location, $anchorScroll, cart, authentication, Catalog, FB, profile, order, Inventory) {
    var vm = this;
    vm.itemIds = '';
    vm.loggedIn = false;
    vm.qtyToAdd = 1;
    vm.loaded = false;
    vm.loadCount = 0;
    vm.loadFailCount = 0;
    vm.invalidQtyCount = 0;
    vm.fbid = $location.search().fbid;
    vm.stocksArray = [];
    vm.userData = {};
    vm.cartData = {};
    vm.clickedItem = {};
    vm.submittingOrder = false;
    vm.selectedAction = '0';
    vm.clickItem = clickItem;
    vm.viewItem = viewItem;
    vm.loadDDA = loadDDA;
    vm.submitOrder = submitOrder;
    vm.saveAddress = saveAddress;
    vm.stockAvailable = stockAvailable;
    vm.checkAllStocks = checkAllStocks;
    vm.refreshAllStocks = refreshAllStocks;
    vm.submit = false;
    vm.order = {};
    pageInit();

    function checkAllStocks() {
        vm.submittingOrder = true;
        vm.submit = true;
        vm.message = 'Checking stocks...';
        loadAllStocks();
        $anchorScroll();
        vm.cartData = angular.copy(vm.cartData);
    }

    function refreshAllStocks() {
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
        if (vm.loadCount == vm.cartData.cartItems.length || vm.refresh) {
            if (vm.stocksArray[ind] == -1)
                return 'notloaded2';
            else if (vm.cartData.cartItems[ind].itemQty > vm.stocksArray[ind]) {
                return 'notenough2'
            } else return '';
        } else {
            return '';
        }

    }

    function evaluateLoad() {

        if (vm.loadFailCount > 0) {
            if (vm.submit) {
                vm.message = 'Item stock validation failed for the yellow highlighted items. Please try again.';
            } else
                vm.message = 'The item(s) highlighted yellow failed to load its stocks. Please refresh.';
            $anchorScroll();
        }
        vm.submit = false;

    }

    function loadAllStocks() {
        vm.loadCount = 0;
        vm.loadFailCount = 0;
        vm.invalidQtyCount = 0;
        for (itemIndex = 0; itemIndex < vm.cartData.cartItems.length; itemIndex++) {
            loadItemStocks(vm.cartData.cartItems[itemIndex].prodCode, itemIndex);
        }

    }

    function loadItemStocks(data, dataIndex) {

        Inventory.get(data)
            .then(function(res) {

                vm.stocksArray[dataIndex] = res.data[0].qtyAvailable;
                // if (dataIndex == 1) { //TESTING PURPOSES
                //     vm.stocksArray[dataIndex] = -1;
                //     vm.loadFailCount++;
                // }
                if (vm.stocksArray[dataIndex] < vm.cartData.cartItems[dataIndex].itemQty) {
                    vm.invalidQtyCount++;
                }

                vm.loadCount++;
                if (vm.loadCount == vm.cartData.cartItems.length) {
                    vm.cartData = angular.copy(vm.cartData);
                    if (vm.submit) {
                        vm.validItems = 0;
                        for (i = 0; i < vm.stocksArray.length; i++) {
                            if (vm.stocksArray[i] == -1) {
                                $anchorScroll();
                                vm.submittingOrder = false;
                                vm.message = 'Some item stocks failed to load(yellow highlight), please refresh the stocks.';
                                break;
                            } else if (vm.stocksArray[i] < vm.cartData.cartItems[i].itemQty) {
                                $anchorScroll();
                                vm.submittingOrder = false;
                                vm.message = 'Some item stocks are not enough for you requested amount(red highlight), please reduce the quantity or remove the item.';
                                break;
                            } else {
                                vm.validItems++;
                            }
                        }
                        if (vm.validItems == vm.cartData.cartItems.length) submitOrder();
                    }
                    vm.message = ''
                    evaluateLoad();
                }




            }, function(err) {

                vm.stocksArray[dataIndex] = -1;
                vm.loadFailCount++;

                vm.loadCount++;
                if (vm.loadCount == vm.cartData.cartItems.length) {
                    vm.cartData = angular.copy(vm.cartData);
                    if (vm.submit) {
                        vm.validItems = 0;
                        for (i = 0; i < vm.stocksArray.length; i++) {
                            if (vm.stocksArray[i] == -1) {
                                $anchorScroll();
                                vm.submittingOrder = false;
                                vm.message = 'Some item stocks failed to load(yellow highlight), please refresh the stocks.';
                                break;
                            } else if (vm.stocksArray[i] - vm.cartData.cartItems[i].itemQty < 0) {
                                $anchorScroll();
                                vm.submittingOrder = false;
                                vm.message = 'Some item stocks are not enough for your requested amount(red highlight), please reduce the quantity or remove the item.';
                                break;
                            } else {
                                vm.validItems++;
                            }

                        }

                    }

                    vm.message = ''
                    evaluateLoad();
                }


            });
    }

    function saveAddress() {
        vm.userData.address = vm.orderAddress;
        vm.userData.postalcode = vm.orderPostal;
        profile.updateDDA(vm.userData)
            .then(function(res) {
                vm.message = res.data;
                if (vm.fbid) {
                    FB.loadFbProfile(vm.fbid)
                        .then(function(res) {
                            vm.userData = res.data;
                            FB.setFbProfile(vm.userData);
                        }, function(err) {
                            vm.message = 'DDA update failed. Server error encountered.';
                            console.log('DDA update failed. Server error encountered.');
                        });
                } else {
                    profile.loadUser(vm.fbid)
                        .then(function(res) {
                            vm.userData = res.data;
                            profile.setUser(vm.userData);
                        }, function(err) {
                            vm.message = 'DDA update failed. Server error encountered.';
                            console.log('DDA update failed. Server error encountered.');
                        });
                }
            }, function(err) {
                vm.message = 'DDA update failed. Server error encountered.';
                console.log('DDA update failed. Server error encountered.');
            });
    }

    function submitOrder() {


        // vm.order.orderItems = angular.copy(vm.order.cartItems);
        // delete vm.order.cartItems;
        // delete vm.order.id;
        // delete vm.order.status;
        // delete vm.order.class;
        //console.log(vm.order);
        //vm.order._class = 'com.ibm.ojt.OrderItem';

        vm.order.customerId = vm.userData._id;
        vm.order.address = vm.orderAddress + ',' + vm.orderPostal;
        vm.orderClone = angular.copy(vm.order);
        order.create(vm.order)
            .then(function(res) {
                vm.orderClone.orderId = res.data.orderId;
                console.log('Order successful');
                cart.clear(vm.userData._id)
                    .then(function(res) {
                        consumeAllInventory();
                        vm.submittingOrder = false;
                        if (vm.fbid) {
                            closeFunction(vm.orderClone, 'CHECKOUT');
                            console.log(JSON.stringify(vm.orderClone));
                        } else
                            $location.path('/order');
                    }, function(err) {
                        vm.submittingOrder = false;
                        vm.message = 'Cart not cleared. Server error encountered. Please clear cart manually.';
                    });
            }, function(err) {
                vm.submittingOrder = false;
                vm.message = "Order failed. Server error encountered.";
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
            FB.loadFbProfile(vm.fbid)
                .then(function(res) {
                    vm.userData = res.data;
                    loadCart();
                }, function(err) {
                    vm.message = 'Cart load failed: User data could not be fetched.';
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

                vm.cartData = res.data;
                vm.order.address = '';
                vm.order.orderItems = angular.copy(vm.cartData.cartItems);
                vm.order.totalPrice = vm.cartData.totalPrice;
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

    function consumeAllInventory() {
        for (c = 0; c < vm.cartData.cartItems.length; c++) {
            consumeInventory(vm.cartData.cartItems[c]);
        }
    }

    function consumeInventory(data) {
        vm.consume = {};
        vm.consume.prodCode = angular.copy(data.prodCode);
        vm.consume.qtyAvailable = angular.copy(data.itemQty);
        Inventory.buy(vm.consume)
            .then(function(res) {
                console.log(data.prodCode + ' consumption success (-' + data.itemQty + ')');
            }, function(err) {
                console.log(data.prodCode + ' consumption failed (-' + data.itemQty + ')');
            });
    }

}