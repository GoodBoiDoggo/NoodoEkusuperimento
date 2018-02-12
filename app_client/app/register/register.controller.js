angular.module('app.register')
    .controller('registerController', register);

register.$inject = ['$anchorScroll', '$location', 'authentication', '$scope', 'FB', '$animate', 'cart'];

function register($anchorScroll, $location, authentication, $scope, FB, $animate, cart) {
    var vm = this;

    vm.errorMsg = '';
    vm.firstname = $location.search().fname;
    vm.lastname = $location.search().lname;
    vm.credentials = { firstname: '', lastname: '', password: '' };
    vm.newCart = {};
    vm.showPass = false;
    vm.progressValue = 0;
    vm.fbid = $location.search().fbid;
    vm.onSubmit = onSubmit;
    vm.checkFields = checkFields;
    vm.updateProgress = updateProgress;
    vm.validatePw = validatePw;
    vm.passwordField = passwordField;
    vm.merge = merge;
    vm.pageInit = pageInit;
    vm.clickShowhide = clickShowhide;
    vm.clearFields = clearFields;
    vm.passed = {};
    vm.isValidatedPw = false;
    vm.showhide = 'Show';
    pageInit();

    function clearFields() {
        vm.credentials = { firstname: '', lastname: '', password: '' };
        vm.confirmpassword = '';
        updateProgress();
    }

    function clickShowhide() {
        if (vm.showPass == false) {
            vm.showhide = 'Hide';
            vm.showPass = true;
        } else {
            vm.showhide = 'Show';
            vm.showPass = false;
        }
    }

    function passwordField() {

        if (vm.showPass) {
            return 'text';
        } else {
            return 'password';
        }

    }

    function pageInit() {
        $animate.enabled(false);
        if (vm.fbid) {
            vm.registertype = '0';
        } else {
            vm.registertype = '1';
        }
    }

    function validatePw() {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(vm.credentials.password) && vm.credentials.password && vm.credentials.password.length >= 8) {
            vm.isValidatedPw = true;
        } else {
            vm.isValidatedPw = false;
        }
    }

    function updateProgress() {
        validatePw();
        vm.passwordMatch = false;
        if (vm.isValidatedPw) {
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
    }

    function checkFields() {
        vm.pass = true;
        ///^[A-Za-z\u00C0-\u017F]+(['\.-]?[\s]?[A-Za-z\u00C0-\u017F]+)*$/
        if (/^(?!.*[!@#$%^&*_+={}\[\]\:])/.test(vm.credentials.firstname) && vm.credentials.firstname.length <= 30 && vm.credentials.firstname.length != 0) {
            vm.passed.firstname = true;
        } else {

            console.log('did not pass first name');
            vm.passed.firstname = false;
            vm.pass = false;
        }

        if (/^(?!.*[!@#$%^&*_+={}\[\]\:])/.test(vm.credentials.lastname) && vm.credentials.lastname.length <= 30 && vm.credentials.lastname.length != 0) {
            vm.passed.lastname = true;
        } else {

            console.log('did not pass last name');
            vm.passed.lastname = false;
            vm.pass = false;
        }
        if (vm.registertype == '1') {


            if (/^[\w\u00C0-\u017F]+([#!'\.-]?[\w\u00C0-\u017F]+)*@[\w\u00C0-\u017F]+([\.-]?[\w\u00C0-\u017F]+)*(\.\w{2,3})+$/.test(vm.credentials.email)) {
                vm.passed.email = true;
            } else {

                console.log('did not pass email');
                vm.passed.email = false;
                vm.pass = false;
            }
        }


        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(vm.credentials.password) && vm.credentials.password.length >= 8) {
            vm.passed.password = true;
        } else {
            console.log('Password too weak.');
            vm.passed.password = false;
            vm.pass = false;
        }

        return vm.pass && vm.passwordMatch;


    }

    function merge() {

        vm.credentials.fbid = angular.copy(vm.fbid);
        console.log('Merge processing...')
        FB
            .mergeregister(vm.credentials)
            .then(function(res) {
                console.log(res.data);
                $scope.$emit('FBAUTH', 'login');
                $location.path('/profile');

            }, function(err) {
                vm.errorMsg = err.data;
                if (!err.data) {
                    vm.errorMsg = 'Server has encountered an error. Please try again.';
                }
            });



    }

    function onSubmit() {
        console.log('Submitting registration');
        if (vm.fbid) {
            vm.credentials.fbid = angular.copy(vm.fbid);
            vm.credentials.firstname = vm.firstname || '';
            vm.credentials.lastname = vm.lastname || '';
        }
        vm.errorMsg = '';
        if (checkFields()) {
            if (vm.fbid) {
                //fb code
                if (!vm.credentials.address) {
                    vm.credentials.address = '';
                }
                if (!vm.credentials.postalcode) {
                    vm.credentials.postalcode = '';
                }
                vm.credentials.fbid = angular.copy(vm.fbid);
                vm.credentials.firstname = vm.firstname;
                vm.credentials.lastname = vm.lastname;

                FB
                    .registerfb(vm.credentials)
                    .then(function(res) {
                        console.log("fb register request ended");
                        console.log(res.data.success);
                        $scope.$emit('FBAUTH', 'Register completion');
                        vm.newCart.customerId = res.data.userid;
                        vm.newCart.cartItems = [];
                        cart.create(vm.newCart)
                            .then(function(res) {
                                console.log('Cart created.');
                                $location.path('/profile');
                            }, function(err) {
                                console.log('Cart creation failed.');
                                $location.path('/profile');
                            });

                    }, function(err) {
                        //console.log(err);
                        vm.errorMsg = 'Register failed! Server error encountered. Please try again after a while.';

                    });
                console.log('fb register process');
            } else {
                if (!vm.credentials.address) {
                    vm.credentials.address = '';
                }
                if (!vm.credentials.postalcode) {
                    vm.credentials.postalcode = '';
                }
                authentication
                    .register(vm.credentials)
                    .then(function(res) {
                        console.log("local registration");

                        if (res.status == 'success') {
                            vm.newCart.customerId = res.userid;
                            vm.newCart.cartItems = [];
                            cart.create(vm.newCart)
                                .then(function(res) {
                                    console.log('Cart created.');
                                    $scope.$emit('AUTHENTICATE', 'login');
                                    $location.path('/profile');

                                }, function(err) {
                                    console.log('Cart creation failed.');
                                    $location.path('/profile');
                                });
                        } else {
                            vm.errorMsg = res;
                        }

                    }, function(err) {
                        console.log(err);
                        vm.errorMsg = err.msg;

                    });
            }
        } else {

            if (!vm.passed.firstname || !vm.passed.lastname) {
                vm.errorMsg = vm.errorMsg + 'Invalid/Incomplete name.';
            }
            if (!vm.passed.email && !vm.fbid) {
                vm.errorMsg = vm.errorMsg + 'Invalid email. ';
            }
            if (!vm.passed.password) {
                vm.errorMsg = vm.errorMsg + 'Invalid password.';
            } else if (!vm.passwordMatch) {
                vm.errorMsg = vm.errorMsg + 'Passwords do not match.';
            }

        }
        $anchorScroll();



    };

}