angular.module('app')
    .controller('indexController', index);

index.$inject = ['$location'];

function index($location) {
    vm = this;
    vm.fbid = $location.search().fbid;
    vm.initNav = initNav;


    initNav();

    function initNav() {

        if (vm.fbid) {
            vm.showNav = false;
        } else {
            vm.showNav = true;
        }
    }

}