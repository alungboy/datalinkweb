'use strict';
app.controller('SearchTiketPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'tiketSing', '$timeout',
    function($scope, $rootScope, $stateParams, $state, tiketSing, $timeout) {


        if (!$stateParams.noTiket || $stateParams.noTiket.length != 10) {
            $scope.tiketSingle = null;
        } else {
            $scope.tiketSingle = tiketSing[$stateParams.noTiket];
        }

        $scope.errMsg = null;
        $scope.okMsg = null;

        $scope.timeFromNow = function(input) {
            if (input) {
                return moment(input).fromNow();
            }else{
                return null;
            }
            
        };
        
        $scope.getDayFromTime = function(input) {
            if (input) {
                return moment(input).format('dddd, DD-MMMM-YYYY hh:mm');
            }else{
                return '0';
            }
        }

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

        $scope.getUserByUid = function(uid) {
            var user = null;
            if (uid) {
                user = $rootScope.Users[uid];
            }
            return user;
        };

        $scope.tampilkanData = function(e) {
            e.preventDefault();
            $scope.errMsg = null;
            $scope.okMsg = null;
            if (!$scope.tiketBaru || $scope.tiketBaru == '') {
                return;
            }
            if (($scope.tiketBaru).length !== 10) {
                $scope.errMsg = 'Panjang no tiket tidak benar!';
                $scope.tiketBaru = '';
                return;
            }

            var isStrNum = /^[0-9]{1,10}$/;
            if (!isStrNum.test($scope.tiketBaru)) {
                $scope.errMsg = "No Tiket hanya boleh angka";
                $scope.tiketBaru = '';
                return;
            }

            var noTiketInt = parseInt($scope.tiketBaru);
            var tktSinMin = 1000000001;
            var tktSinMax = 1999999999;

            if (noTiketInt < tktSinMin || noTiketInt > tktSinMax) {
                $scope.errMsg = "No Tiket Salah";
                $scope.tiketBaru = '';
                return;
            }

            $state.transitionTo('app.tiketpelni.searchtiket', {
                noTiket: $scope.tiketBaru,

            });
            $scope.tiketBaru = '';

        };


    }
]);
