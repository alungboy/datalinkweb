'use strict';
app.controller('BatalBulananReportPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'cancelMonth',
    function($scope, $rootScope, $stateParams, $state, cancelMonth) {
        $scope.listCancelMonth = cancelMonth;

        if (!$stateParams.date || $stateParams.date.length !== 8) {
            $stateParams.date = moment().format('YYYYMMDD');

        }
      
        $scope.calendar = new Date(moment($stateParams.date, 'YYYYMMDD').valueOf());


        $scope.search = function() {
            $state.transitionTo('app.pelnireport.batalbulanan', {
                date: moment($scope.calendar).format('YYYYMMDD'),
           
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
