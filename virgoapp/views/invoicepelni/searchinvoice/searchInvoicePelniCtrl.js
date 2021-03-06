'use strict';
app.controller('SearchInvoicePelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePelni', 'InvoicePelniRef', 'HargaFac',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePelni, InvoicePelniRef, HargaFac) {
        $scope.User = $rootScope.User;
        if (invoicePelni && invoicePelni.$value === null || invoicePelni === null) {
            $scope.errMsg = 'Tidak Ada Data Invoice';
            console.log('Tidak Ada Data Invoice');
        } else {
            $scope.selectedInvoice = invoicePelni;

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


        $scope.getNoUrut = function(inKey) {
            if ($scope.selectedInvoice) {
                var noUrut = 0;

                _.each($scope.selectedInvoice.ListPng, function(value, key, list) {

                    noUrut++;
                    if (key == inKey) {

                        return;

                    }



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

        $scope.tampilkanData = function(e) {
            e.preventDefault();
            $scope.errMsg = null;
            $scope.okMsg = null;
            if (!$scope.invoiceBaru || $scope.invoiceBaru == '') {
                return;
            }
            $state.transitionTo('app.invoicepelni.searchinvoice', {
                idInvoice: $scope.invoiceBaru,

            });
            $scope.invoiceBaru = '';

        };

        $scope.toEdit = function() {
            $state.transitionTo('app.invoicepelni.edit', {
                idInvoice: $stateParams.idInvoice,
                pageSize: 20,
            });
        }

        $scope.toPrint = function() {

            var params = {
                idInvoice: $stateParams.idInvoice,
            }
            var statePrintInvoiceKapal = $state.href('app.invoicepelni.print', params);
            window.open(statePrintInvoiceKapal, '_blank');
        }

        $scope.toListInvoice = function() {

            $state.transitionTo('app.invoicepelni.list', {
                pageSize: 20,

            });

        };


    }
]);
