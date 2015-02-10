'use strict';
app.controller('InvoiceNewPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'singleJadwal', 'InvoicePelniRef', 'HargaFac', 'invoices',
    function($scope, $rootScope, $stateParams, $state, singleJadwal, InvoicePelniRef, HargaFac, invoices) {
        var d = new Date();
        var Dibuat = d.valueOf();
        $scope.selectedJadwal = singleJadwal;
        var kapal = $scope.selectedJadwal.Kapal;
        var pelayaran = $scope.selectedJadwal.Embar + '-' + $scope.selectedJadwal.EmbarCall + '-' + $scope.selectedJadwal.Debar + '-' + $scope.selectedJadwal.DebarCall;
        if (!HargaFac.pelni[kapal]) {
            $scope.dataKelas = null;
        } else {
            if (!HargaFac.pelni[kapal][pelayaran]) {
                $scope.dataKelas = null;
            } else {
                if (!HargaFac.pelni[kapal][pelayaran][$stateParams.idKelas]) {
                    $scope.dataKelas = null;
                } else {
                    $scope.dataKelas = HargaFac.pelni[kapal][pelayaran][$stateParams.idKelas];
                }
            }
        }



        $scope.User = $rootScope.User;

        // doesn't need if anymore
        $scope.selectedInvoice = {
            TipeBooking: 0,
            JenisBooking: 0,
            Pemesan: '',
            AlamatPemesan: '',
            MobilePemesan: '',
            Kapal: $scope.selectedJadwal.Kapal,
            KapalNama: $scope.selectedJadwal.KapalNama,
            TglBerangkat: $scope.selectedJadwal.Berangkat,
            IdJadwal: $stateParams.idJadwal,
            Embar: $scope.selectedJadwal.Embar,
            EmbarNama: $scope.selectedJadwal.EmbarNama,
            EmbarCall: $scope.selectedJadwal.EmbarCall,
            Debar: $scope.selectedJadwal.Debar,
            DebarNama: $scope.selectedJadwal.DebarNama,
            DebarCall: $scope.selectedJadwal.DebarCall,
            Kelas: $stateParams.idKelas,
            KelasNama: $stateParams.idKelas,
            IdKelas: $stateParams.idKelas,
            NonSeat: false,
            CreatedBy: $rootScope.User.uid,
            CreatedAt: Dibuat,
            ListPng: {},
            TotalHistory: {}
        };
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
        };

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


            $scope.selectedInvoice.TotalHistory['0'] = {
                Harga: $scope.grandTotal(),
                HargaAt: $scope.selectedInvoice.CreatedAt,
                HargaBy: $scope.selectedInvoice.CreatedBy,
            };

            var fbDb = invoices.$inst();;
            fbDb.$update('' + Dibuat, $scope.selectedInvoice).then(function(ref) {
                $state.transitionTo('app.pelni.invoice.detail', {
                    idInvoice: Dibuat
                });
                return;
            }, function(error) {

                $scope.errMsg = error;

                return;
            });

            // Cara Lama Generate ID Otomatis

            // InvoicePelniRef().$push($scope.selectedInvoice).then(function(ref) {
            //     $state.transitionTo('app.pelni.invoice.detail', {
            //         idInvoice: ref.key()
            //     });

            // }, function(err) {
            //     $scope.errMsg = err;
            // });


        }

        $scope.printInvoice = function() {

            console.log($scope.selectedInvoice)
        };

    }
]);
