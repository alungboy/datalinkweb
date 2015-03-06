'use strict';
app.controller('ShiftKasirListCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'shiftkasirs',
    function($scope, $rootScope, $stateParams, $state, shiftkasirs) {

        if (!$stateParams.pageSize || $stateParams.pageSize == '') {
            $stateParams.pageSize = '20';
        };

        // Get Object Length Function
        $scope.listShift = shiftkasirs;
        var len = 0;
        _.each($scope.listShift, function(value, key, list) {
            len++;
        });
        $scope.listShiftLength = len;

        $scope.errMsg = null;
        $scope.okMsg = null;

        $scope.timeFromNow = function(input) {
            if (input) {
                return moment(input).fromNow();
            } else {
                return null;
            }

        };

        $scope.getShiftStatus = function(input) {
            if (input) {
                return 'Tutup';
            } else {
                return 'Buka';
            }
        }

        $scope.getDate = function(input) {
            if (input) {
                return moment(input, 'YYYYMMDD').format('dddd, DD MMMM YYYY');
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
            if ($scope.listShiftLength >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);

            if ($scope.listShiftLength >= paramSize) {

                $state.transitionTo('app.shiftkasir.list', {
                    pageSize: paramSize + 20,
                });
            }
        };

        $scope.detailShift = function(input) {
            var paramSize = parseInt($stateParams.pageSize);
            if (input) {

                $state.transitionTo('app.shiftkasir.detail', {
                    pageSize: paramSize,
                    dateshift: input.Tanggal + input.Shift,
                    shiftOpen: input.Buka,
                    shiftClosed: input.Tutup
                });
            }
        };
    }
]);
