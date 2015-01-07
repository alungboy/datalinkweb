'use strict';
app.controller('AttsListCtrl', ['$scope', '$stateParams', '$state', 'atts',
    function($scope, $stateParams, $state, atts) {


        $scope.ListKehadiran = [];
        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.size);
            if ($scope.ListKehadiran.length >= paramSize) {
                return true;
            } else {
                return false;            
            }

        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.size);

            if ($scope.ListKehadiran.length >= paramSize) {

                $state.transitionTo('app.atts.list', {
                    compId: $stateParams.compId,
                    idx: '1',
                    size: paramSize + 5
                });
            }
        };

        $scope.view = 'List';
        $scope.breadcrumb.view = $scope.view;
        $scope.checkView = function(input) {
            return $scope.view == input;
        };

        $scope.compId = $stateParams.compId;
        $scope.idx = parseInt($stateParams.idx);
        $scope.size = parseInt($stateParams.size);


        // State View List
        $scope.test = "Hello Dari List Controller";
        $scope.ListKehadiran = atts;

        $scope.Detail = function(selectedDep) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;

            $scope.att = selectedDep;

        }

        // State View Detail
        $scope.toList = function() {
            $scope.view = 'List';
            $scope.breadcrumb.view = $scope.view;
        };

    }
]);
