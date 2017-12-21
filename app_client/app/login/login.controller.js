angular.module('app.login')
    .controller('loginController', login);

login.$inject = ['$location', 'authentication', '$scope', 'FB'];

function login($location, authentication, $scope, FB) {
    var vm = this;
    vm.showError = false;
    vm.credentials = {
        email: "",
        password: ""
    };
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
            console.log('Fb login process');
        } else {
            authentication
                .login(vm.credentials)
                .then(function() {
                    $scope.$emit('AUTHENTICATE');
                    $location.path('/profile');

                }, function(err) {
                    vm.showError = true;
                });
        }

    };

}