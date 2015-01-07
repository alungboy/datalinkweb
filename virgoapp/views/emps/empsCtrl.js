'use strict';
app.controller('EmpsCtrl', ['$scope', '$stateParams', '$state', 'comps',
    function($scope, $stateParams, $state, comps) {

        $scope.breadcrumb = {
            view: 'Pilih Unit'
        };
        $scope.compId = undefined;
        $scope.companies = comps;

       $scope.getCompanyName = function() {
            if ($stateParams.compId && $stateParams.compId.length > 0) {
                return $scope.companies[$stateParams.compId].Name;
            }
            return "";
        };


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


    }
]);
