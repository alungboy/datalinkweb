'use strict';
app.controller('InvoicePesawatEditCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoices', 'InvoicePesawatRef', 'HargaFac',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoices, InvoicePesawatRef, HargaFac) {

        $scope.User = $rootScope.User;
        if (invoices && invoices.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {
            $scope.selectedInvoice = invoices;
            $scope.selectedInvoice.TglBerangkat = new Date($scope.selectedInvoice.TglBerangkat);
        }






        if (invoices.$value && invoices.$value == null) {
            alert('Tidak Ada Data Invoice');
        }


        $scope.lunasBool = function(input){
            if (input) {
                return 'Ya';
            }else{
                return 'Tidak';
            }
        }

        $scope.getBerangkatDate = function(input) {

            return moment(input, 'YYYYMMDDHHmm').format('dddd, DD MMMM YYYY HH:mm');
        }

        $scope.tambahPng = function() {
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

            $scope.selectedInvoice.HargaLast = $scope.grandTotal();
            $scope.TotalPax = $scope.countPng();


            $scope.selectedInvoice.$save().then(function(ref) {
                var paramSize = parseInt($stateParams.pageSize);
                $state.transitionTo('app.invoicepesawat.detail', {
                    idInvoice: $stateParams.idInvoice,
                    pageSize: paramSize,
                });

            }, function(error) {
                console.log("Error:", error);
            });



        }

        $scope.toDetail = function() {
            var paramSize = parseInt($stateParams.pageSize);
            $state.transitionTo('app.invoicepesawat.detail', {
                idInvoice: $stateParams.idInvoice,
                pageSize: paramSize,
            });
        }
        

    }
]);
