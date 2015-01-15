'use strict';
app.controller('StockPenjualanPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'tiketBaik', 'tiketIssuedDay', 'tiketPrintDay', 'tiketIssuedMonth', 'tiketPrintMonth',
    function($scope, $rootScope, $stateParams, $state, tiketBaik, tiketIssuedDay, tiketPrintDay, tiketIssuedMonth, tiketPrintMonth) {
        $scope.sumTiketBaik = tiketBaik.length;
        $scope.sumTiketIssuedMonth = tiketIssuedMonth.length + tiketPrintMonth.length;
        $scope.sumTiketIssuedDay = tiketIssuedDay.length + tiketPrintDay.length;

        $scope.besok = 
        $scope.hariSelanjutnya = function() {
            $state.transitionTo('app.pelni.stocktiket', {
                startDate: null,
                pageSize: paramSize + 10,
                asc: null
            });
        };

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
    }
]);
