'use strict';
app.controller('ShiftKasirNewCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'shiftkasir', 'newshiftkasir',
    function($scope, $rootScope, $stateParams, $state, shiftkasir, newshiftkasir) {
        var d = new Date();
        var Dibuat = d.valueOf();

        $scope.User = $rootScope.User;
        if (shiftkasir && shiftkasir.$value === null) {
            alert('Tidak Ada Data Shift');
        } else {
            $scope.selectedShift = {
                Tanggal : shiftkasir.Tanggal,
                Buka: Dibuat,
                Tutup : null,
                CreatedAt: Dibuat,
                CreatedBy: $rootScope.User.uid,
                StatusTutup: false,
                Kasir : {
                    SeratusRibu: 0,
                    LimaPuluhRibu: 0,
                    DuaPuluhRibu: 0,
                    SepuluhRibu: 0,
                    LimaRibu: 0,
                    DuaRibu: 0,
                    Seribu: 0,
                    LimaRatus: 0,
                    DuaRatus: 0,
                    Seratus: 0,
                },
                KasirTutup: shiftkasir.KasirTutup,
                Pengeluaran: shiftkasir.Pengeluaran,
                Pemasukan: shiftkasir.Pemasukan

            }
        }

        $scope.lunasBool = function(input) {
            if (input) {
                return 'Ya';
            } else {
                return 'Tidak';
            }
        }

        $scope.getDate = function(input) {
            if (input) {
                return moment(input, 'YYYYMMDD').format('dddd, DD MMMM YYYY');
            }
        }


        $scope.getHour = function(input) {

            return moment(input).format('HH:mm');
        }

        // Modal

        $scope.totalJumlah = function(input) {
            if (input) {
                var total = 0;
                _.each(input, function(value, key, list) {
                    if (value.Jumlah) {
                        total += parseInt(value.Jumlah);
                    }
                });
                return total;
            }
        }

        // Kasir Function
        $scope.multiplyBy = function(input, multiply) {
            if (typeof(input) == 'number') {
                var result = parseInt(input) * parseInt(multiply);
                return result
            }
            return 0;
        };

        $scope.totalKasir = function(input) {
            if (input) {
                var result = 0;
                result += input.SeratusRibu * 100000;
                result += input.LimaPuluhRibu * 50000;
                result += input.DuaPuluhRibu * 20000;
                result += input.SepuluhRibu * 10000;
                result += input.LimaRibu * 5000;
                result += input.DuaRibu * 2000;
                result += input.Seribu * 1000;
                result += input.LimaRatus * 500;
                result += input.DuaRatus * 200;
                result += input.Seratus * 100;
                return result;
            }
            return 0;
        };

        $scope.totalKasirTutup = function() {
            var result = 0;
            result += $scope.selectedShift.KasirTutup.SeratusRibu * 100000;
            result += $scope.selectedShift.KasirTutup.LimaPuluhRibu * 50000;
            result += $scope.selectedShift.KasirTutup.DuaPuluhRibu * 20000;
            result += $scope.selectedShift.KasirTutup.SepuluhRibu * 10000;
            result += $scope.selectedShift.KasirTutup.LimaRibu * 5000;
            result += $scope.selectedShift.KasirTutup.DuaRibu * 2000;
            result += $scope.selectedShift.KasirTutup.Seribu * 1000;
            result += $scope.selectedShift.KasirTutup.LimaRatus * 500;
            result += $scope.selectedShift.KasirTutup.DuaRatus * 200;
            result += $scope.selectedShift.KasirTutup.Seratus * 100;
            return result;
        };


        $scope.toListShift = function() {
            var paramSize = parseInt($stateParams.pageSize);
            $state.transitionTo('app.shiftkasir.list', {
                pageSize: paramSize,
            });
        };

        $scope.save = function() {
            $scope.errMsg = '';
            if ($scope.selectedShift.PJ == '' || $scope.selectedShift.PJ == null) {
                $scope.errMsg = 'Harus Ada Penanggungjawab';
                return;
            }
            if ($scope.selectedShift.Tanggal == '' || $scope.selectedShift.Tanggal == null) {
                $scope.errMsg = 'Harus Ada Tanggal';
                return;
            }
            if ($scope.selectedShift.Shift == '' || $scope.selectedShift.Shift == null) {
                $scope.errMsg = 'Silahkan Pilih Shift';
                return;
            }
           

        
            if ($scope.errMsg) {
                return;
            }

            var newId = $scope.selectedShift.Tanggal + $scope.selectedShift.Shift
            console.log($scope.selectedShift);
            var fbDb = newshiftkasir.$inst();
            fbDb.$update(newId, $scope.selectedShift).then(function(ref) {
                $state.transitionTo('app.shiftkasir.list', {
                    pageSize: $stateParams.pageSize,
                });
                return;
            }, function(error) {
                $scope.errMsg = error;
                return;
            });

            // Cara Lama Generate ID Otomatis

            // InvoicePelniRef().$push($scope.selectedInvoice).then(function(ref) {
            //     $state.transitionTo('app.invoicepesawat.detail', {
            //         idInvoice: ref.key()
            //     });

            // }, function(err) {
            //     $scope.errMsg = err;
            // });


        }




    }
]);
