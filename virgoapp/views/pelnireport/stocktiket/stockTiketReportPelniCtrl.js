'use strict';
app.controller('StockTiketReportPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'tiketBaik',
    function($scope, $rootScope, $stateParams, $state, tiketBaik) {
        $scope.sumTiketBaik = tiketBaik.length;

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
        $scope.getDayDateYear = function(input) {
            return moment(input, 'YYYYMMDDHHmm').format('dddd, DD MMMM YYYY HH:mm');
        }

        $scope.getUserByUid = function(uid) {
            var user = null;
            if (uid) {
                user = $rootScope.Users[uid];
            }
            return user;
        };
    }
]);
