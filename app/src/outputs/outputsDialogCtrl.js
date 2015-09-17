(function () {
    'use strict';

    angular
        .module('app')
        .controller('OutputsDialogCtrl', OutputsDialogCtrl);

    OutputsDialogCtrl.$inject = ['$state', '$rootScope', 'OutputsService', '$stateParams'];

    function OutputsDialogCtrl($state, $rootScope, OutputsService, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            outputsDelete: outputsDelete,
            outputsEditBack: outputsEditBack
        });

        angular.extend(vm, $stateParams.item);

        function outputsDelete() {
            $rootScope.loading = true;
            $rootScope.myError = false;

            OutputsService.deleteItem(vm.id)
                .then(function () {
                    $rootScope.myError = false;
                    $state.go('main.outputs');
                })
                .catch(function (data) {
                    $rootScope.loading = false;
                    $rootScope.myError = true;
                });
        }

        function outputsEditBack() {
            $state.go('main.outputs');
        }
    }
})();