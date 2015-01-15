'use strict';
app.controller('StockPenjualanPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'tiketBaik', 'tiketIssuedDay', 'tiketIssuedMonth',
    function($scope, $rootScope, $stateParams, $state, tiketBaik, tiketIssuedDay, tiketIssuedMonth) {
        $scope.sumTiketBaik = tiketBaik.length;
        $scope.sumTiketIssuedDay = tiketIssuedDay.length;
        $scope.sumTiketIssuedMonth = tiketIssuedMonth.length;


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
