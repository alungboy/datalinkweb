'use strict';
app.controller('FingersinCtrl', ['$scope', '$stateParams', '$state', 'comps',
    function($scope, $stateParams, $state, comps) {

        $scope.breadcrumb = {
            view: 'Pilih Unit'
        };
        $scope.compId = undefined;
        $scope.companies = comps;

        $scope.getFingerName = function(val) {
            switch (val) {
                case 0:
                    return 'Jari Kelingking Kiri';
                    break;
                case 1:
                    return 'Jari Manis Kiri';
                    break;
                case 2:
                    return 'Jari Tengah Kiri';
                    break;
                case 3:
                    return 'Jari Telunjuk Kiri';
                    break;
                case 4:
                    return 'Jari Jompol Kiri';
                    break;
                case 5:
                    return 'Jari Jempol Kanan';
                    break;
                case 6:
                    return 'Jari Telunjuk Kanan';
                    break;
                case 7:
                    return 'Jari Tengah Kanan';
                    break;
                case 8:
                    return 'Jari Manis Kanan';
                    break;
                case 9:
                    return 'Jari Kelingking Kanan';
                    break;

                default:
                    return '';
                    break;
            }
        };
        $scope.isSelected = function(selectedId) {
            return selectedId == $stateParams.compId;
        };


        $scope.getCompanyName = function() {
            if ($stateParams.compId && $stateParams.compId.length > 0) {
                return $scope.companies[$stateParams.compId].Name;
            }
            return "";
        };

        $scope.changeCompany = function(compKey) {
            if (!compKey || compKey === '') {
                return;
            } else {
                $state.transitionTo('app.fingersin.list', {
                    compId: compKey,
                    idx: '1',
                    size: '5'
                });
            }
        }




    }
]);
