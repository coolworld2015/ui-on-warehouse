(function () {
	'use strict';
	
    angular
        .module('app')
        .factory('ClientsService', ClientsService);
		
    ClientsService.$inject = ['$rootScope', '$http', '$q'];
	
    function ClientsService($rootScope, $http, $q) {
        var webUrl = $rootScope.myConfig.webUrl;
		
        return {
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
			findClient: findClient
        };
		
        function addItem(item) {
            var url = webUrl + 'api/clients/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/clients/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/clients/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }

		function findClient(id) {
            var url = webUrl + 'api/clients/find';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }
		
    }
})();
