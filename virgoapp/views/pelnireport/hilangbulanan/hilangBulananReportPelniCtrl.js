'use strict';
app.controller('HilangBulananReportPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'missingMonth',
    function($scope, $rootScope, $stateParams, $state, missingMonth) {
        $scope.listMissingMonth = missingMonth;

        if (!$stateParams.date || $stateParams.date.length !== 8) {
            $stateParams.date = moment().format('YYYYMMDD');

        }
      
        $scope.calendar = new Date(moment($stateParams.date, 'YYYYMMDD').valueOf());

    


        $scope.search = function() {
            $state.transitionTo('app.pelni.rusakbulananreport', {
                date: moment($scope.calendar).format('YYYYMMDD'),
           
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
