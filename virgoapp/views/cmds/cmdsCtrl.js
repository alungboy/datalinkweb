'use strict';
app.controller('CmdsCtrl', ['$scope', '$stateParams', '$state', 'comps',
    function($scope, $stateParams, $state, comps) {

        $scope.breadcrumb = {
            view: 'Pilih Unit'
        };
        $scope.compId = undefined;
        $scope.companies = comps;

        $scope.isSelected = function(selectedId) {
            return selectedId == $stateParams.compId;
        };

        $scope.changeCompany = function(compKey) {
            if (!compKey || compKey === '') {
                return;
            } else {
                $state.transitionTo('app.emps.list', {
                    compId: compKey,
                    idx: '1',
                    size: '5'
                });
            }
        }

        $scope.changeCompany = function(compKey) {
            if (!compKey || compKey === '') {
                return;
            } else {
                $state.transitionTo('app.cmds.list', {
                    compId: compKey,
                    idx: '1',
                    size: '5'
                });
            }
        }
    }
]);
