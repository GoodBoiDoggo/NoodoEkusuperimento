console.log('CATALOG SERVICE DETECTED!');
angular.module('app.core').factory('Catalog', catalogService);

function catalogService($http) {
    return {
        // call to get all catalog items
        //http://184.172.241.167:32722
        get: function() {
            console.log('Retrieving catalog...');
            return $http.get('/catalog/all');
            //return $http.get('http://184.172.241.167:32722/catalog/all');
        },

        getItem: function(prodcode) {
            console.log("Fetch item: " + prodcode);
            return $http.get('/item/' + prodcode);
            //return $http.get('http://184.172.241.167:32722/item/' + prodcode);
        },

        addReview: function(review) {
            console.log('Adding review...')
            return $http.post('/api/review', review);
            //return $http.post('http://184.172.241.167:32722/api/review', review);
        },

        delReview: function(prodcode, id) {
            console.log('Deleting review...');
            return $http.delete('/api/review/' + prodcode + '/' + id);
            //return $http.delete('http://184.172.241.167:32722/item/' + prodcode + '/review/' + id);
        },
        editReview: function(prodcode, review) {
            console.log('Editing review...');
            return $http.put('/api/review/' + prodcode, review);
            //return $http.put('http://184.172.241.167:32722/item/' + prodcode + '/review', review);
        },
        updateItem: function(item) {
            console.log('Updating item details...');
            return $http.put('/item/' + item.prodcode, item);
            //return $http.put('http://184.172.241.167:32722/item/' + item.prodcode, item);
        },
        updateRating: function(prodcode, rating) {
            console.log('Submitting rating...');
            return $http.post('/item/rate/' + prodcode, rating);
        },
        getItems: function(items) {
            console.log('Fetching cart item details...');
            return $http.get('/items/' + items);
        }
    }

}