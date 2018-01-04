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
    vm.userid;
    vm.reviewletters = 160;
    vm.authenticated = false;
    vm.reviewtoadd = '';
    //Functions
    vm.pageInit = pageInit;
    vm.loaditem = loadItem;
    vm.toggleReview = toggleReview;
    vm.submitReview = submitReview;
    vm.countletters = countletters;
    vm.sizeClass = sizeClass;
    vm.sizeClick = sizeClick;
    pageInit();

    function countletters() {
        vm.reviewletters = 160 - vm.reviewtoadd.length;
    }

    function submitReview() {
        alert('sapnu puas');
    }

    function pageInit() {
        loadItem();
        $anchorScroll();
        if (vm.fbid) {
            FB.fbLoggedIn(vm.fbid)
                .then(function(res) {
                    console.log(res);
                    if (res.data['0'].loginsession) {
                        vm.userid = res.data['0']._id;
                        vm.loggedIn = true;

                    } else {
                        vm.loggedIn = false;
                    }
                    vm.authenticated = true;
                }, function(err) {
                    vm.loggedIn = false;
                    vm.authenticated = true;
                });


        } else {
            authentication.currentUser()
                .then(function(res) {
                    vm.userid = res.data._id;
                    vm.loggedIn = true;
                }, function(e) {
                    console.log(e);

                });

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