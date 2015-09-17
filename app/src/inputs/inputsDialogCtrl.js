(function () {
    'use strict';

    angular
        .module('app')
        .controller('InputsDialogCtrl', InputsDialogCtrl);

    InputsDialogCtrl.$inject = ['$state', '$rootScope', 'InputsService', '$stateParams'];

    function InputsDialogCtrl($state, $rootScope, InputsService, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            inputsDelete: inputsDelete,
            inputsEditBack: inputsEditBack
        });

        angular.extend(vm, $stateParams.item);

        function inputsDelete() {
            $rootScope.loading = true;
            $rootScope.myError = false;

            InputsService.deleteItem(vm.id)
                .then(function () {
                    $rootScope.myError = false;
                    $state.go('main.inputs');
                })
                .catch(function (data) {
                    $rootScope.loading = false;
                    $rootScope.myError = true;
                });
        }

        function inputsEditBack() {
            $state.go('main.inputs');
        }
    }
})();