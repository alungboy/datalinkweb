'use strict';
app.controller('InvoiceNewPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'singleJadwal', 'InvoicePelniRef',
    function($scope, $rootScope, $stateParams, $state, singleJadwal, InvoicePelniRef) {

        $scope.selectedJadwal = singleJadwal;
        $scope.dataKelas = $scope.selectedJadwal.seatharga.Kelas[$stateParams.idKelas];
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
            Kelas: $scope.dataKelas.Kode,
            KelasNama: $scope.dataKelas.Nama,
            IdKelas: $stateParams.idKelas,
            NonSeat: false,
            CreatedBy: $rootScope.User.uid,
            CreatedAt: {
                '.sv': 'timestamp'
            },
            ListPng: {},
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
            
            InvoicePelniRef().$push($scope.selectedInvoice).then(function(ref) {
                $state.transitionTo('app.pelni.invoice.detail', {
                    idInvoice: ref.key()
                });

            }, function(err) {
                $scope.errMsg = err;
            });


        }

        $scope.printInvoice = function() {

            console.log($scope.selectedInvoice)
        };

    }
]);
