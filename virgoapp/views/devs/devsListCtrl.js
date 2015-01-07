'use strict';
app.controller('DevsListCtrl', ['$scope', '$stateParams', '$state', 'devs',
    function($scope, $stateParams, $state, devs) {
        $scope.isOnline = function(input){
            var sum = Date.now() - input;
            if (sum < 900000) {
                return true;
            }
            return false;
        }
        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };
        $scope.getTimeZone = function(input) {
            if (input == '+07:00') {
                return 'WIB';
            }
            if (input == '+08:00') {
                return 'WITA';
            }
            if (input == '+09:00') {
                return 'WIT';
            }
            return '';
        };


        $scope.ListMesin = [];
       
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
        $scope.ListMesin = devs;


        $scope.Detail = function(selectedDev) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
            $scope.dev = selectedDev;

        }
        $scope.toCreate = function(selectedDev) {
            $scope.view = 'Create';
            $scope.breadcrumb.view = $scope.view;
            $scope.newDev = {};
        }

        // State View Create

        $scope.create = function() {
            var newKey = $scope.newDev.sn;
            var dbDevs = $scope.ListMesin.$inst();
            dbDevs.$set(newKey, $scope.newDev).then(function(ref) {
                alert('berhasil ditambahkan ' + $scope.newDev.name);
                $scope.view = 'List';
                $scope.breadcrumb.view = $scope.view;
                $scope.newDev = {};
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

            $scope.ListMesin.$remove($scope.dev).then(function(ref) {
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
            $scope.ListMesin.$save($scope.dev).then(function(ref) {
                $scope.view = 'Detail';
                $scope.breadcrumb.view = $scope.view;
            }, function(err) {
                console.log("Error: ", err)
            })
        };



    }
]);
