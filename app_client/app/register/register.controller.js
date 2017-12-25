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
    vm.progressValue = 0;
    vm.fbid = $location.search().fbid;
    vm.onSubmit = onSubmit;
    vm.checkFields = checkFields;
    vm.updateProgress = updateProgress;
    vm.passed = {};

    function updateProgress() {
        vm.passwordMatch = false;
        //if (vm.credentials.password.length <= vm.confirmpassword.length) {
        if (new RegExp(vm.credentials.password).exec(vm.confirmpassword)) {
            vm.regex = new RegExp(vm.credentials.password);
            vm.progressValue = parseFloat(vm.regex.exec(vm.confirmpassword)[0].length / vm.regex.exec(vm.confirmpassword).input.length) * 100;
            vm.regex = null;

            //} else if (vm.credentials.password.length > vm.confirmpassword.length) {
        } else if (new RegExp(vm.confirmpassword).exec(vm.credentials.password)) {
            vm.regex = new RegExp(vm.confirmpassword);
            vm.progressValue = parseFloat(vm.regex.exec(vm.credentials.password)[0].length / vm.regex.exec(vm.credentials.password).input.length) * 100;
            vm.regex = null;
        } else {
            vm.progressValue = 0;
        }
        if (vm.progressValue === 100) {
            vm.passwordMatch = true;
        }
    }

    function checkFields() {
        if (/^[A-Za-z]+(['\.-]?[\s]?[A-Za-z]+)*$/.test(vm.credentials.firstname)) {
            vm.passed.firstname = true;
        } else {

            console.log('did not pass first name');
            return false;
        }

        if (/^[A-Za-z]+(['\.-]?[\s]?[A-Za-z]+)*$/.test(vm.credentials.lastname)) {
            vm.passed.lastname = true;
        } else {

            console.log('did not pass last name');
            return false;
        }

        if (/^\w+([#!'\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(vm.credentials.email)) {
            vm.passed.email = true;
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
                        $scope.$emit('FBAUTH', 'Register completion');
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