'use strict';
app.controller('PrintTiketPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'tiketPrinted', 'TiketDataObj', '$timeout', 
    function($scope, $rootScope, $stateParams, $state, tiketPrinted, TiketDataObj, $timeout) {
        if (!$stateParams.pageSize || $stateParams.pageSize == '') {
            $stateParams.pageSize = '10';
        };
        $scope.listTiketIssued = tiketPrinted;
        $scope.errMsg = null;
        $scope.okMsg = null;



        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };
        $scope.getDayFromTime = function(input) {
            return moment(input, 'DD-MM-YYYY hh:mm').format('dddd, DD-MMMM-YYYY hh:mm')
        }

        $scope.getStatusName = function(input) {
            if (input == 0) {
                return 'Baik'
            }
            if (input == 1) {
                return 'Issued'
            }
            if (input == 2) {
                return 'Print'
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

        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);
            if ($scope.listTiketIssued.length >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);
            if ($scope.listTiketIssued.length >= paramSize) {

                $state.transitionTo('app.pelni.stocktiket', {
                    startDate: null,
                    pageSize: paramSize + 10,
                    asc: null

                });
            }
        };

        $scope.scanUlang = function() {

            $scope.showDetail = false;
            $scope.disTiket = false;
            $scope.tiketBaru = '';
        }

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


            $scope.selected = TiketDataObj($scope.tiketBaru);

            $scope.selected.$loaded().then(function() {
                if ($scope.selected.$value === null) {
                    $scope.showDetail = false;
                    $scope.errMsg = 'Tiket Belum Diissued';
                    $scope.tiketBaru = '';
                } else if ($scope.selected.Nama == null || $scope.selected.Nama === '') {
                    $scope.showDetail = false;
                    $scope.errMsg = 'Belum Ada Data Penumpang';
                    $scope.tiketBaru = '';
                } else {
                    $scope.showDetail = true;

                    $timeout(function(){
                        var element = document.getElementById('focusPrint');
                        if (element) {
                            element.focus();
                        }
                    });

                    $scope.errMsg = null;
                    $scope.disTiket = true;


                }
            });
        };

        $scope.print = function(e) {

            alert('Berhasil Print "' + $scope.selected.Nama + '" di printer: ' + $scope.barcodePrint);
            $scope.showDetail = false;
            $scope.disTiket = false;
            $scope.barcodePrint = '';
            $scope.tiketBaru = '';

        };

    }
]);
