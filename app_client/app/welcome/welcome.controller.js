angular.module('app.welcome')
    .controller('welcomeController', welcomeController);

welcomeController.$inject = ['$scope', 'FB'];

function welcomeController($scope, FB) {
    var vm = this;
    vm.sum = 2;
    vm.clicked = false;
    // Implementation
    vm.todos = [
        { name: 'Master HTML/CSS/Javascript', completed: true },
        { name: 'Learn AngularJS', completed: false },
        { name: 'Build NodeJS backend', completed: false },
        { name: 'Get started with ExpressJS', completed: false },
        { name: 'Setup MongoDB database', completed: false },
        { name: 'Be awesome!', completed: false },
    ];
    vm.boi = "BOI";
    vm.gal = "GAL";

    vm.longlib = longlib;
    vm.triggered = triggered;
    vm.classFunc = classFunc;
    vm.setty = setty;
    vm.getty = getty;
    vm.clicky = clicky;
    vm.chosenOne = '0';

    function setty() {
        User.setUser("NIPPON STEEL");
        $scope.$emit('AUTHENTICATE', User.getUser());
    }

    function getty() {
        User.logout();
        $scope.$emit('AUTHENTICATE', User.getUser());
    }

    function longlib(data1, data2) {
        vm.sum = (Number(data1) + Number(data2) || 0);
        console.log("BOI");
    }



    function triggered() {
        if (vm.clicked) {
            vm.clicked = false;
        } else {
            vm.clicked = true;
        }
    }

    function classFunc(num) {
        if (num == vm.chosenOne) {
            return 'boiOne';
        } else {
            return 'boiNo';
        }
    }

    function clicky(num) {
        vm.chosenOne = num;
    }

}