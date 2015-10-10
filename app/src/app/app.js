(function () {
    'use strict';
    
    angular
        .module('app', ['ui.router','ui.bootstrap']);

    angular
        .module('app')
        .run(runHandler);
		
	runHandler.$inject = ['$rootScope','$state'];
    function runHandler($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;
            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
                $state.go('login');
            }
        });
    }

    angular
        .module('app')
        .run(init);

    init.$inject = ['$rootScope'];
    function init($rootScope) {
        $rootScope.myConfig = {
            webUrl: 'http://coolworld2015a1.herokuapp.com/' //TODO change URL
            //webUrl: 'http://localhost:3000/'
        };
    }

    function Sequential($provide, $state) {
        $provide
            .decorator("$q", function ($delegate) {
                var isPromiseLike = function (obj) {
                    return obj && angular.isFunction(obj.then);
                };

                function serial(tasks) {
                    var prevPromise;
                    var error = new Error();
                    angular.forEach(tasks, function (task, key) {
                        var success = task.success || task;
                        var fail = task.fail;
                        var notify = task.notify;
                        var nextPromise;

                        if (!prevPromise) {
                            nextPromise = success();
                            if (!isPromiseLike(nextPromise)) {
                                error.message = "Task " + key + " did not return a promise.";
                                throw error;
                            }
                        } else {
                            nextPromise = prevPromise.then(
                                function (data) {
                                    if (!success) {
                                        return data;
                                    }
                                    var ret = success(data);
                                    if (!isPromiseLike(ret)) {
                                        error.message = "Task " + key + " did not return a promise.";
                                        throw error;
                                    }
                                    return ret;
                                },
                                function (reason) {
                                    if (!fail) {
                                        return $delegate.reject(reason);
                                    }
                                    var ret = fail(reason);
                                    if (!isPromiseLike(ret)) {
                                        error.message = "Fail for task " + key + " did not return a promise.";
                                        throw error;
                                    }
                                    return ret;
                                },
                                notify);
                        }
                        prevPromise = nextPromise;
                    });

                    return prevPromise || $delegate.when();
                }

                $delegate.serial = serial;
                return $delegate;
            });
    }
	
})();