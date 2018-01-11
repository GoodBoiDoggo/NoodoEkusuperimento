angular.module('app.cart')
    .controller('cartController', cartController);

cartController.$inject = ['$location', 'cart'];

function cartController($location, cart) {
    var vm = this;
    vm.loggedIn = false;
    vm.loaded = false;
    vm.fbid = $location.search().fbid;
    vm.userData = {};


    pageInit();
    loadCart();


    function loadCart() {
        cart.get()
            .then(function(res) {
                console.log('Cart loaded.');
                vm.cartData = res;
            }, function(err) {
                console.log('Cart load failed: Server encountered error');
            });
    }

    function pageInit() {
        vm.cartData = [{
                "id": "TEST",
                "customerId": "C0002",
                "cartItems": [{
                    "prodCode": "I0000207-5",
                    "itemQty": 1
                }],
                "status": "OP"
            },
            {
                "id": "5a5357b7fee653169409b6a3",
                "customerId": "C0003",
                "cartItems": [{
                    "prodCode": "I0000407-5",
                    "itemQty": 1
                }],
                "status": "OP"
            },
            {
                "id": "5a53501afee653169409b68e",
                "customerId": "C0001",
                "cartItems": [{ "prodCode": "I0000506-0", "itemQty": 1 },
                    { "prodCode": "I0000206-5", "itemQty": 2 }
                ],
                "status": "OP"
            }
        ];
    }
}