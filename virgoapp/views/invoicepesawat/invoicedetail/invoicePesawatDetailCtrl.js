'use strict';
app.controller('InvoicePesawatDetailCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoices', 'InvoicePesawatRef', 'HargaFac',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoices, InvoicePesawatRef, HargaFac) {

        $scope.User = $rootScope.User;
        if (invoices && invoices.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {
            $scope.selectedInvoice = invoices;
        }

        $scope.lunasBool = function(input){
            if (input) {
                return 'Ya';
            }else{
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

        $scope.toPrint = function() {

            var params = {
                idInvoice: $stateParams.idInvoice,
            }
            var statePrintInvoiceKapal = $state.href('app.invoicepesawat.print', params);
            window.open(statePrintInvoiceKapal, '_blank');
        }

        $scope.toListInvoice = function() {
            var paramSize = parseInt($stateParams.pageSize);

                $state.transitionTo('app.invoicepesawat.list', {
                    pageSize: paramSize,

                });
          
        };

    }
]);
