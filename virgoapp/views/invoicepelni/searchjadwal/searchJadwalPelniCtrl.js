'use strict';
app.controller('SearchJadwalPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'ReqJadwalPelniRef', 'listPelabuhanPelni',
    function($scope, $rootScope, $stateParams, $state, ReqJadwalPelniRef, listPelabuhanPelni) {

        $scope.DebarkasiArr = listPelabuhanPelni;
        $scope.embarView = "Embarkasi";
        $scope.debarView = "Debarkasi";

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
            if ($scope.Embar == $scope.Debar.originalObject.Kode) {
                $scope.errMsg = "Embarkasi Tidak Boleh Sama Dengan Debarkasi";
                return;
            }
            ReqJadwalPelniRef().$push({
                Embar: $scope.Embar,
                Debar: $scope.Debar.originalObject.Kode,
                CreatedAt: {
                    '.sv': 'timestamp'
                },
                CreatedBy: $rootScope.User.uid
            }).then(function(ref) {
                $state.transitionTo('app.invoicepelni.search.results', {
                    embar: $scope.Embar,
                    debar: $scope.Debar.originalObject.Kode
                });

            }, function(err) {
                $scope.errMsg = err;
            });

        }

        $scope.clearSearchPelni = function() {
            $scope.Embar = null;
            $scope.Debar = null;
            $state.transitionTo('app.invoicepelni.search')

        }
    }
]);

app.controller('SearchResultsTiketPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'ReqJadwalPelniRef', 'listJadwalPelni', 'HargaFac',
    function($scope, $rootScope, $stateParams, $state, ReqJadwalPelniRef, listJadwalPelni, HargaFac) {
        $scope.ListJadwal = listJadwalPelni;
        $scope.showPelayaran = false;
        $scope.getListKelas = function(input) {
            var kapal = input.Kapal;
            var pelayaran = input.Embar + '-' + input.EmbarCall + '-' + input.Debar + '-' + input.DebarCall;
            var ListKapal = HargaFac.pelni[kapal];

            if (!ListKapal) {
                $scope.showPelayaran = false;
                return null;
            } else {
                var ListKelas = ListKapal[pelayaran];
                if (!ListKelas) {
                    $scope.showPelayaran = false;
                    return null;
                }
                else{

                    $scope.showPelayaran = true;
                    return ListKelas;
                }


            }
        }

        $scope.getDayDateYear = function(input) {
            return moment(input, 'YYYYMMDDHHmm').format('dddd, DD MMMM YYYY HH:mm');
        };

        $scope.timeFromNow = function(input) {
            if (input) {
                return moment(input).fromNow();
            }else{
                return null;
            }

        };

        $scope.kapalSearch = function(idKapal) {
            ReqJadwalPelniRef().$push({
                Kapal: idKapal,
                CreatedAt: {
                    '.sv': 'timestamp'
                },
                CreatedBy: $rootScope.User.uid
            }).then(function(ref) {
                $state.transitionTo('app.invoicepelni.search.reskapal', {
                    embar: $stateParams.embar,
                    debar: $stateParams.debar,
                    idKapal: idKapal
                });

            }, function(err) {
                console.log(err);
            });

        }

        $scope.createInvoce = function(idJadwal, idKelas) {
            $state.transitionTo('app.invoicepelni.new', {
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
            if (input) {
                return moment(input).fromNow();
            }else{
                return null;
            }

        };

        $scope.createInvoce = function(idJadwal, idKelas) {
            $state.transitionTo('app.invoicepelni.new', {
                idJadwal: idJadwal,
                idKelas: idKelas
            });
        };
    }
]);
