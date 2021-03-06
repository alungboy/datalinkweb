'use strict';
app.controller('PenujualanHarianReportPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'issuedDay',
    function($scope, $rootScope, $stateParams, $state, issuedDay) {
        $scope.listIssuedDay = issuedDay;

        $scope.TotalHarga = function(){
            var sumHarga = 0;
            _.each(issuedDay, function(value, key, list){
            
                sumHarga += value.HargaTiket;
            
            });
            return sumHarga
        };

        if (!$stateParams.date || $stateParams.date.length !== 8) {
            $stateParams.date = moment().format('YYYYMMDD');

        }
        if (!$stateParams.pageSize || $stateParams.pageSize < 50) {
            $stateParams.pageSize = 50;
        }

        $scope.calendar = new Date(moment($stateParams.date, 'YYYYMMDD').valueOf());

        $scope.getStatusName = function(input) {
            if (input == 1) {
                return 'Baik'
            }
            if (input == 2) {
                return 'Issued'
            }
            if (input == 3) {
                return 'Batal'
            }
            if (input == 4) {
                return 'Rusak'
            }
            if (input == 5) {
                return 'Hilang'
            }
            return '';
        };

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

                $state.transitionTo('app.pelnireport.penjualanharian', {
                    date: $stateParams.date,
                    pageSize: paramSize + 2000
                });
            }
        };


        $scope.search = function() {
            $state.transitionTo('app.pelnireport.penjualanharian', {
                date: moment($scope.calendar).format('YYYYMMDD'),
                pageSize: 2000
            });
        };



        $scope.timeFromNow = function(input) {
            if (input) {
                return moment(input).fromNow();
            }else{
                return null;
            }
            
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
