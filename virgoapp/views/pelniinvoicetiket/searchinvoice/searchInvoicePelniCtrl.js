'use strict';
app.controller('SearchInvoicePelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePelni', 'InvoicePelniRef',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePelni, InvoicePelniRef) {

        $scope.User = $rootScope.User;
        if (invoicePelni && invoicePelni.$value === null || invoicePelni === null) {
            $scope.errMsg = 'Tidak Ada Data Invoice';
            console.log('Tidak Ada Data Invoice');
        } else {
            $scope.selectedInvoice = invoicePelni;

            $scope.selectedJadwal = JadwalPelniSingleObj($scope.selectedInvoice.IdJadwal);
            $scope.selectedJadwal.$loaded(
                function(data) {
                    $scope.dataKelas = $scope.selectedJadwal.seatharga.Kelas[$scope.selectedInvoice.IdKelas];
                },
                function(error) {
                    console.error("Error:", error);
                }
            );
        }




        var serviceFee = 20000;




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
                value.Harga = $scope.dataKelas.HargaDewasa + 10000;
                value.ServiceFee = serviceFee;
                value.SubTotal = value.Harga + value.ServiceFee;
                value.Tipe = 'Thn';
                return;
            }

            if (value.Status == 'Anak') {
                value.Harga = $scope.dataKelas.HargaAnak + 10000;
                value.ServiceFee = serviceFee;
                value.SubTotal = value.Harga + value.ServiceFee;
                value.Tipe = 'Thn';
                return;
            }
            if (value.Status == 'Bayi') {
                value.Harga = $scope.dataKelas.HargaBayi + 10000;
                value.ServiceFee = serviceFee;
                value.SubTotal = value.Harga + value.ServiceFee;
                value.Tipe = 'Bln';
                return;
            }
        }
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
            $state.transitionTo('app.pelni.searchinvoice', {
                idInvoice: $scope.invoiceBaru,

            });
            $scope.invoiceBaru = '';

        };

        $scope.toEdit = function() {
            $state.transitionTo('app.pelni.invoice.edit', {
                idInvoice: $stateParams.idInvoice,
            });
        }


    }
]);
