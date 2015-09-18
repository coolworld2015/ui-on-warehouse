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
            inputsEditBack: inputsEditBack,
			_errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        function inputsDelete() {
            $rootScope.loading = true;
            $rootScope.myError = false;

			//get all invoices by id for this $stateParams.item.
			
            //    inputInvoice.forEach(function (el) {
            //        if (el.invoiceID == $stateParams.item.id) {
            //            inputTransaction.setStoreSum(el.goodsID, -el.quantity);
            //        }
            //    });
			
			//GoodsService.findGood($stateParams.invoice.goodsID)
			//	.then(function (good) {
			//		good.data.quantity = parseFloat(good.data.quantity) - parseFloat(vm.quantity);

			//		GoodsService.editItem(good.data)
			//			.then(function () {
											
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