console.log('INVENTORY SERVICE DETECTED!');
angular.module('app.core').factory('Inventory', inventoryService);

// IP: http://184.172.241.167:32742
// PORT: 32742
// GET: List<Inventory> findAllInventory
// http://localhost:8080/stocks
// GET: List<Inventory> findByProdCode
// http://localhost:8080/stocks/{prodcode}
// POST: void addProduct
// http://localhost:8080/stocks
// PUT: void updateQuantity
// http://localhost:8080/stocks/{prodcode}
// DELETE: void deleteProduct
// http://localhost:8080/stocks/{prodcode}

function inventoryService($http) {
    return {
        // call to get all catalog items
        //http://184.172.241.167:32722
        getAll: function() {
            console.log('Retrieving inventory...');

            //return $http.get('http://184.172.241.167:32722/stocks');
        },

        get: function(prodCode) {
            console.log('Fetch inventory for item: ' + prodCode);

            //return $http.get('http://184.172.241.167:32722/stocks/' + prodcode);
        },

        add: function(item) {
            console.log('Adding review...')

            //return $http.post('http://184.172.241.167:32722/stocks, item);
        },

        delete: function(prodCode) {
            console.log('Deleting invetory item...');

            //return $http.delete('http://184.172.241.167:32722/stocks/' + prodCode);
        },
        update: function(item) {
            console.log('Updating item quantity...');

            //return $http.put('http://184.172.241.167:32722/stocks/' + item.prodcode, item);
        }
    }

}