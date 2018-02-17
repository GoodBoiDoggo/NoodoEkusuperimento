angular.module('app.item')
    .controller('itemController', itemController);

itemController.$inject = ['$http', 'Catalog', '$routeParams', '$anchorScroll', 'FB', '$scope', 'authentication', '$location', 'cart', 'Inventory', '$filter', 'profile'];

function itemController($http, Catalog, $routeParams, $anchorScroll, FB, $scope, authentication, $location, cart, Inventory, $filter, profile) {
    var vm = this;

    vm.boi = "BOIII";
    vm.hideReviews = true;
    vm.showPopup = false;
    vm.showHide = 'Show'
    vm.clickedSize = '';
    vm.userexists = true;
    vm.stock = 0;
    vm.minAdd = 0;
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
    vm.rating = {};
    vm.itemData = {};
    vm.itemSizeData = [];
    vm.loadProgress = 0;
    vm.rateave = null;
    vm.addingToCart = false;
    //Functions
    vm.pageInit = pageInit;
    vm.setRate = setRate;
    vm.loaditem = loadItem;
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
    vm.selectReview = selectReview;
    vm.submitRating = submitRating;
    vm.loaderType = loaderType;
    vm.addToCart = addToCart;
    vm.buttonType = buttonType;
    vm.displayType = displayType;
    vm.qtyToAdd = 1;



    pageInit();

    function displayType() {
        if (vm.fbid) return 'full-width';
        else return '';
    }

    function buttonType() {
        if (vm.fbid) return 'full-width';
        else return '';
    }

    function loaderType() {
        if (vm.fbid) return 'fbloader';
        else '';
    }

    function selectReview(data) {
        vm.clickedReview = data;
    }

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
                sizeClick(vm.clickedSize);
                sizeClass(vm.clickedSize);

            }

        }
    }

    function loadInventory() {
        // initDummyInventory();
        vm.inventoryData = Inventory.get($routeParams.id)
            .then(function(res) {
                console.log('Inventory loaded.');
                vm.inventoryData = res.data;
                console.log(vm.inventoryData);
                vm.loadProgress++;
                loadSizes();
            }, function(err) {
                console.log('Inventory loading failed: Server error encountered.');
            });


    }

    function addToCart() {
        vm.addingToCart = true;
        vm.cartItem.prodCode = vm.itemData.prodcode + vm.sizeCode;
        vm.cartItem.itemQty = vm.qtyToAdd;
        console.log('Added ' + vm.cartItem.prodCode + ' ' + vm.cartItem.itemQty + 'pcs.');
        vm.cartItem.subtotal = vm.qtyToAdd * vm.itemData.prodprice;
        cart.add(vm.userid, vm.cartItem)
            .then(function(res) {
                console.log('Cart added.');
                if (vm.fbid) $scope.$emit('ADDCART');
                else vm.showPopup = true;
                vm.addingToCart = false;
            }, function(err) {
                vm.addingToCart = false;
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
        if (vm.rating == undefined || vm.rating == null || vm.rating == "" || vm.rating == 0) {
            vm.newRating.customerId = angular.copy(vm.userid);
            vm.newRating.prodcode = $routeParams.id;
            vm.newRating.rate = angular.copy(vm.ratevalue);
            Catalog.saveRating(vm.newRating)
                .then(function(res) {
                    loadItem('2');
                    loadUser('2');
                    console.log('Rating updated');
                }, function(err) {
                    console.log('Rating updated failed: Server error encountered.');
                });
        } else {
            vm.newRating = angular.copy(vm.rating);
            vm.newRating.rate = angular.copy(vm.ratevalue);
            Catalog.updateRating(vm.newRating)
                .then(function(res) {
                    loadItem('2');
                    loadUser('2');
                    console.log('Rating updated');
                }, function(err) {
                    console.log(vm.newRating)
                    console.log('Rating updated failed: Server error encountered.');
                });
        }

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

    // function viewUp() {
    //     vm.itemData.viewcount++;
    //     Catalog.updateItem(vm.itemData)
    //         .then(function(res) {
    //             console.log('Views incremented by 1');
    //         }, function(err) {
    //             console.log('Views not incremented. Server error encountered.');
    //         });
    // }

    function clickEdit(data) {
        vm.modreview = data;
        vm.reviewedit = angular.copy(vm.modreview.reviewstring);
        countletters2();
    }

    function clickReview() {
        vm.reviewtoadd = '';
        countletters();
    }

    function deleteReview() {
        Catalog.delReview(vm.itemData.prodcode, vm.clickedReview._id)
            .then(function(res) {
                console.log('Successfully deleted review.');
                loadItem('2');
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
                    loadItem('2');
                }, function(err) {
                    console.log('Review upload failed.');
                });
        }

    }

    function loadItemRating() {
        if (vm.userid) {
            Catalog.getRatingAve($routeParams.id)
                .then(function(res) {
                    console.log(res);
                    vm.rateavg = res.data;
                }, function(err) {
                    console.log('Rating average load failed. Server error encountered');
                });
            Catalog.getRatingCount($routeParams.id)
                .then(function(res) {
                    console.log(res);
                    vm.ratercount = res.data;
                }, function(err) {
                    console.log('Rating count load failed. Server error encountered');
                });
            Catalog.getRating($routeParams.id, vm.userid)
                .then(function(res) {
                    console.log(res);
                    vm.rating = res.data;
                    vm.ratevalue = vm.rating.rate;
                    setRate(vm.ratevalue);
                }, function(err) {
                    console.log('User rating load failed. Server error encountered');
                });
        }
    }

    function loadUser(mode) { //Mode 1 - Normal load; Mode 2 - Hard reload
        if (vm.fbid) {
            FB.loadFbProfile(vm.fbid)
                .then(function(res) {
                    console.log(res);
                    vm.userexists = true;
                    if (res.data.loginsession) {
                        vm.userid = res.data._id;
                        vm.username = res.data.firstname + ' ' + res.data.lastname;
                        vm.loggedIn = true;
                        loadItemRating();
                    } else {
                        vm.loggedIn = false;
                    }
                    if (res.data.active) {
                        vm.useractive = true;
                    }

                }, function(err) {
                    vm.userexists = false;
                    vm.loggedIn = false;

                });


        } else {

            if (authentication.isLoggedIn()) {
                if (profile.isLoaded() && mode === '1') {
                    vm.userid = profile.getUser()._id;
                    vm.username = profile.getUser().firstname + ' ' + profile.getUser().lastname;
                    loadItemRating();
                    vm.loggedIn = true;
                    if (profile.getUser().active) {
                        vm.useractive = true;
                    }
                } else {
                    profile.loadUser()
                        .then(function(res) {
                            profile.setUser(res.data);
                            vm.userid = res.data._id;
                            vm.username = res.data.firstname + ' ' + res.data.lastname;
                            loadItemRating();

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
    }

    function pageInit() {
        $anchorScroll();
        loadInventory();
        loadItem('1');
        loadUser('1');
    }

    function loadItem(mode) { //Mode 1 - Normal load; Mode 2 - Hard reload
        if (mode === '2') {
            vm.loadProgress = 0;
            loadInventory();
        }

        Catalog.getItem($routeParams.id).then(function(res) {
            vm.itemData = angular.copy(res.data);
            vm.itemSizeData = [];
            if (vm.itemData) {
                vm.itemFound = true;
                vm.loaded = true;
                vm.loadProgress++;
                if (mode === '1') {
                    Catalog.viewUp($routeParams.id)
                        .then(function(res) {
                            vm.itemData.viewcount++;
                        }, function(err) {

                        });
                }
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
        vm.classString = '';
        if (data.size == vm.clickedSize) {
            vm.classString += 'clkSize';
        } else {
            vm.classString += 'defSize';
        }
        if (data.stock <= 0) {
            vm.classString += ' redified'
        }
        return vm.classString;
    }

    function sizeClick(data) {
        vm.clickedSize = data.size;
        vm.minAdd = 1;
        vm.stock = data.stock;
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