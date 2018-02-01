angular.module('app.order')
    .controller('orderController', orderController);

orderController.$inject = ['$location', '$anchorScroll', 'cart', 'authentication', 'Catalog', 'FB', 'profile', 'order'];

function orderController($location, $anchorScroll, cart, authentication, Catalog, FB, profile, order) {
    var vm = this;

    vm.orderStatus = orderStatus;
    vm.cancelOrder = cancelOrder;
    pageInit();

    function cancelOrder(orderId) {
        order.cancel(orderId)
            .then(function(res) {
                pageInit();
                console.log('Cancel success');
            }, function(err) {
                console.log('Cancel failed');
            });
    }

    function orderStatus(status) {
        if (status == 'CL') return 'Order issued';
        else if (status == 'CA') return 'Order cancelled';
    }

    function pageInit() {
        vm.userData = {};
        vm.orderData = {};
        loadUser();
    }

    function loadUser() {
        if (vm.fbid) {
            FB.getFbProfile(vm.fbid)
                .then(function(res) {
                    vm.userData = res.data[0];
                    loadOrder();
                }, function(err) {
                    console.log('Cart load failed: User data not available.');

                });

        } else {
            if (profile.isLoaded()) {
                vm.userData = profile.getUser();
                loadOrder();
            } else {
                profile.loadUser()
                    .then(function(res) {
                        console.log(res.data);
                        vm.userData = res.data;
                        profile.setUser(vm.userData);
                        loadOrder();
                    }, function(err) {
                        vm.message = 'Cart load failed: Failed to get user data.';
                        console.log('Cart load failed: Failed to get user data.');
                    });
            }
        }
    }

    function loadOrder() {
        order.get(vm.userData._id)
            .then(function(res) {
                console.log('Success');
                vm.orderData = res.data;
            }, function(err) {
                console.log('Success, please');
            });
    }
}