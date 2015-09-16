(function () {
    angular
        .module('app')
        .factory('UsersService', UsersService);
		
	UsersService.$inject = ['$rootScope', '$http', '$q'];
	
    function UsersService($rootScope, $http, $q) {
		var webUrl = $rootScope.myConfig.webUrl;
		
        return {
			getUsers: getUsers,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem
        };
		
        function getUsers() {
            var url = webUrl + 'api/users/get';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort();
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }
		
         function addItem(item) {
            var url = webUrl + 'api/users/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/users/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/users/delete';
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