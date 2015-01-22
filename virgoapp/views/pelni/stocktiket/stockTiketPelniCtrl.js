'use strict';
app.controller('StockTiketPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'tiketBaik',
    function($scope, $rootScope, $stateParams, $state, tiketBaik) {
        if (!$stateParams.pageSize || $stateParams.pageSize == '') {
            $stateParams.pageSize = '10';
        };
        $scope.listTiketBaik = tiketBaik;
        $scope.listSum = $scope.listTiketBaik.length;
        $scope.errMsg = null;
        $scope.okMsg = null;


        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };
        
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

        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);
            if ($scope.listTiketBaik.length >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.pageSize);

            if ($scope.listTiketBaik.length >= paramSize) {

                $state.transitionTo('app.pelni.stocktiket', {
                    startDate: null,
                    pageSize: paramSize + 10,
                    asc: null

                });
            }
        };


        // $scope.showAll = function() {
        //     var paramSize = parseInt($stateParams.pageSize);
        //     if (paramSize == 2000) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        // };

        // $scope.loadAll = function() {
        //     var paramSize = parseInt($stateParams.pageSize);

        //     if ($scope.listTiketBaik.length >= paramSize) {

        //         $state.transitionTo('app.pelni.stocktiket', {
        //             startDate: null,
        //             pageSize: 2000,
        //             asc: null

        //         });
        //     }
        // };

        $scope.tambahStock = function(e) {
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

            var dateStr = moment().valueOf();
            var tiketPost = {
                NoTiket: noTiketInt,
                CreatedAt: {
                    '.sv': 'timestamp'
                },
                CreatedBy: $rootScope.User.uid,
                Status: 1,
                StatusTgl: parseInt('1' + dateStr),
            }

            var fbDb = $scope.listTiketBaik.$inst();
            console.log(tiketPost);
            fbDb.$update('' + noTiketInt, tiketPost).then(function(ref) {
                $scope.okMsg = "No Tiket " + noTiketInt + " berhasil ditambahkan!";
                $scope.tiketBaru = '';
                return;
            }, function(error) {
                if (error.code === 'PERMISSION_DENIED') {
                    $scope.errMsg = 'No Tiket ' + noTiketInt + ' Sudah Ada';
                } else {
                    $scope.errMsg = error;

                }
                $scope.tiketBaru = '';
                return;
            });
        };

    }
]);
