angular.module('app.catalog')
    .controller('catalogController', catalogController);

catalogController.$inject = ['$http', '$anchorScroll', '$location', '$filter', 'Catalog', 'FB', '$scope', 'Inventory'];

function catalogController($http, $anchorScroll, $location, $filter, Catalog, FB, $scope, Inventory) {
    var vm = this;
    vm.inventoryData = [];
    vm.loggedIn = false;
    vm.hideReviews = true;
    vm.showAdv = false;
    vm.enaDis = 'Enable';
    vm.gOptions = ['Any', 'Male', 'Female'];
    vm.sOptions = ['No. of Views', 'Price', 'Discount'];
    vm.sOrderOptions = [
        { value: true, text: 'Descending' },
        { value: false, text: 'Ascending' }
    ];
    vm.selectedSO = vm.sOrderOptions[0];
    vm.selectedG = vm.gOptions[0];
    vm.selectedS = vm.sOptions[0];
    vm.loaded = false;
    vm.itemFound = true;
    vm.fbParam = '';
    vm.fbid = $location.search().fbid;
    //Functions
    vm.pageInit = pageInit;
    vm.loaditems = loadItems;
    vm.showAdvSearch = showAdvSearch;
    vm.createFilter = createFilter;
    vm.sortMode = sortMode;
    vm.toItem = toItem;
    vm.loadProgress = 0;
    //	vm.filter = filter;
    pageInit();
    loadInventory();

    function toItem(prodcode) {
        console.log(prodcode);
        $location.path('/catalog/' + prodcode);
    }

    function checkAvailability() {
        if (vm.loadProgress == 2) {
            vm.catalogItems = Catalog.checkAvailability(vm.catalogItems, vm.inventoryData);

        }

    }

    function loadInventory() {
        // vm.inventoryData = Inventory.getAll();
        // vm.loadProgress++;

        Inventory.getAll()
            .then(function(res) {
                console.log('Inventory loaded.');
                vm.inventoryData = res.data;
                vm.loadProgress++;
                checkAvailability();
            }, function(err) {
                console.log('Failed to check inventory. Server error occured.');
            });
        // checkAvailability();
    }

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    function pageInit() {
        if (vm.fbid) {
            vm.fbParam = '?fbid=' + vm.fbid;
            console.log('PARAM: ' + vm.fbParam);
        }
        loadItems();
        createFilter();
        $anchorScroll();
    }

    function sortMode(item) {
        if (vm.selectedS == 'No. of Views') {
            return item.viewcount;
        } else if (vm.selectedS == 'Price') {
            return item.prodprice
        } else {
            return item.salerate;
        }

    }



    function createFilter() {

        if (!vm.showAdv) {
            vm.customFilter = function(obj) {
                vm.re = new RegExp(vm.searchParam, 'i');
                return !vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype) || vm.re.test(obj.prodcolor) || vm.re.test(obj.prodbrand) || vm.re.test(obj.gender);
            };
        } else {
            vm.customFilter = function(obj) {
                vm.re = new RegExp(vm.searchParam, 'i');
                vm.finalTest = (!vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype) || vm.re.test(obj.prodcolor) || vm.re.test(obj.gender));
                if (vm.brandFilter) {
                    vm.bf = new RegExp(vm.brandFilter, 'i');
                    vm.finalTest = (!vm.brandFilter || vm.bf.test(obj.prodbrand)) && vm.finalTest;
                }
                if (vm.typeFilter) {
                    vm.tf = new RegExp(vm.typeFilter, 'i');
                    vm.finalTest = (!vm.typeFilter || vm.tf.test(obj.prodtype)) && vm.finalTest;
                }
                if (vm.colorFilter) {
                    vm.cf = new RegExp(vm.colorFilter, 'i');
                    vm.finalTest = (!vm.colorFilter || vm.cf.test(obj.prodcolor)) && vm.finalTest;
                }
                if (vm.selectedG != 'Any') {

                    if (vm.selectedG == 'Female') {
                        vm.finalTest = obj.gender == 'female' && vm.finalTest;
                    } else {
                        vm.finalTest = obj.gender == 'male' && vm.finalTest;
                    }
                }
                return vm.finalTest;
            };
        }
    }

    function loadItems() {
        Catalog.get().then(function(res) {
            vm.catalogItems = angular.copy(res.data);
            if (vm.catalogItems) {
                console.log(vm.catalogItems);
                vm.itemFound = true;
                vm.loaded = true;
                vm.loadProgress++;

                checkAvailability();
            } else {
                vm.itemFound = false;
            }
        }, function(err) {
            vm.itemFound = false;
        });
    }

    function showAdvSearch() {

        if (!vm.showAdv) {
            vm.showAdv = true;
            vm.enaDis = 'Disable';
            createFilter();
        } else {
            vm.showAdv = false;
            vm.enaDis = 'Enable';
            createFilter();
        }

    }



}