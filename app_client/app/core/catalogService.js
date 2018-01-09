console.log('CATALOG SERVICE DETECTED!');
angular.module('app.core').factory('Catalog', catalogService);

function catalogService($http) {
    return {
        // call to get all catalog items
        get: function() {
            console.log('Retrieving catalog...');
            return $http.get('/catalog/all');
        },

        getItem: function(prodcode) {
            console.log("Fetch item: " + prodcode);
            return $http.get('/item/' + prodcode);
        },

        addReview: function(review) {
            console.log('Adding review...')
            return $http.post('/api/review', review);
        },

        delReview: function(prodcode, id) {
            console.log('Deleting review...');
            return $http.delete('/api/review/' + prodcode + '/' + id);
        },
        editReview: function(prodcode, review) {
            console.log('Editing review...');
            return $http.put('/api/review/' + prodcode, review);
        },
        updateItem: function(item) {
            console.log('Updating item details...');
            return $http.put('/item/' + item.prodcode, item);
        },
        updateRating: function(prodcode, rating) {
            console.log('Submitting rating...');
            return $http.post('/item/rate/' + prodcode, rating);
        }
    }

}