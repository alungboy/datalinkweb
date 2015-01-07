'use strict';
app.controller('ExceptionListCtrl', ['$scope', '$stateParams', '$state',
    function($scope, $stateParams, $state) {


        $scope.view = 'List';
        $scope.breadcrumb.view = $scope.view;
        $scope.checkView = function(input) {
            return $scope.view == input;
        };


        // State View List
        $scope.Detail = function(selectedEmp) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;


        }
        $scope.toCreate = function(selectedEmp) {
            $scope.view = 'Create';
            $scope.breadcrumb.view = $scope.view;
        }

        // State View Create



        // State View Detail
        $scope.toList = function() {
            $scope.view = 'List';
            $scope.breadcrumb.view = $scope.view;
        };
        $scope.toEdit = function() {
            $scope.view = 'Edit';
            $scope.breadcrumb.view = $scope.view;
        };


        // State View Edit
        $scope.toDetail = function() {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
        };






    }
]);
