'use strict';
app.controller('SearchTiketPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'ReqJadwalPelniRef', 'listPelabuhanPelni',
    function($scope, $rootScope, $stateParams, $state, ReqJadwalPelniRef, listPelabuhanPelni) {


        $scope.DebarkasiArr = listPelabuhanPelni;
        $scope.embarView = "Embarkasi";
        $scope.debarView = "Debarkasi"

        if ($stateParams.embar || $stateParams.debar) {
            _.each(listPelabuhanPelni, function(value, key, list) {
                if (value.Kode == $stateParams.embar) {
                    $scope.embarView = value.Nama + ' ' + value.Kode;

                }
                if (value.Kode == $stateParams.debar) {
                    $scope.debarView = value.Nama + ' ' + value.Kode;

                }

            });
        }

        $scope.searchPelni = function() {
            $scope.errMsg = '';
            if (!$scope.Embar && $scope.Embar == null) {
                $scope.errMsg = "Embarkasi Harus diisi";
                return;
            }
            if (!$scope.Debar && $scope.Debar == null) {
                $scope.errMsg = "Debarkasi Harus diisi";
                return;
            }
            if ($scope.Embar.originalObject.Kode == $scope.Debar.originalObject.Kode) {
                $scope.errMsg = "Embarkasi Tidak Boleh Sama Dengan Debarkasi";
                return;
            }
            ReqJadwalPelniRef().$push({
                Embar: $scope.Embar.originalObject.Kode,
                Debar: $scope.Debar.originalObject.Kode,
                CreatedAt: {
                    '.sv': 'timestamp'
                },
                CreatedBy: $rootScope.User.uid
            }).then(function(ref) {
                $state.transitionTo('app.pelni.search.results', {
                    embar: $scope.Embar.originalObject.Kode,
                    debar: $scope.Debar.originalObject.Kode
                });

            }, function(err) {
                $scope.errMsg = err;
            });

        }

        $scope.clearSearchPelni = function() {
            $scope.Embar = null;
            $scope.Debar = null;
            $state.transitionTo('app.pelni.search')

        }
    }
]);

app.controller('SearchResultsTiketPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'ReqJadwalPelniRef', 'listJadwalPelni',
    function($scope, $rootScope, $stateParams, $state, ReqJadwalPelniRef, listJadwalPelni) {
        $scope.ListJadwal = listJadwalPelni;

        $scope.getDayDateYear = function(input) {
            return moment(input, 'YYYYMMDDHHmm').format('dddd, DD MMMM YYYY HH:mm');
        }

        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };

        $scope.kapalSearch = function(idKapal) {
            ReqJadwalPelniRef().$push({
                Kapal: idKapal,
                CreatedAt: {
                    '.sv': 'timestamp'
                },
                CreatedBy: $rootScope.User.uid
            }).then(function(ref) {
                $state.transitionTo('app.pelni.search.reskapal', {
                    embar: $stateParams.embar,
                    debar: $stateParams.debar,
                    idKapal: idKapal
                });

            }, function(err) {
                console.log(err);
            });

        }

        $scope.createInvoce = function(idJadwal, idKelas) {
            $state.transitionTo('app.pelni.invoicenew', {
                idJadwal: idJadwal,
                idKelas: idKelas
            });
        };
    }
]);

app.controller('SearchResultsKapalPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'listKapalPelni',
    function($scope, $rootScope, $stateParams, $state, listKapalPelni) {
        $scope.ListKapal = listKapalPelni;

        $scope.getDayDateYear = function(input) {
            return moment(input, 'YYYYMMDDHHmm').format('dddd, DD MMMM YYYY HH:mm');
        }

        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };

        $scope.createInvoce = function(idJadwal, idKelas) {
            $state.transitionTo('app.pelni.invoicenew', {
                idJadwal: idJadwal,
                idKelas: idKelas
            });
        };
    }
]);
