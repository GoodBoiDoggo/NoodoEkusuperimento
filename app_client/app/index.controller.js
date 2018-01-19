angular.module('app')
    .controller('indexController', index);

index.$inject = ['$location'];

function index($location) {
    vm = this;
    vm.showWVButtons = false;
    vm.fbid = $location.search().fbid;
    vm.loggedIn = false;
    vm.initNav = initNav;
    vm.whitespace = whitespace;
    initNav();

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