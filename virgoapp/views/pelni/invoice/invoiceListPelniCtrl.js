'use strict';
app.controller('InvoiceListPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'invoices',
    function($scope, $rootScope, $stateParams, $state, invoices) {

        if (!$stateParams.pageSize || $stateParams.pageSize == '') {
            $stateParams.pageSize = '10';
        };

        $scope.listInvoice = invoices;
       
        $scope.errMsg = null;
        $scope.okMsg = null;

        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };
      
        $scope.getUserByUid = function(uid) {
            var user = null;
            if (uid) {
                user = $rootScope.Users[uid];
            }
            return user;
        };

        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);
            if ($scope.listInvoice.length >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);

            if ($scope.listInvoice.length >= paramSize) {

                $state.transitionTo('app.pelni.invoice.list', {
                    startDate: null,
                    pageSize: paramSize + 10,
                    asc: null

                });
            }
        };

        $scope.detailInvoice = function(input) {
            if (input) {

                $state.transitionTo('app.pelni.invoice.detail', {
                    idInvoice: input,
                    

                });
            }
        };
    }
]);
