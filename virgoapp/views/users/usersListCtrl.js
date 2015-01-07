'use strict';
app.controller('UsersListCtrl', ['$scope', '$stateParams', '$state', 'members',
    function($scope, $stateParams, $state, members) {
        $scope.ListUsers = [];
        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.size);
            if ($scope.ListUsers.length >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.size);

            if ($scope.ListUsers.length >= paramSize) {

                $state.transitionTo('app.users.list', {
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
        $scope.ListUsers = members;

        $scope.Detail = function(selected) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
            $scope.user = selected;

        }
        $scope.toCreate = function(selected) {
            $scope.view = 'Create';
            $scope.breadcrumb.view = $scope.view;
            $scope.newUser = {};
        }

        // State View Create

        $scope.create = function() {
            var newKey = $scope.newUser.uid;
            var dbUsers = $scope.ListUser.$inst();
            dbUsers.$set(newKey, $scope.newDev).then(function(ref) {
                alert('berhasil ditambahkan ' + $scope.newDev.name);
                $scope.view = 'List';
                $scope.breadcrumb.view = $scope.view;
                $scope.newUser = {};
            }, function(error) {
                console.log("Error:", error);
            });

        }

        // State View Detail
        $scope.toList = function() {
            $scope.view = 'List';
            $scope.breadcrumb.view = $scope.view;
        };
        $scope.toEdit = function() {
            $scope.view = 'Edit';
            $scope.breadcrumb.view = $scope.view;
        };
        $scope.remove = function() {

            $scope.ListUsers.$remove($scope.dev).then(function(ref) {
                $scope.view = 'List';
                $scope.breadcrumb.view = $scope.view;

            }, function(err) {
                console.log("Error: ", err)
            });

        };

        // State View Edit
        $scope.toDetail = function() {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
        };

        $scope.update = function() {
            $scope.ListUsers.$save($scope.dev).then(function(ref) {
                $scope.view = 'Detail';
                $scope.breadcrumb.view = $scope.view;
            }, function(err) {
                console.log("Error: ", err)
            })
        };

    }
]);
