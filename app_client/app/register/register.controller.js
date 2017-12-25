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
    vm.validatePw = validatePw;
    vm.passed = {};

    function validatePw() {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(vm.credentials.password) && vm.credentials.password && vm.credentials.password.length >= 8 &&
            vm.credentials.password.length < 30) {
            return true;
        } else {
            return false;
        }
    }

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
        vm.pass = true;
        if (/^[A-Za-z]+(['\.-]?[\s]?[A-Za-z]+)*$/.test(vm.credentials.firstname) && vm.credentials.firstname.length < 20) {
            vm.passed.firstname = true;
        } else {

            console.log('did not pass first name');
            vm.passed.firstname = false;
            vm.pass = false;
        }

        if (/^[A-Za-z]+(['\.-]?[\s]?[A-Za-z]+)*$/.test(vm.credentials.lastname) && vm.credentials.lastname.length < 20) {
            vm.passed.lastname = true;
        } else {

            console.log('did not pass last name');
            vm.passed.lastname = false;
            vm.pass = false;
        }

        if (/^\w+([#!'\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(vm.credentials.email)) {
            vm.passed.email = true;
        } else {

            console.log('did not pass email');
            vm.passed.email = false;
            vm.pass = false;
        }

        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(vm.credentials.password) && vm.credentials.password.length >= 8 &&
            vm.credentials.password.length < 30) {
            vm.passed.password = true;
        } else {
            console.log('Password too short');
            vm.passed.password = false;
            vm.pass = false;
        }

        return vm.pass && vm.passwordMatch;


    }

    function onSubmit() {
        console.log('Submitting registration');
        vm.showError = false;
        vm.errorMsg = '';
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
        } else {
            vm.showError = true;
            if (!vm.passed.firstname || !vm.passed.lastname) {
                vm.errorMsg = vm.errorMsg + 'Invalid name. ';
            }
            if (!vm.passed.email) {
                vm.errorMsg = vm.errorMsg + 'Invalid email. ';
            }
            if (!vm.passed.password) {
                vm.errorMsg = vm.errorMsg + 'Invalid password.';
            }

        }



    };

}