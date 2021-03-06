angular.module('app.login')
    .controller('loginController', login);

login.$inject = ['$location', 'authentication', '$scope', 'FB'];

function login($location, authentication, $scope, FB) {
    var vm = this;
    vm.error = '';
    vm.credentials = {};
    vm.fbid = $location.search().fbid;
    vm.pageInit = pageInit;
    vm.onSubmit = onSubmit;
    vm.loginLoading = false;
    pageInit();

    function pageInit() {
        if (vm.fbid) {
            vm.fromBrowser = false;
        } else {
            vm.fromBrowser = true;
        }
    }

    function onSubmit() {
        vm.error = '';
        vm.loginLoading = true;
        if (vm.fbid) {
            //fbcode
            vm.credentials.fbid = angular.copy(vm.fbid);
            console.log('Fb login process');
            FB.login(vm.credentials)
                .then(function(res) {
                    $scope.$emit('FBAUTH', 'login');
                    if (FB.getPath() == '')
                        $location.path('/profile');

                    else {
                        $location.path(FB.getPath());
                    }

                }, function(err) {
                    vm.error = err.data;
                    vm.loginLoading = false;
                });
        } else {
            console.log('Log in processing...')
            authentication
                .login(vm.credentials)
                .then(function(res) {
                    $scope.$emit('AUTHENTICATE', 'login');
                    $location.path('/profile');

                }, function(err) {
                    vm.loginLoading = false;
                    vm.error = 'Invalid email/password';
                });
        }

    };

}