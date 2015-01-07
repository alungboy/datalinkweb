'use strict';
app.controller('ExceptionCtrl', ['$scope', '$stateParams', '$state', 'comps',
    function($scope, $stateParams, $state, comps) {

        $scope.breadcrumb = {
            view: 'Pilih Unit'
        };
        $scope.compId = undefined;
        $scope.companies = comps;

        $scope.isSelected = function(selectedId) {
            return selectedId == $stateParams.compId;
        };

        $scope.getCompanyName = function() {
            for (var i = 0; i < comps.length; i++) {
                if (comps[i].$id === $stateParams.compId) {
                    return comps[i].Name;
                }
            }
        };

        $scope.changeCompany = function(selected) {
            if (!selected.$id || selected.$id === '') {
                return;
            } else {
                $state.transitionTo('app.exception.list', {
                    compId: selected.$id,
                    idx: '1',
                    size: '5'
                });
            }
        };


    }
]);
