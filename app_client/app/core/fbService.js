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
    return {
        // call to get all catalog items
        isLoggedIn: isLoggedIn,
        login: login,
        fbLoggedIn: fbLoggedIn,
        register: registerfb,
        getFbProfile: getProfile
    }

    function login(fbid) {

        $http.get('/fbloggedin/' + fbid)
            .then(function(res) {

                if (res.data[0].loginsession) {
                    vm.user = {
                        exists: 'true',
                        loggedIn: 'true'
                    }
                } else {
                    vm.user = {
                        exists: 'true',
                        loggedIn: 'false'
                    }
                }
                vm.deferred.resolve(vm.user);

            }, function(err) {
                console.log(err);
                vm.user = {
                    exists: 'false',
                    loggedIn: 'false'
                }
                vm.deferred.reject(vm.user);

            });
        return vm.deferred.promise;
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

        return $http.post('/registerfb', user)
            .then(function(res) {
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