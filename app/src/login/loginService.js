(function () {
	angular
    .module('app')
    .factory('LoginService', LoginService);
		
		function LoginService() {
			return {
				checkUser: checkUser
			};

			function checkUser(name, pass) {
				var users = localStorage.getItem('warehouse_users');
				
				if (users === null) {
					users = [
						{id: '1', name: '1', pass: '1', role: '1'}
					];
					localStorage.setItem('warehouse_users', JSON.stringify(users));
					users = localStorage.getItem('warehouse_users');
				}
			
				users = JSON.parse(users);
				if (users) {
					for (var i = 0; i < users.length; i++) {
						if (users[i].name === name && users[i].pass === pass) {
							return true;
						}
					}
				}
				return false;
			}
		}
})();