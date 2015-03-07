'use strict';
app.controller('ShiftKasirDetailCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'shiftkasir', 'lunaspelni', 'lunaspesawat',
    function($scope, $rootScope, $stateParams, $state, shiftkasir, lunaspelni, lunaspesawat) {

        $scope.User = $rootScope.User;
        if (shiftkasir && shiftkasir.$value === null) {
            alert('Tidak Ada Data Shift');
        } else {
            $scope.selectedShift = shiftkasir;
        }
        $scope.lunasPelni = lunaspelni;
        $scope.lunasPesawat = lunaspesawat;

        $scope.lunasBool = function(input) {
            if (input) {
                return 'Ya';
            } else {
                return 'Tidak';
            }
        }

        $scope.getDate = function(input) {
            if (input) {
                return moment(input, 'YYYYMMDD').format('dddd, DD MMMM YYYY');
            }
        }


        $scope.getHour = function(input) {

            return moment(input).format('HH:mm');
        }

        // Modal

        $scope.totalJumlah = function(input) {
            if (input) {
                var total = 0;
                _.each(input, function(value, key, list) {
                    if (value.Jumlah) {
                        total += parseInt(value.Jumlah);
                    }
                });
                return total;
            }
        }

        // Kasir Function
        $scope.multiplyBy = function(input, multiply) {
            if (typeof(input) == 'number') {
                var result = parseInt(input) * parseInt(multiply);
                return result
            }
            return 0;
        };

        $scope.totalKasir = function(input) {
            if (input) {
                var result = 0;
                result += input.SeratusRibu * 100000;
                result += input.LimaPuluhRibu * 50000;
                result += input.DuaPuluhRibu * 20000;
                result += input.SepuluhRibu * 10000;
                result += input.LimaRibu * 5000;
                result += input.DuaRibu * 2000;
                result += input.Seribu * 1000;
                result += input.LimaRatus * 500;
                result += input.DuaRatus * 200;
                result += input.Seratus * 100;
                return result;
            }
            return 0;
        };

        $scope.totalKasirTutup = function() {
            var result = 0;
            result += $scope.selectedShift.KasirTutup.SeratusRibu * 100000;
            result += $scope.selectedShift.KasirTutup.LimaPuluhRibu * 50000;
            result += $scope.selectedShift.KasirTutup.DuaPuluhRibu * 20000;
            result += $scope.selectedShift.KasirTutup.SepuluhRibu * 10000;
            result += $scope.selectedShift.KasirTutup.LimaRibu * 5000;
            result += $scope.selectedShift.KasirTutup.DuaRibu * 2000;
            result += $scope.selectedShift.KasirTutup.Seribu * 1000;
            result += $scope.selectedShift.KasirTutup.LimaRatus * 500;
            result += $scope.selectedShift.KasirTutup.DuaRatus * 200;
            result += $scope.selectedShift.KasirTutup.Seratus * 100;
            return result;
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

        $scope.toDetail = function() {
            var paramSize = parseInt($stateParams.pageSize);
            $state.transitionTo('app.invoicepesawat.edit', {
                idInvoice: $stateParams.idInvoice,
                pageSize: paramSize,
            });
        };

        $scope.toListInvoice = function() {
            var paramSize = parseInt($stateParams.pageSize);

            $state.transitionTo('app.invoicepesawat.list', {
                pageSize: paramSize,

            });

        };

    }
]);
