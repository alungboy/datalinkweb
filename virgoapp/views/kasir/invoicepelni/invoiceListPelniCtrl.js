'use strict';
app.controller('InvoiceLunasListPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'invoices',
    function($scope, $rootScope, $stateParams, $state, invoices) {

        if (!$stateParams.pageSize || $stateParams.pageSize == '') {
            $stateParams.pageSize = '20';
        };

        $scope.listInvoice = invoices;

        // Get Object Length Function
        $scope.listInvoice = invoices;
        var len = 0;
        _.each($scope.listInvoice, function(value, key, list) {
            len++;
        });
        $scope.listInvoiceLength = len;

        $scope.errMsg = null;
        $scope.okMsg = null;

        $scope.getBerangkatDate = function(input) {

            return moment(input, 'YYYYMMDDHHmm').format('dddd, DD MMMM HH:mm');
        }


        $scope.timeFromNow = function(input) {
            if (input) {
                return moment(input).fromNow();
            } else {
                return null;
            }

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
            if ($scope.listInvoiceLength >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);

            if ($scope.listInvoiceLength >= paramSize) {

                $state.transitionTo('app.invoicelunaspelni.list', {
                    startDate: null,
                    pageSize: parseInt($stateParams.pageSize) + 20,
                    asc: null

                });
            }
        };

        $scope.detailInvoice = function(input) {
            var paramSize = parseInt($stateParams.pageSize);
            if (input) {
                $state.transitionTo('app.invoicelunaspelni.detail', {
                    pageSize: paramSize,
                    idInvoice: input,
                });
            }
        };
    }
]);
