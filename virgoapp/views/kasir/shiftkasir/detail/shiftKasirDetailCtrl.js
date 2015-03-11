'use strict';
app.controller('ShiftKasirDetailCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'ShiftKasirRef', 'shiftkasir', 'lunaspelni', 'lunaspesawat',
    function($scope, $rootScope, $stateParams, $state, ShiftKasirRef, shiftkasir, lunaspelni, lunaspesawat) {

        var d = new Date();
        var Dibuat = d.valueOf();

        $scope.User = $rootScope.User;
        if (shiftkasir && shiftkasir.$value === null) {
            alert('Tidak Ada Data Shift');
        } else {
            $scope.selectedShift = shiftkasir;
        }
        $scope.lockPemasukan = true;
        $scope.lockPengeluaran = true;
        $scope.lockKasir = true;
        $scope.lockTutupKasir = true;
        $scope.lunasPelni = lunaspelni;
        $scope.lunasPesawat = lunaspesawat;


        $scope.getDate = function(input) {
            if (input) {
                return moment(input, 'YYYYMMDD').format('dddd, DD MMMM YYYY');
            }
        }


        $scope.getHour = function(input) {
            if (input) {
                return moment(input).format('HH:mm');
            }
            return null;

        }

        // Modal & Pengeluaran
        $scope.countPemasukan = function() {
            var count = 0;
            _.each($scope.selectedShift.Pemasukan, function(value, key, list) {
                count++;
            });
            return count;
        };

        $scope.countPengeluaran = function() {
            var count = 0;
            _.each($scope.selectedShift.Pengeluaran, function(value, key, list) {
                count++;
            });
            return count;
        };

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

        $scope.editPemasukan = function() {
            $scope.lockPemasukan = false;
        };

        $scope.rmPemasukan = function(key) {
            delete $scope.selectedShift.Pemasukan[key];
        };

        $scope.tambahPemasukan = function() {
            ShiftKasirRef().$push().then(function(ref) {
                $scope.selectedShift.Pemasukan[ref.key()] = {
                    CreatedAt: Dibuat,
                    Keterangan: '',
                    Jumlah: 0
                };
            });
        };

        $scope.savePemasukan = function() {
            $scope.selectedShift.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.selectedShift.UpdatedBy = $scope.User.uid;
            $scope.selectedShift.$save().then(function(ref) {
                $scope.lockPemasukan = true;
                // Pesawat Dan Pelni
                $scope.TotalLunasPesawat = $scope.sumAll($scope.lunasPesawat);
                $scope.TotalLunasPelni = $scope.sumAll($scope.lunasPelni);

                // Hitungan Hitungan Kasir Dan Lainnya
                $scope.SelisihModalPengeluaran = $scope.totalJumlah($scope.selectedShift.Pemasukan) - $scope.totalJumlah($scope.selectedShift.Pengeluaran);
                $scope.PenjualanCash = $scope.TotalLunasPesawat.totalCash + $scope.TotalLunasPelni.totalCash;
                $scope.ModalDanPenjualan = $scope.SelisihModalPengeluaran + $scope.PenjualanCash;
                $scope.SelisihKasir = $scope.totalKasir($scope.selectedShift.Kasir) - $scope.ModalDanPenjualan;
            }, function(error) {
                console.log("Error:", error);
            });

        };

        $scope.editPengeluaran = function() {
            $scope.lockPengeluaran = false;
        };

        $scope.rmPengeluaran = function(key) {
            delete $scope.selectedShift.Pengeluaran[key];
        };

        $scope.tambahPengeluaran = function() {
            ShiftKasirRef().$push().then(function(ref) {
                $scope.selectedShift.Pengeluaran[ref.key()] = {
                    CreatedAt: Dibuat,
                    Keterangan: '',
                    Jumlah: 0
                };
            });
        };

        $scope.savePengeluaran = function() {
            $scope.selectedShift.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.selectedShift.UpdatedBy = $scope.User.uid;
            $scope.selectedShift.$save().then(function(ref) {
                $scope.lockPengeluaran = true;
                // Pesawat Dan Pelni
                $scope.TotalLunasPesawat = $scope.sumAll($scope.lunasPesawat);
                $scope.TotalLunasPelni = $scope.sumAll($scope.lunasPelni);

                // Hitungan Hitungan Kasir Dan Lainnya
                $scope.SelisihModalPengeluaran = $scope.totalJumlah($scope.selectedShift.Pemasukan) - $scope.totalJumlah($scope.selectedShift.Pengeluaran);
                $scope.PenjualanCash = $scope.TotalLunasPesawat.totalCash + $scope.TotalLunasPelni.totalCash;
                $scope.ModalDanPenjualan = $scope.SelisihModalPengeluaran + $scope.PenjualanCash;
                $scope.SelisihKasir = $scope.totalKasir($scope.selectedShift.Kasir) - $scope.ModalDanPenjualan;
            }, function(error) {
                console.log("Error:", error);
            });

        };


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


        $scope.sumAll = function(input) {
            if (input) {
                var sum = {
                    totalRow: 0,
                    totalPax: 0,
                    totalCash: 0,
                    totalTransfer: 0,
                    totalEDCDebet: 0,
                    totalEDCKredit: 0,
                    totalKTG: 0,
                };

                _.each(input, function(value, key, list) {

                    if (value) {
                        if (value.TotalPax) {

                            sum.totalRow++;
                            sum.totalPax += value.TotalPax;
                            sum.totalCash += value.LunasCash;
                            sum.totalTransfer += value.LunasTransfer;
                            sum.totalEDCDebet += value.LunasEDCDebet;
                            sum.totalEDCKredit += value.LunasEDCKredit;
                            sum.totalKTG += value.LunasKTG;
                        }
                    }
                });

                return sum;
            }
        };

        // CRUD Kasir
        $scope.editKasir = function() {
            $scope.lockKasir = false;
        };

        $scope.saveKasir = function() {
            $scope.selectedShift.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.selectedShift.UpdatedBy = $scope.User.uid;
            $scope.selectedShift.$save().then(function(ref) {
                $scope.lockKasir = true;
                // Pesawat Dan Pelni
                $scope.TotalLunasPesawat = $scope.sumAll($scope.lunasPesawat);
                $scope.TotalLunasPelni = $scope.sumAll($scope.lunasPelni);

                // Hitungan Hitungan Kasir Dan Lainnya
                $scope.SelisihModalPengeluaran = $scope.totalJumlah($scope.selectedShift.Pemasukan) - $scope.totalJumlah($scope.selectedShift.Pengeluaran);
                $scope.PenjualanCash = $scope.TotalLunasPesawat.totalCash + $scope.TotalLunasPelni.totalCash;
                $scope.ModalDanPenjualan = $scope.SelisihModalPengeluaran + $scope.PenjualanCash;
                $scope.SelisihKasir = $scope.totalKasir($scope.selectedShift.Kasir) - $scope.ModalDanPenjualan;
            }, function(error) {
                console.log("Error:", error);
            });

        };

        $scope.editTutupKasir = function() {
            $scope.lockTutupKasir = false;
        };

        $scope.saveTutupKasir = function() {
            $scope.selectedShift.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.selectedShift.UpdatedBy = $scope.User.uid;
            $scope.selectedShift.$save().then(function(ref) {
                $scope.lockTutupKasir = true;
                // Pesawat Dan Pelni
                $scope.TotalLunasPesawat = $scope.sumAll($scope.lunasPesawat);
                $scope.TotalLunasPelni = $scope.sumAll($scope.lunasPelni);

                // Hitungan Hitungan Kasir Dan Lainnya
                $scope.SelisihModalPengeluaran = $scope.totalJumlah($scope.selectedShift.Pemasukan) - $scope.totalJumlah($scope.selectedShift.Pengeluaran);
                $scope.PenjualanCash = $scope.TotalLunasPesawat.totalCash + $scope.TotalLunasPelni.totalCash;
                $scope.ModalDanPenjualan = $scope.SelisihModalPengeluaran + $scope.PenjualanCash;
                $scope.SelisihKasir = $scope.totalKasir($scope.selectedShift.Kasir) - $scope.ModalDanPenjualan;
            }, function(error) {
                console.log("Error:", error);
            });

        };




        // Pesawat Dan Pelni
        $scope.TotalLunasPesawat = $scope.sumAll($scope.lunasPesawat);
        $scope.TotalLunasPelni = $scope.sumAll($scope.lunasPelni);

        // Hitungan Hitungan Kasir Dan Lainnya
        $scope.SelisihModalPengeluaran = $scope.totalJumlah($scope.selectedShift.Pemasukan) - $scope.totalJumlah($scope.selectedShift.Pengeluaran);
        $scope.PenjualanCash = $scope.TotalLunasPesawat.totalCash + $scope.TotalLunasPelni.totalCash;
        $scope.ModalDanPenjualan = $scope.SelisihModalPengeluaran + $scope.PenjualanCash;
        $scope.SelisihKasir = $scope.totalKasir($scope.selectedShift.Kasir) - $scope.ModalDanPenjualan;

        $scope.toNewShift = function() {
            var paramSize = parseInt($stateParams.pageSize);
            $state.transitionTo('app.shiftkasir.new', {
                pageSize: paramSize,
                idInvoice: $stateParams.idInvoice,
                dateshift: $stateParams.dateshift,
            });
        };

        $scope.toListShift = function() {
            var paramSize = parseInt($stateParams.pageSize);
            $state.transitionTo('app.shiftkasir.list', {
                pageSize: paramSize,
            });
        };

        $scope.tutupShift = function() {
            if (confirm('Anda Yakin Akan Tutup Shift Kasir? Isi Data Tidak dapat Di-EDIT!')) {
                $scope.selectedShift.Total = $scope.PenjualanCash;

                $scope.selectedShift.StatusTutup = true;
                $scope.selectedShift.UpdatedAt = {
                    '.sv': 'timestamp'
                };
                $scope.selectedShift.Tutup = {
                    '.sv': 'timestamp'
                };
                $scope.selectedShift.UpdatedBy = $scope.User.uid;

                $scope.selectedShift.$save().then(function(ref) {
                    $scope.lockTutupKasir = true;
                }, function(error) {
                    console.log("Error:", error);
                });
            } else {
                return;
            }

        };


    }
]);
