'use strict';
app.controller('PenujualanHarianReportPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'issuedDay',
    function($scope, $rootScope, $stateParams, $state, issuedDay) {
        $scope.listIssuedDay = issuedDay;

        if (!$stateParams.date || $stateParams.date.length !== 8) {
            $stateParams.date = moment().format('YYYYMMDD');

        }
        if (!$stateParams.pageSize || $stateParams.pageSize < 50) {
            $stateParams.pageSize = 50;
        }

        $scope.calendar = new Date(moment($stateParams.date, 'YYYYMMDD').valueOf());

        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);
            if ($scope.listIssuedDay.length >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);

            if ($scope.listIssuedDay.length >= paramSize) {

                $state.transitionTo('app.pelni.penjualanharianreport', {
                    date: $stateParams.date,
                    pageSize: paramSize + 50
                });
            }
        };


        $scope.search = function() {
            $state.transitionTo('app.pelni.penjualanharianreport', {
                date: moment($scope.calendar).format('YYYYMMDD'),
                pageSize: 50
            });
        };



        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };
        $scope.getDayDateYear = function(input) {
            return moment($stateParams.date, 'YYYYMMDD').format('dddd, DD MMMM YYYY');
        }
        $scope.getMonthName = function() {
            return moment($stateParams.date, 'YYYYMMDD').format('MMMM YYYY');
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
