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
    pageInit();

    function pageInit() {
        if (vm.fbid) {
            vm.fromBrowser = false;
        } else {
            vm.fromBrowser = true;
        }
    }

    function onSubmit() {
        if (vm.fbid) {
            //fbcode
            vm.credentials.fbid = angular.copy(vm.fbid);
            console.log('Fb login process');
            FB.login(vm.credentials)
                .then(function(res) {
                    vm.error = res.data;
                    $scope.$emit('FBAUTH', 'login');
                    $location.path('/profile');

                }, function(err) {
                    vm.error = err.data;
                });
        } else {
            console.log('Log in processing...')
            authentication
                .login(vm.credentials)
                .then(function(res) {
                    $scope.$emit('AUTHENTICATE', 'login');
                    $location.path('/profile');

                }, function(err) {
                    vm.error = 'Invalid email/password';
                });
        }

    };

}