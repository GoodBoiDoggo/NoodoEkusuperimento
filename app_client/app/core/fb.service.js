console.log('USER SERVICE DETECTED!');
angular.module('app.core').factory('FB', fbService);
fbService.$inject = ['$window', '$http', '$q'];

function fbService(win, $http, $q) {
    var vm = this;
    vm.user = {};
    vm.loaded = false;
    vm.loggedIn = false;
    vm.loginMode;
    vm.path = '';
    vm.exists;
    vm.loggedIn;
    vm.deferred = $q.defer();
    var baseUrl = '';
    return {
        // call to get all catalog items
        isLoggedIn: isLoggedIn,
        login: login,
        fbLoggedIn: fbLoggedIn,
        registerfb: registerfb,
        getFbProfile: getProfile,
        mergeregister: merge,
        isLoaded: isLoaded,
        loadFbProfile: loadFbProfile,
        setFbProfile: setFbProfile,
        logout: logout,
        setPath: setPath,
        getPath: getPath
    }

    function setPath(data) {
        vm.path = data;
    }

    function getPath() {
        return vm.path;
    }

    function loadFbProfile(fbid) {
        return $http.get(baseUrl + '/api/fbprofile/' + fbid);
    }

    function setFbProfile(data) {
        console.log('BOIIII: ');
        console.log(data);
        vm.loaded = true;
        vm.user = data;
    }

    function merge(user) {

        return $http.post(baseUrl + '/mergeregister', user);
    }

    function login(user) {

        return $http.post(baseUrl + '/fblogin', user);

    }

    function getProfile() {
        return vm.user;
    };

    function isLoggedIn() { //LOGIN
        return vm.loggedIn;
    }

    function registerfb(user) {
        return $http.post(baseUrl + '/registerfb', user);
    };

    function isLoaded() {
        return vm.loaded;
    }

    function fbLoggedIn(fbid) {

        return $http.get(baseUrl + '/fbloggedin/' + fbid);

    }

    function logout(fbid) {
        return $http.get(baseUrl + '/fblogout/' + fbid);
    }
}