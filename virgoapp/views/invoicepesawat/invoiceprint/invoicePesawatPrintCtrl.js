'use strict';
app.controller('InvoicePesawatPrintCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'JadwalPelniSingleObj', 'invoices', 'InvoicePesawatRef',
    function($scope, $rootScope, $stateParams, $state, JadwalPelniSingleObj, invoices, InvoicePesawatRef) {

        $scope.User = $rootScope.User;
        if (invoices && invoices.$value === null) {
            alert('Tidak Ada Data Invoice');
        } else {
            $scope.IdInvoice = $stateParams.idInvoice;
            $scope.selectedInvoice = invoices;

        }

        var serviceFee = 20000;

        $scope.getDayDateYear = function(input) {

            return moment(input).format('dddd, DD MMMM YYYY HH:mm');
        }

        $scope.getBerangkatDate = function(input) {

            return moment(input).format('dddd, DD MMMM YYYY');
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
                    if (value.Harga) {
                        total += parseInt(value.Harga);
                    }
                });
                return total;
            }
        }

    }
]);
