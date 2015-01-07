'use strict';
app.controller('EmpsinListCtrl', ['$scope', '$stateParams', '$state', 'empsin', 'devs', 
    function($scope, $stateParams, $state, empsin, devs) {


        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };

        $scope.getDevName = function(input) {
            return devs[input].Name;
        };


        $scope.getPreName = function(Pre) {
            if (Pre == 1) {
                return 'Supervisor';
            }
            if (Pre == 14) {
                return 'Admin';
            }
            return 'User';
        };


        $scope.ListValue = [];
        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.size);
            if ($scope.ListValue.length >= paramSize) {
                return true;
            } else {
                return false;
            }

        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.size);

            if ($scope.ListValue.length >= paramSize) {

                $state.transitionTo('app.empsin.list', {
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

        $scope.ListValue = empsin;



    }
]);
