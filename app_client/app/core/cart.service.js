angular
    .module('app.core')
    .service('cart', cartService);

cartService.$inject = ['$http'];

function cartService($http) {
    var baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aededed07eef2a58ce7aa924bcaf8c04f47e57bf75360845b3145d6f902b01d0/e21a0bb1-5f8a-4886-ac81-fa58ed400f2f';
    //var baseUrl = 'http://184.172.241.167:32692';
    return {
        get: getCart,
        create: createCart,
        add: addToCart,
        update: updateQuantity,
        delete: deleteCartItem,
        clear: clearCart
    }

    function getCart(customerId) {
        return $http.get(baseUrl + '/cart/' + customerId);

    }

    function createCart(cart) {
        return $http.post(baseUrl + '/cart', cart);
    }

    function addToCart(customerId, item) {

        return $http.post(baseUrl + '/cart/' + customerId + '/add', item);
    }

    function updateQuantity(customerId, item) {

        return $http.put(baseUrl + '/cart/' + customerId + '/update', item);
    }

    function deleteCartItem(customerId, item) {

        return $http.delete(baseUrl + '/cart/' + customerId + '/delete/' + item.prodCode);
    }

    function clearCart(customerId) {
        return $http.delete(baseUrl + '/cart/' + customerId + '/delete/all');
    }

}