'use strict';
app.controller('InvoiceLunasDetailPesawatCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePesawat', 'HargaFac',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePesawat, HargaFac) {

        $scope.User = $rootScope.User;
        if (invoicePesawat && invoicePesawat.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {
            $scope.selectedInvoice = invoicePesawat;
            $scope.selectedInvoice.LunasMethod = 'Cash';
        }


        $scope.lunasBool = function(input) {
            if (input) {
                return 'Ya';
            } else {
                return 'Tidak';
            }
        }

        $scope.getBerangkatDate = function(input) {

            return moment(input).format('dddd, DD MMMM YYYY');
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


        $scope.grandTotal = function() {
            if ($scope.selectedInvoice) {
                var total = 0;
                _.each($scope.selectedInvoice.ListPng, function(value, key, list) {
                    if (value.Harga) {
                        total += parseInt(value.Harga);
                    }
                });
                return total;
            }
        }

        $scope.toEdit = function() {
            var paramSize = parseInt($stateParams.pageSize);
            $state.transitionTo('app.invoicepesawat.edit', {
                idInvoice: $stateParams.idInvoice,
                pageSize: paramSize,
            });
        };

        $scope.lunas = function() {
            if (confirm('Lunaskan Invoice a.n: ' + $scope.selectedInvoice.Pemesan + ' ?') == true) {
                $scope.selectedInvoice.LunasAt = {
                    '.sv': 'timestamp'
                };
                $scope.selectedInvoice.LunasBy = $scope.User.uid;

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

            $state.transitionTo('app.invoicelunaspesawat.list', {
                pageSize: paramSize,

            });

        };


    }
]);
