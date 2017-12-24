angular.module('app.register')
    .controller('registerController', register);

register.$inject = ['$location', 'authentication', '$scope', 'FB'];

function register($location, authentication, $scope, FB) {
    var vm = this;
    vm.showError = false;
    vm.errorMsg = "";
    vm.credentials = {
        name: "",
        email: "",
        password: ""
    };
    vm.fbid = $location.search().fbid;
    vm.onSubmit = onSubmit;
    vm.checkFields = checkFields;

    function checkFields() {
        if (/^[A-Za-z]+([\s\.-]?[A-Za-z]+)*$/.test(vm.credentials.firstname)) {
            vm.passed = true;
        } else {

            console.log('did not pass first name');
            return false;
        }

        if (/^[A-Za-z]+([\s\.-]?[A-Za-z]+)*$/.test(vm.credentials.lastname)) {
            vm.passed = true;
        } else {

            console.log('did not pass last name');
            return false;
        }

        if (/^\w+([#!'\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(vm.credentials.email)) {
            vm.passed = true;
        } else {

            console.log('did not pass email');
            return false;
        }

        return vm.passed;
    }

    function onSubmit() {
        console.log('Submitting registration');

        if (checkFields()) {
            if (vm.fbid) {
                //fb code
                vm.credentials.fbid = angular.copy(vm.fbid);
                FB
                    .registerfb(vm.credentials)
                    .then(function(res) {
                        console.log("fb register request ended");
                        console.log(res.data.success);
                        $scope.$emit('FBAUTH');
                        $location.path('/profile');
                    }, function(err) {
                        vm.errorMsg = err.data.error;
                        vm.showError = true;
                    });
                console.log('fb register process');
            } else {
                authentication
                    .register(vm.credentials)
                    .then(function(res) {
                        console.log("local registration");
                        console.log(res);
                        if (res) {
                            vm.errorMsg = res;
                            vm.showError = true;
                        } else {
                            $scope.$emit('AUTHENTICATE');
                            $location.path('/profile');
                        }

                    }, function(err) {
                        vm.errorMsg = err;
                        vm.showError = true;
                    });
            }
        }



    };

}