console.log('USER SERVICE DETECTED!');
angular.module('app.core').factory('FB', fbService);
fbService.$inject = ['$window', '$http'];

function fbService(win, $http) {
    var vm = this;
    vm.loaded = false;
    vm.loggedIn = false;
    vm.loginMode;
    vm.user;
    return {
        // call to get all catalog items
        isLoggedIn: isLoggedIn,
        login: login,
        fbLoggedIn: fbLoggedIn,
        register: registerfb,
        getFbProfile: getProfile
    }

    function login() {
        vm.loggedIn = true;
    }

    function getProfile(fbid) {
        return $http.get('/api/fbprofile/' + fbid);
    };

    function getMode() {
        return vm.loginMode;
    }

    function isLoggedIn() { //LOGIN
        return vm.loggedIn;
    }

    function registerfb(user) {

        return $http.post('/registerfb', user).then(function(res) {
            if (res.data.token === undefined) {
                return res.data.errorMsg;
            } else {
                saveToken(res.data.token);
            }
        });
    };

    function fbLoggedIn(fbid) {

        //   return $http({
        //       url: '/fbloggedin/' + fbid,
        //       method: "GET"

        //   });
        return $http.get('/fbloggedin/' + fbid);
        //   .then(function(res) {
        //     console.log('account found');
        //     console.log(res.data);
        //     return res;
        // }, function(err) {
        //     return false;
        // });

    }

}