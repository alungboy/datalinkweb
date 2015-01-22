'use strict';
app.controller('InvoicePrintPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePelni', 'InvoicePelniRef',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePelni, InvoicePelniRef) {

        $scope.User = $rootScope.User;
        if (invoicePelni && invoicePelni.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {
            $scope.IdInvoice = $stateParams.idInvoice;
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
        
        $scope.getDayDateYear = function(input) {
            return moment(input).format('dddd, DD MMMM YYYY HH:mm');
        }

        $scope.getUserByUid = function(uid) {
            var user = null;
            if (uid) {
                user = $rootScope.Users[uid];
            }
            return user;
        };

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

    }
]);
