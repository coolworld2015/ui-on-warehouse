(function () {
    'use strict';

    angular
        .module('app')
        .controller('InputsDialogCtrl', InputsDialogCtrl);

    InputsDialogCtrl.$inject = ['$state', '$rootScope', 'InputsService', 'invoice', 'GoodsService', '$stateParams'];

    function InputsDialogCtrl($state, $rootScope, InputsService, invoice, GoodsService, $stateParams) {
        var vm = this;

        angular.extend(vm, {
			init: init,
            inputsDelete: inputsDelete,
            inputsEditBack: inputsEditBack,
			_errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

		init();
        
		function init() {
            vm.inputInvoice = invoice;
        }
		
        function inputsDelete() {
            $rootScope.loading = true;
            $rootScope.myError = false;
	
            vm.inputInvoice.forEach(function (el) {
				if (el.invoiceID == $stateParams.item.id) {
                    //console.log(el);
                    GoodsService.findGood(el.goodsID)
                        .then(function (good) {
                            good.data.quantity = parseFloat(good.data.quantity) - parseFloat(el.quantity);

                            GoodsService.editItem(good.data)
                                .then(function () {
                                })
                                .catch(errorHandler);
                        })
                        .catch(errorHandler);
                }
			});

            InputsService.deleteItem(vm.id)
                .then(function () {
                    $rootScope.myError = false;
                    $state.go('main.inputs');
                })
				.catch(errorHandler);
        }

        function inputsEditBack() {
            $state.go('main.inputs');
        }
		
		function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();