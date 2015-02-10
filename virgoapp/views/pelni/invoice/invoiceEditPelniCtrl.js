'use strict';
app.controller('InvoiceEditPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePelni', 'InvoicePelniRef', 'HargaFac',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePelni, InvoicePelniRef, HargaFac) {

        $scope.User = $rootScope.User;
        if (invoicePelni && invoicePelni.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {

            $scope.selectedInvoice = invoicePelni;
            var beforeChange = $.extend(true, {}, invoicePelni);

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






        if (invoicePelni.$value && invoicePelni.$value == null) {
            alert('Tidak Ada Data Invoice');
        }


        var serviceFee = 20000;

        $scope.lunasBool = function(input){
            if (input) {
                return 'Ya';
            }else{
                return 'Tidak';
            }
        }


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
            if ($scope.selectedInvoice.LunasAt) {
                $scope.errMsg = 'Invoice Yang Sudah Lunas Tidak Dapat di EDIT!';
                return;
            }
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
            if ($scope.selectedInvoice.MobilePemesan.length < 9) {
                $scope.errMsg = 'Panjang no Hp Harus Tepat';
                return;
            }
            if ($scope.selectedInvoice.AlamatPemesan == '' || $scope.selectedInvoice.AlamatPemesan == null) {
                $scope.errMsg = 'Alamat Harus Diisi';
                return;
            }

            _.each($scope.selectedInvoice.ListPng, function(value, key, list) {
                if (!value.Nama || value.Nama == '') {
                    $scope.errMsg = 'Nama Penumpang Harus Diisi';
                    return;
                }
                if (!value.Status || value.Status == '') {
                    $scope.errMsg = 'Silahkan Pilih Status';
                    return;
                }
                if (!value.Umur || value.Umur == '') {
                    $scope.errMsg = 'Umur Harus Diisi';
                    return;
                }
                if (value.Status == 'Pria' || value.Status == 'Wanita') {
                    if (parseInt(value.Umur) < 12) {
                        $scope.errMsg = 'Umur Dewasa 12 Tahun Keatas';
                        return;
                    }
                }
                if (value.Status == 'Anak') {
                    if (parseInt(value.Umur) < 2 || parseInt(value.Umur) > 11) {
                        $scope.errMsg = 'Umur Anak Diantara 2-11 Tahun';
                        return;
                    }
                }
                if (value.Status == 'Bayi') {
                    if (parseInt(value.Umur) < 1 || parseInt(value.Umur) > 23) {
                        $scope.errMsg = 'Umur Bayi Diantara 1-23 Bulan';
                        return;
                    }
                }


            });


            if ($scope.errMsg) {
                return;
            }

            // Add History Harga




            $scope.selectedInvoice.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.selectedInvoice.UpdatedBy = $scope.User.uid;
            // Get Index TotalHistory
            var size = 0
            _.each($scope.selectedInvoice.TotalHistory, function(value, key, list) {
                size++
            });
            $scope.selectedInvoice.TotalHistory[size] = {
                Harga: $scope.grandTotal(),
                HargaAt: $scope.selectedInvoice.UpdatedAt,
                HargaBy: $scope.selectedInvoice.UpdatedBy,
            };

            $scope.selectedInvoice.$save().then(function(ref) {

                $state.transitionTo('app.pelni.invoice.detail', {
                    idInvoice: $stateParams.idInvoice,
                });

            }, function(error) {
                console.log("Error:", error);
            });



        }

        $scope.toDetail = function() {
            $state.transitionTo('app.pelni.invoice.detail', {
                idInvoice: $stateParams.idInvoice,
            });
        }
        $scope.printInvoice = function() {

            console.log($scope.selectedInvoice)
        };

    }
]);
