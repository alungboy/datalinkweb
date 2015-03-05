'use strict';
app.controller('InvoicePesawatNewCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'invoices', 'InvoicePesawatRef',
    function($scope, $rootScope, $stateParams, $state, invoices, InvoicePesawatRef) {
        var d = new Date();
        var Dibuat = d.valueOf();


        $scope.User = $rootScope.User;

        // doesn't need if anymore
        $scope.selectedInvoice = {

            Airlines: '',
            Berangkat: '',
            Tujuan: '',
            TglBerangkat: null,
            Pemesan: '',
            MobilePemesan: '',
            AlamatPemesan: '',
            CreatedBy: $rootScope.User.uid,
            CreatedAt: Dibuat,
            ListPng: {},
            TotalHistory: {}
        };
        InvoicePesawatRef().$push().then(function(ref) {
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
            InvoicePesawatRef().$push().then(function(ref) {
                $scope.selectedInvoice.ListPng[ref.key()] = {
                    Nama: '',
                    Status: '',
                    Harga: 0,
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



        $scope.grandTotal = function() {
            var total = 0;
            _.each($scope.selectedInvoice.ListPng, function(value, key, list) {
                if (value.Harga) {
                    total += parseInt(value.Harga);
                }
            });
            return total;
        };

        $scope.save = function() {
            $scope.errMsg = '';
            if ($scope.selectedInvoice.Airlines == '' || $scope.selectedInvoice.Airlines == null) {
                $scope.errMsg = 'Nama Airlines Harus Diisi';
                return;
            }
            if ($scope.selectedInvoice.Berangkat == '' || $scope.selectedInvoice.Berangkat == null) {
                $scope.errMsg = 'Berangkat Harus Diisi';
                return;
            }
            if ($scope.selectedInvoice.Tujuan == '' || $scope.selectedInvoice.Tujuan == null) {
                $scope.errMsg = 'Tujuan Harus Diisi';
                return;
            }

            if ($scope.selectedInvoice.TglBerangkat == '' || $scope.selectedInvoice.TglBerangkat == null) {
                $scope.errMsg = 'Tanggal Berangkat Harus Diisi';
                return;
            }
            if (($scope.selectedInvoice.TglBerangkat).valueOf() <= Dibuat - 86400000) {
                $scope.errMsg = 'Tanggal Berangkat Harus Tepat';
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
                if (!value.Title || value.Title == '') {
                    $scope.errMsg = 'Silahkan Pilih Title';
                    return;
                }
                if (!value.Nama || value.Nama == '') {
                    $scope.errMsg = 'Nama Penumpang Harus Diisi';
                    return;
                }
                if (!value.Status || value.Status == '') {
                    $scope.errMsg = 'Silahkan Pilih Status';
                    return;
                }
                if (!value.Harga || value.Harga == '') {
                    $scope.errMsg = 'Harga Harus Diisi';
                    return;
                }
               
            

            });


            if ($scope.errMsg) {
                return;
            }
            $scope.selectedInvoice.TglBerangkat = ($scope.selectedInvoice.TglBerangkat).valueOf();
            // Add History Harga


            $scope.selectedInvoice.TotalHistory['0'] = {
                Harga: $scope.grandTotal(),
                HargaAt: $scope.selectedInvoice.CreatedAt,
                HargaBy: $scope.selectedInvoice.CreatedBy,
            };

            var fbDb = invoices.$inst();;
            fbDb.$update('' + Dibuat, $scope.selectedInvoice).then(function(ref) {
                $state.transitionTo('app.invoicepesawat.detail', {
                    idInvoice: Dibuat,
                    pageSize: 20
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
