'use strict';
app.controller('InvoiceListPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'invoices',
    function($scope, $rootScope, $stateParams, $state, invoices) {

        if (!$stateParams.pageSize || $stateParams.pageSize == '') {
            $stateParams.pageSize = '10';
        };

        // Get Object Length Function
        $scope.listInvoice = invoices;
        var len = 0;
        _.each($scope.listInvoice, function(value, key, list){
           len++;
        });
        $scope.listInvoiceLength = len;

       
        $scope.errMsg = null;
        $scope.okMsg = null;

        $scope.timeFromNow = function(input) {
            if (input) {
                return moment(input).fromNow();
            }else{
                return null;
            }
            
        };

        $scope.lunasBool = function(input){
            if (input) {
                return 'Ya';
            }else{
                return 'Tidak';
            }
        }
      
        $scope.getUserByUid = function(uid) {
            var user = null;
            if (uid) {
                user = $rootScope.Users[uid];
            }
            return user;
        };

        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);
            if ($scope.listInvoiceLength >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);

            if ($scope.listInvoiceLength >= paramSize) {

                $state.transitionTo('app.pelni.invoice.list', {
                    startDate: null,
                    pageSize: paramSize + 10,
                    asc: null

                });
            }
        };

        $scope.detailInvoice = function(input) {
            var paramSize = parseInt($stateParams.pageSize);
            if (input) {

                $state.transitionTo('app.pelni.invoice.detail', {
                    idInvoice: input,
                    pageSize: paramSize,

                });
            }
        };
    }
]);
