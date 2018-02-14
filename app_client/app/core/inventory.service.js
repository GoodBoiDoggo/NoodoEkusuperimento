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
    var baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aededed07eef2a58ce7aa924bcaf8c04f47e57bf75360845b3145d6f902b01d0/d8133564-74ef-4ef6-a0bf-793f5b1a8043';
    //var baseUrl = 'http://184.172.241.167:32173';
    return {
        // call to get all catalog items
        //http://184.172.241.167:32173
        getAll: function() {
            console.log('Retrieving inventory...');
            // var inventoryData = [{ "_id": { "$oid": "5a61ada0ae3fe708d49a890e" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000104-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61adaaae3fe708d49a890f" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000106-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61adb2ae3fe708d49a8910" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000108-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61adb8ae3fe708d49a8911" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000109-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61ae6bae3fe708d49a8914" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000306-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61ae72ae3fe708d49a8915" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000306-5", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61ae78ae3fe708d49a8916" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000307-5", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61ae7fae3fe708d49a8917" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000308-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b445ae3fe708d49a891c" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000506-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b465ae3fe708d49a891d" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000508-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b46cae3fe708d49a891e" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000509-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b476ae3fe708d49a891f" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000510-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b47bae3fe708d49a8920" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000512-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b497ae3fe708d49a8921" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000404-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b49cae3fe708d49a8922" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000408-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4a3ae3fe708d49a8923" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000409-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4a8ae3fe708d49a8924" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000410-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4abae3fe708d49a8925" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000411-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4afae3fe708d49a8926" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000412-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4c2ae3fe708d49a8927" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000206-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4c9ae3fe708d49a8928" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000208-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4cdae3fe708d49a8929" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000209-0", "qtyAvailable": 10 }, { "_id": { "$oid": "5a61b4d1ae3fe708d49a892a" }, "_class": "com.ibm.ojt.Inventory", "prodCode": "I0000211-0", "qtyAvailable": 10 }];
            // return inventoryData;
            return $http.get(baseUrl + '/stocks'); //working
        },

        get: function(prodCode) {
            console.log('Fetch inventory for item: ' + prodCode);

            return $http.get(baseUrl + '/stocks/' + prodCode); //working
        },

        buy: function(item) {
            console.log('Consuming stock...');

            return $http.put(baseUrl + '/stocks/buy/' + item.prodCode, item);
        },

        replenish: function(item) {
            console.log('Restoring stock...');

            return $http.put(baseUrl + '/stocks/replenish/' + item.prodCode, item);
        }
    }

}