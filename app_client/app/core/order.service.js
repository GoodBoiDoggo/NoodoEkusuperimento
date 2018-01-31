angular
    .module('app.core')
    .service('order', orderService);

orderService.$inject = ['$http'];

function orderService($http) {
    var baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aededed07eef2a58ce7aa924bcaf8c04f47e57bf75360845b3145d6f902b01d0/2bf1e727-9173-4b78-ad06-0dc8fdb500cb';
    //var baseUrl = 'http://184.172.241.167:32692';
    return {
        get: getOrder,
        create: createOrder,
        add: addToOrder,
        update: updateQuantity
    }

    function getOrder(customerId) {
        return $http.get(baseUrl + '/order/user/' + customerId);

    }

    function createOrder(order) {
        //return $http.post(baseUrl + '/order', order);
        console.log(order);
        return $http({
            method: 'POST',
            url: baseUrl + '/order',
            headers: {
                'Content-Type': 'application/json'
            },
            data: order
        });
    }

    function addToOrder(customerId, item) {

        return $http.post(baseUrl + '/order/' + customerId + '/add', item);
    }

    function updateQuantity(customerId, item) {

        return $http.put(baseUrl + '/order/' + customerId + '/update', item);
    }

    function deleteOrderItem(customerId, item) {

        return $http.delete(baseUrl + '/order/' + customerId + '/delete/' + item.prodCode);
    }

    function clearOrder(customerId) {
        return $http.delete(baseUrl + '/order/' + customerId + '/delete/all');
    }

}