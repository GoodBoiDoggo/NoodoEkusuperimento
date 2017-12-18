angular.module('app.register')
    .controller('registerController', register);

register.$inject = ['$location', 'authentication', '$scope'];

function register($location, authentication, $scope) {
    var vm = this;
    vm.showError = false;
    vm.credentials = {
        name: "",
        email: "",
        password: ""
    };
    vm.fbid = $location.search().fbid;
    vm.onSubmit = onSubmit;
    vm.checkFields = checkFields;

    function checkFields() {
        if (/^[A-Za-z]+([\s\.-]?[A-Za-z]+)*$/.test(vm.credentials.name)) {
            vm.passed = true;
        } else {
            vm.passed = false;
            console.log('did not pass name');
        }

        if (/^\w+([#!'\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(vm.credentials.email)) {
            vm.passed = true;
        } else {
            vm.passed = false;
            console.log('did not pass email');
        }

        return vm.passed;
    }

    function onSubmit() {
        console.log('Submitting registration');

        if (checkFields()) {
            if (vm.fbid) {
                //fb code
                console.log('fb register process');
            } else {
                authentication
                    .register(vm.credentials)
                    .then(function(res) {
                        console.log("whoag");
                        console.log(res);
                        if (res) {
                            vm.showError = true;
                        } else {
                            $scope.$emit('AUTHENTICATE');
                            $location.path('/profile');
                        }

                    }, function(err) {
                        vm.showError = true;
                    });
            }
        }



    };

}