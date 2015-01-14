'use strict';
app.controller('InvoiceEditPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePelni', 'InvoicePelniRef',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePelni, InvoicePelniRef) {

        $scope.User = $rootScope.User;
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
       




        if (invoicePelni.$value && invoicePelni.$value == null) {
            alert('Tidak Ada Data Invoice');
        }


        var serviceFee = 20000;



        $scope.tambahPng = function() {
            InvoicePelniRef().$push().then(function(ref) {
                $scope.selectedInvoice.ListPng[ref.key()] = {
                    Nama: '',
                    Status: '',
                    Tipe: 'Thn',
                    Umur: null,
                    Harga: 0,
                    ServiceFee: 0,
                    SubTotal: 0
                };
            });
        };

        $scope.rmPng = function(key) {
            delete $scope.selectedInvoice.ListPng[key];
        }
        $scope.countPng = function() {
            var countPng = 0;
            _.each($scope.selectedInvoice.ListPng, function(value, key, list) {
                countPng++;
            });
            return countPng;
        };

        $scope.getNoUrut = function(inKey) {
            var noUrut = 0;
            _.each($scope.selectedInvoice.ListPng, function(value, key, list) {
                noUrut++;
                if (key == inKey)
                    return noUrut;
            });

            return noUrut;
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
            var total = 0;
            _.each($scope.selectedInvoice.ListPng, function(value, key, list) {
                if (value.SubTotal) {
                    total += value.SubTotal;
                }
            });
            return total;
        }

        $scope.save = function() {
            $scope.errMsg = '';
            if ($scope.selectedInvoice.Pemesan == '' || $scope.selectedInvoice.Pemesan == null) {
                $scope.errMsg = 'Nama Pemesan Harus Diisi';
                return;
            }
            if ($scope.selectedInvoice.MobilePemesan == '' || $scope.selectedInvoice.MobilePemesan == null) {
                $scope.errMsg = 'No HP Harus Diisi';
                return;
            }
            var reg = /^\d+$/;
            var testreg = reg.test($scope.selectedInvoice.MobilePemesan);
            if (testreg == false) {
                $scope.errMsg = 'No HP Harus terdiri dari angka';
                return;
            }
            if ($scope.selectedInvoice.MobilePemesan.length < 9  ) {
                $scope.errMsg = 'Panjang no Hp Harus Tepat';
                return;
            }
            if ($scope.selectedInvoice.AlamatPemesan == '' || $scope.selectedInvoice.AlamatPemesan == null) {
                $scope.errMsg = 'Alamat Harus Diisi';
                return;
            }


            $scope.selectedInvoice.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.selectedInvoice.UpdatedBy = $scope.User.uid;
            $scope.selectedInvoice.$save().then(function(ref) {

            }, function(error) {
                console.log("Error:", error);
            });



        }

        $scope.toDetail = function(){
            $state.transitionTo('app.pelni.invoice.detail', {
                idInvoice: $stateParams.idInvoice,
            });
        }
        $scope.printInvoice = function() {

            console.log($scope.selectedInvoice)
        };

    }
]);
