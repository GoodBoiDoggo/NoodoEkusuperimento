console.log('USER SERVICE DETECTED!');
angular.module('app.core').factory('FB', fbService);
fbService.$inject = ['$window', '$http', '$q'];

function fbService(win, $http, $q) {
    var vm = this;
    vm.loaded = false;
    vm.loggedIn = false;
    vm.loginMode;
    vm.exists;
    vm.loggedIn;
    vm.deferred = $q.defer();
    var baseUrl = 'https://kariteun-shopping.mybluemix.net';
    return {
        // call to get all catalog items
        isLoggedIn: isLoggedIn,
        login: login,
        fbLoggedIn: fbLoggedIn,
        registerfb: registerfb,
        getFbProfile: getProfile,
        mergeregister: merge,
        fbapiLastname: fbapiLastname
    }

    function fbapiLastname() {
        return FB.api('/me', {
            fields: 'last_name'
        });
    }

    function merge(user) {

        return $http.post(baseUrl + '/mergeregister', user);
    }

    function login(user) {

        return $http.post(baseUrl + '/fblogin', user);

    }

    function getProfile(fbid) {
        return $http.get(baseUrl + '/api/fbprofile/' + fbid);
    };

    function getMode() {
        return vm.loginMode;
    }

    function isLoggedIn() { //LOGIN
        return vm.loggedIn;
    }

    function registerfb(user) {

        return $http.post(baseUrl + '/registerfb', user);


    };

    function fbLoggedIn(fbid) {

        return $http.get(baseUrl + '/fbloggedin/' + fbid);

    }

}