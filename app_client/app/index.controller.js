angular.module('app')
    .controller('indexController', index);

index.$inject = ['$location','User'];

function index($location,User) {
    vm = this;
    vm.showWVButtons = false;
    vm.fbid = $location.search().fbid;
    vm.loggedIn = false;
    vm.initNav = initNav;
    
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

}