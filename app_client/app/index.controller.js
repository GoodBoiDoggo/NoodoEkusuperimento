angular.module('app')
    .controller('indexController', index);

index.$inject = ['$location', '$window', '$scope'];

function index($location, $window, $scope) {
    vm = this;
    vm.showWVButtons = false;
    vm.fbid = $location.search().fbid;
    vm.loggedIn = false;
    vm.initNav = initNav;
    vm.whitespace = whitespace;
    vm.addedToCart = false;
    vm.overlay = overlay;
    initNav();

    $scope.$on('ADDCART', function() {
        vm.addedToCart = true;
        console.log('EMIT RECEIVED');
    });

    function overlay() {
        if (vm.addedToCart)
            return 'dark-overlay-div';
    }

    function initNav() {

        if (vm.fbid) {
            vm.showWVButtons = true;
            vm.showNav = false;
            vm.fbParam = '?fbid=' + vm.fbid;

        } else {
            vm.showNav = true;


        }
    }

    function whitespace() {
        if (vm.fbid) {
            return 'whitespace-smaller'
        } else {
            return 'whitespace'
        }
    }

}