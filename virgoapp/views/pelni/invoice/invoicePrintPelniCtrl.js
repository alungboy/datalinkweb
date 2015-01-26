'use strict';
app.controller('InvoicePrintPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoicePelni', 'InvoicePelniRef',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoicePelni, InvoicePelniRef) {

        $scope.User = $rootScope.User;
        if (invoicePelni && invoicePelni.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {
            $scope.IdInvoice = $stateParams.idInvoice;
            $scope.selectedInvoice = invoicePelni;

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
                    if (value.SubTotal) {
                        total += value.SubTotal;
                    }
                });
                return total;
            }
        }

    }
]);
