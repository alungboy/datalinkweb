'use strict';
app.controller('InvoiceLunasDetailPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePelni', 'InvoicePelniRef', 'HargaFac',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePelni, InvoicePelniRef, HargaFac) {

        $scope.User = $rootScope.User;
        if (invoicePelni && invoicePelni.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {
            $scope.selectedInvoice = invoicePelni;
            $scope.selectedInvoice.LunasMethod = 'Cash';
            var kapal = $scope.selectedInvoice.Kapal;
            var pelayaran = $scope.selectedInvoice.Embar + '-' + $scope.selectedInvoice.EmbarCall + '-' + $scope.selectedInvoice.Debar + '-' + $scope.selectedInvoice.DebarCall;

            if (!HargaFac.pelni[kapal]) {
                $scope.dataKelas = null;
            } else {
                if (!HargaFac.pelni[kapal][pelayaran]) {
                    $scope.dataKelas = null;
                } else {
                    if (!HargaFac.pelni[kapal][pelayaran][$scope.selectedInvoice.Kelas]) {
                        $scope.dataKelas = null;
                    } else {
                        $scope.dataKelas = HargaFac.pelni[kapal][pelayaran][$scope.selectedInvoice.Kelas];
                    }
                }
            }

        }
        var serviceFee = 20000;

        $scope.lunasBool = function(input) {
            if (input) {
                return 'Ya';
            } else {
                return 'Tidak';
            }
        }

        $scope.getBerangkatDate = function(input) {

            return moment(input, 'YYYYMMDDHHmm').format('dddd, DD MMMM YYYY HH:mm');
        }

        $scope.getNoUrut = function(inKey) {
            if ($scope.selectedInvoice) {
                var noUrut = 0;
                _.find($scope.selectedInvoice.ListPng, function(value, key, list) {
                    noUrut++;
                    return key == inKey;
                });

                return noUrut;
            }
        };
        // Fungsi Hitung Harga


        $scope.hitungHarga = function(value) {
            if (value.Status == '') {
                value.Harga = 0;
                value.ServiceFee = 0;
                value.SubTotal = 0;
                value.Tipe = 'Thn';
                return;
            }
            if (value.Status == 'Pria' || value.Status == 'Wanita') {
                value.Harga = $scope.dataKelas.Dewasa - serviceFee;
                value.ServiceFee = serviceFee;
                value.SubTotal = value.Harga + value.ServiceFee;
                value.Tipe = 'Thn';
                return;
            }

            if (value.Status == 'Anak') {
                value.Harga = $scope.dataKelas.Anak - serviceFee;
                value.ServiceFee = serviceFee;
                value.SubTotal = value.Harga + value.ServiceFee;
                value.Tipe = 'Thn';
                return;
            }
            if (value.Status == 'Bayi') {
                value.Harga = $scope.dataKelas.Bayi - serviceFee;
                value.ServiceFee = serviceFee;
                value.SubTotal = value.Harga + value.ServiceFee;
                value.Tipe = 'Bln';
                return;
            }
        };
        $scope.grandTotal = function() {
            if ($scope.selectedInvoice) {
                var total = 0;
                _.each($scope.selectedInvoice.ListPng, function(value, key, list) {
                    if (value.SubTotal) {
                        total += value.SubTotal;
                    }
                });
                return total;
            }
        }

        $scope.toEdit = function() {
            $state.transitionTo('app.pelni.invoice.edit', {
                idInvoice: $stateParams.idInvoice,
            });
        };

        $scope.lunas = function() {
            if (confirm('Lunaskan Invoice a.n: ' + $scope.selectedInvoice.Pemesan + ' ?') == true) {
                $scope.selectedInvoice.LunasAt = {
                    '.sv': 'timestamp'
                };
                $scope.selectedInvoice.LunasBy = $scope.User.uid;
                if ($scope.selectedInvoice.LunasMethod === "Cash") {
                    $scope.selectedInvoice.LunasCash = $scope.selectedInvoice.HargaLast;
                    $scope.selectedInvoice.LunasTransfer = 0;
                    $scope.selectedInvoice.LunasEDCDebet = 0;
                    $scope.selectedInvoice.LunasEDCKredit = 0;
                    $scope.selectedInvoice.LunasKTG = 0;
                }
                if ($scope.selectedInvoice.LunasMethod === "Cash") {
                    $scope.selectedInvoice.LunasCash = $scope.selectedInvoice.HargaLast;
                    $scope.selectedInvoice.LunasTransfer = 0;
                    $scope.selectedInvoice.LunasEDCDebet = 0;
                    $scope.selectedInvoice.LunasEDCKredit = 0;
                    $scope.selectedInvoice.LunasKTG = 0;
                }
                if ($scope.selectedInvoice.LunasMethod === "Transfer") {
                    $scope.selectedInvoice.LunasCash = 0;
                    $scope.selectedInvoice.LunasTransfer = $scope.selectedInvoice.HargaLast;
                    $scope.selectedInvoice.LunasEDCDebet = 0;
                    $scope.selectedInvoice.LunasEDCKredit = 0;
                    $scope.selectedInvoice.LunasKTG = 0;
                }
                if ($scope.selectedInvoice.LunasMethod === "EDCDebet") {
                    $scope.selectedInvoice.LunasCash = 0;
                    $scope.selectedInvoice.LunasTransfer = 0;
                    $scope.selectedInvoice.LunasEDCDebet = $scope.selectedInvoice.HargaLast;
                    $scope.selectedInvoice.LunasEDCKredit = 0;
                    $scope.selectedInvoice.LunasKTG = 0;
                }
                if ($scope.selectedInvoice.LunasMethod === "EDCKredit") {
                    $scope.selectedInvoice.LunasCash = 0;
                    $scope.selectedInvoice.LunasTransfer = 0;
                    $scope.selectedInvoice.LunasEDCDebet = 0;
                    $scope.selectedInvoice.LunasEDCKredit = $scope.selectedInvoice.HargaLast + $scope.selectedInvoice.HargaLast * 0.03;
                    $scope.selectedInvoice.LunasKTG = 0;
                }
                if ($scope.selectedInvoice.LunasMethod === "KTG") {
                    $scope.selectedInvoice.LunasCash = 0;
                    $scope.selectedInvoice.LunasTransfer = 0;
                    $scope.selectedInvoice.LunasEDCDebet = 0;
                    $scope.selectedInvoice.LunasEDCKredit = 0;
                    $scope.selectedInvoice.LunasKTG = $scope.selectedInvoice.HargaLast;
                }
                $scope.selectedInvoice.$save().then(function(ref) {
                    var paramSize = parseInt($stateParams.pageSize);
                    $state.transitionTo('app.invoicelunaspelni.list', {
                        pageSize: paramSize,
                    });

                }, function(error) {
                    console.log("Error:", error);
                });

            }

            return;

        }

        $scope.void = function() {
            if (confirm('VOID kan Invoice a.n: ' + $scope.selectedInvoice.Pemesan + ' ?') == true) {
                $scope.selectedInvoice.LunasAt = {
                    '.sv': 'timestamp'
                };
                $scope.selectedInvoice.LunasBy = $scope.User.uid;
                    $scope.selectedInvoice.LunasMethod = 'VOID';
                    $scope.selectedInvoice.LunasCash = 0;
                    $scope.selectedInvoice.LunasTransfer = 0;
                    $scope.selectedInvoice.LunasEDCDebet = 0;
                    $scope.selectedInvoice.LunasEDCKredit = 0;
                    $scope.selectedInvoice.LunasKTG = 0;

                $scope.selectedInvoice.$save().then(function(ref) {
                    var paramSize = parseInt($stateParams.pageSize);
                    $state.transitionTo('app.invoicelunaspesawat.list', {
                        pageSize: paramSize,
                    });

                }, function(error) {
                    console.log("Error:", error);
                });
            } else {
                return;
            }
        }

        $scope.toListInvoice = function() {
            var paramSize = parseInt($stateParams.pageSize);

            $state.transitionTo('app.invoicelunaspelni.list', {
                pageSize: paramSize,

            });

        };


    }
]);
