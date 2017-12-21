angular.module('app.item')
    .controller('itemController', itemController);

itemController.$inject = ['$http', 'Catalog', '$routeParams', '$anchorScroll', 'FB', '$scope', 'authentication', '$location'];

function itemController($http, Catalog, $routeParams, $anchorScroll, FB, $scope, authentication, $location) {
    var vm = this;

    vm.boi = "BOIII";
    vm.hideReviews = true;
    vm.showHide = 'Show'
    vm.clickedSize;
    vm.loaded = false;
    vm.itemFound = true;
    vm.fbid = $location.search().fbid;
    //Functions
    vm.pageInit = pageInit;
    vm.loaditem = loadItem;
    vm.toggleReview = toggleReview;
    vm.sizeClass = sizeClass;
    vm.sizeClick = sizeClick;
    pageInit();

    function pageInit() {
        loadItem();
        $anchorScroll();
        if (vm.fbid) {

        } else {
            vm.loggedIn = authentication.isLoggedIn();
        }
    }

    function loadItem() {
        Catalog.getItem($routeParams.id).then(function(res) {
            vm.itemData = angular.copy(res.data[0]);
            if (vm.itemData) {
                vm.itemFound = true;
                vm.loaded = true;
                vm.clickedSize = angular.copy(vm.itemData.prodsizes[0]);
            } else {
                vm.itemFound = false;
            }
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
        vm.clickedSize = data;
    }


}