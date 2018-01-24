angular.module('app.item')
    .controller('itemController', itemController);

itemController.$inject = ['$http', 'Catalog', '$routeParams', '$anchorScroll', 'FB', '$scope', 'authentication', '$location', 'cart', 'Inventory', '$filter', 'profile'];

function itemController($http, Catalog, $routeParams, $anchorScroll, FB, $scope, authentication, $location, cart, Inventory, $filter, profile) {
    var vm = this;

    vm.boi = "BOIII";
    vm.hideReviews = true;
    vm.showHide = 'Show'
    vm.clickedSize = '';
    vm.sizeCode = '';
    vm.loaded = false;
    vm.itemFound = true;
    vm.fbid = $location.search().fbid;
    vm.userid = '';
    vm.useractive = false;
    vm.username = '';
    vm.reviewletters = 160;
    vm.authenticated = false;
    vm.newreview = {};
    vm.modreview = {};
    vm.reviewcredentials = {};
    vm.reviewtoadd = '';
    vm.starstatus = ['', '', '', '', ''];
    vm.ratevalue = null;
    vm.newRating = {};
    vm.cartItem = {};
    vm.inventoryData = [];
    vm.itemSizeData = [];
    vm.loadProgress = 0;
    //Functions
    vm.pageInit = pageInit;
    vm.setRate = setRate;
    vm.loaditem = loadItem;
    vm.reloadItem - reloadItem;
    vm.clickEdit = clickEdit;
    vm.clickReview = clickReview;
    vm.deleteReview = deleteReview;
    vm.editReview = editReview;
    vm.countletters2 = countletters2;
    vm.toggleReview = toggleReview;
    vm.submitReview = submitReview;
    vm.countletters = countletters;
    vm.sizeClass = sizeClass;
    vm.sizeClick = sizeClick;
    vm.viewUp = viewUp;
    vm.submitRating = submitRating;
    vm.addToCart = addToCart;
    vm.qtyToAdd = 1;

    loadInventory()
    pageInit();


    function initDummyInventory() {
        vm.inventoryData = Inventory.getAll();
        vm.loadProgress++;
        vm.inventoryData = $filter('filter')(vm.inventoryData, { prodCode: $routeParams.id });
        console.log(vm.inventoryData);
        loadSizes();
    }

    function loadSizes() {
        if (vm.loadProgress == 2) {
            console.log('Sizes loaded');
            vm.itemSizeData = Catalog.getSizes(vm.inventoryData);
            if (vm.itemSizeData.length > 0) {
                vm.clickedSize = angular.copy(vm.itemSizeData[0]);
                sizeClass(vm.clickedSize.size);
                sizeClick(vm.clickedSize);
            }

        }
    }

    function loadInventory() {
        initDummyInventory();
        // vm.inventoryData = Inventory.get($routeParams.id)
        //     .then(function(res) {
        //         console.log('Inventory loaded.');
        //         vm.inventoryData = res.data;
        //         console.log(vm.inventoryData);
        //         vm.loadProgress++;
        //         loadSizes();
        //     }, function(err) {
        //         console.log('Inventory loading failed: Server error encountered.');
        //     });


    }

    function addToCart() {

        vm.cartItem.prodCode = vm.itemData.prodcode + vm.sizeCode;
        vm.cartItem.itemQty = vm.qtyToAdd;
        console.log('Added ' + vm.cartItem.prodCode + ' ' + vm.cartItem.itemQty + 'pcs.');
        vm.cartItem.subtotal = vm.qtyToAdd * vm.itemData.prodprice;
        cart.add(vm.userid, vm.cartItem)
            .then(function(res) {
                console.log('Cart added.');
            }, function(err) {
                console.log('Server error encountered while adding to cart.');
            });
    }

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    function submitRating() {
        vm.newRating.rating = angular.copy(vm.ratevalue);
        vm.newRating._id = angular.copy(vm.userid);
        Catalog.updateRating(vm.itemData.prodcode, vm.newRating)
            .then(function(res) {
                reloadItem();
                loadUser();
                console.log('Rating updated');
            }, function(err) {
                console.log('Rating updated failed: Server error encountered.');
            });
    }



    function setRate(data) {
        var i;

        vm.ratevalue = data;
        vm.starstatus = ['', '', '', '', ''];

        for (i = 0; i < data; i++) {
            vm.starstatus[i] = 'selectedstar';
        }
        console.log(vm.ratevalue);
    }

    function viewUp() {
        vm.itemData.viewcount++;
        Catalog.updateItem(vm.itemData)
            .then(function(res) {
                console.log('Views incremented by 1');
            }, function(err) {
                console.log('Views not incremented. Server error encountered.');
            });
    }

    function clickEdit(data) {
        vm.modreview = data;
        vm.reviewedit = angular.copy(vm.modreview.reviewstring);
        countletters2();
    }

    function clickReview() {
        vm.reviewtoadd = '';
        countletters();
    }

    function deleteReview(prodcode, id) {
        Catalog.delReview(prodcode, id)
            .then(function(res) {
                console.log('Successfully deleted review.');
                reloadItem();
            }, function(err) {
                console.log('Server error encountered while deleting review.');
            });
    }

    function editReview() {
        vm.modreview.reviewstring = angular.copy(vm.reviewedit);
        Catalog.editReview(vm.itemData.prodcode, vm.modreview)
            .then(function(res) {
                console.log('Review successfully edited.');
            }, function(err) {
                console.log('Server error encountered while editing review.');
            });
    }

    function countletters() {
        vm.reviewletters = 160 - vm.reviewtoadd.length;
    }

    function countletters2() {
        vm.reviewletters = 160 - vm.reviewedit.length;
    }

    function submitReview() {
        if (vm.reviewtoadd) {
            vm.newreview.reviewstring = angular.copy(vm.reviewtoadd);
            vm.newreview.userid = angular.copy(vm.userid);
            vm.newreview.username = angular.copy(vm.username);
            vm.reviewcredentials.prodcode = $routeParams.id;
            vm.reviewcredentials.review = angular.copy(vm.newreview);
            Catalog.addReview(vm.reviewcredentials)
                .then(function(res) {
                    console.log('Review added');
                    reloadItem();
                }, function(err) {
                    console.log('Review upload failed.');
                });
        }

    }

    function loadUser() {
        if (vm.fbid) {
            FB.fbLoggedIn(vm.fbid)
                .then(function(res) {
                    console.log(res);
                    if (res.data['0'].loginsession) {
                        vm.userid = res.data['0']._id;
                        vm.username = res.data['0'].firstname + ' ' + res.data['0'].lastname;
                        vm.ratedetails = res.data['0'].ratedetails;
                        if (vm.ratedetails.length > 0) {
                            vm.itemPosition = arrayObjectIndexOf(vm.ratedetails, $routeParams.id, 'itemrated');
                            if (vm.itemPosition > -1) {
                                setRate(vm.ratedetails[vm.itemPosition].rating);
                                vm.hasRated = true;
                            } else {
                                vm.hasRated = false;
                            }
                        } else {
                            vm.hasRated = false;
                        }
                        vm.loggedIn = true;

                    } else {
                        vm.loggedIn = false;
                    }
                    if (res.data['0'].active) {
                        vm.useractive = true;
                    }


                }, function(err) {
                    vm.loggedIn = false;

                });


        } else {
            if (authentication.isLoggedIn()) {
                profile.getUser()
                    .then(function(res) {
                        vm.userid = res.data._id;
                        vm.username = res.data.firstname + ' ' + res.data.lastname;
                        vm.ratedetails = res.data.ratedetails;
                        if (vm.ratedetails.length > 0) {
                            vm.itemPosition = arrayObjectIndexOf(vm.ratedetails, $routeParams.id, 'itemrated');
                            if (vm.itemPosition > -1) {
                                setRate(vm.ratedetails[vm.itemPosition].rating);
                                vm.hasRated = true;
                            } else {
                                vm.hasRated = false;
                            }
                        } else {
                            vm.hasRated = false;
                        }

                        vm.loggedIn = true;
                        if (res.data.active) {
                            vm.useractive = true;
                        }

                    }, function(e) {
                        console.log(e);

                    });
            }

        }
    }

    function pageInit() {
        loadItem();
        $anchorScroll();
        loadUser();

    }

    function loadItem() {
        Catalog.getItem($routeParams.id).then(function(res) {
            vm.itemData = angular.copy(res.data);
            vm.itemSizeData = [];
            if (vm.itemData) {
                vm.itemFound = true;
                vm.loaded = true;
                vm.loadProgress++;
                viewUp();
                loadSizes();
            } else {
                vm.itemFound = false;
                vm.errMessage = 'The item you are trying to view does not exist. The link you are using might be incorrect';
            }
        }, function(err) {
            vm.itemFound = false;
            vm.errMessage = 'Server error encountered. Please try again later.';
            console.log('Server error encountered.');
        });

    }

    function reloadItem() {
        vm.loadProgress = 0;
        loadInventory();
        Catalog.getItem($routeParams.id).then(function(res) {
            vm.itemData = angular.copy(res.data);
            if (vm.itemData) {
                vm.itemFound = true;
                vm.loaded = true;
                vm.loadProgress++;
                loadSizes();
            } else {
                vm.itemFound = false;
                vm.errMessage = 'The item you are trying to view does not exist. The link you are using might be incorrect.';
            }
        }, function(err) {
            vm.itemFound = false;
            vm.errMessage = 'Server error encountered. Please try again later.';
            console.log('Server error encountered.');
        })

    }

    function toggleReview() {
        if (vm.hideReviews) {
            vm.showHide = 'Hide';
            vm.hideReviews = false;
        } else {
            vm.showHide = 'Show';
            vm.hideReviews = true;

        }
    }

    function sizeClass(data) {
        if (data == vm.clickedSize) {
            return 'clkSize';
        } else {
            return 'defSize';
        }
    }

    function sizeClick(data) {
        vm.clickedSize = data.size;
        if (vm.clickedSize < 10) {
            vm.sizeCode = '0' + vm.clickedSize;
        } else {
            vm.sizeCode = '' + vm.clickedSize;
        }

        if (vm.sizeCode.indexOf('.') > -1) {
            vm.sizeCode = vm.sizeCode.replace(/\./, '-');
        } else {
            vm.sizeCode = vm.sizeCode.concat('-0');
        }




    }


}