'use strict';
app.controller('DeptsListCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'deps', 'sches', 'CompanyIdCounterRef',
    function($scope, $rootScope, $stateParams, $state, deps, sches, CompanyIdCounterRef) {


        $scope.ListDepartemen = [];
        $scope.view = 'List';
        $scope.breadcrumb.view = $scope.view;

        $scope.checkView = function(input) {
            return $scope.view == input;
        };

        // Jadwal Helper
        $scope.ListJadwal = sches;
        $scope.getScheName = function(input){
            return sches[input].Name;
        };

        $scope.compId = $stateParams.compId;
        $scope.idx = parseInt($stateParams.idx);
        $scope.size = parseInt($stateParams.size);


        // State View List

        $scope.ListDepartemen = deps;

        $scope.Detail = function(selectedDep) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
            $scope.dep = selectedDep;

        }
        $scope.toCreate = function(selectedDep) {
            $scope.view = 'Create';
            $scope.breadcrumb.view = $scope.view;
            $scope.newDep = {};
        }

        // State View Create

        $scope.create = function() {

            var DeptCountRef = CompanyIdCounterRef($stateParams.compId, "DepatId");

            DeptCountRef.$transaction(function(currentCount) {
                if (!currentCount) {
                    return 1;
                }
                if (currentCount < 1) {
                    return;
                };
                return currentCount + 1;
            }).then(function(snapshot) {
                if (snapshot === null) {
                    alert("Gagal menambahakn Departemen!");
                } else {
                    var newKey = snapshot.val();
                    var dbDeps = $scope.ListDepartemen.$inst();
                    $scope.newDep.Sche = parseInt($scope.newDep.Sche);
                    $scope.newDep.UpdatedAt = {
                        '.sv': 'timestamp'
                    };
                    $scope.newDep.UpdatedBy = $rootScope.User.$id;
                    dbDeps.$set('' + newKey, $scope.newDep).then(function(ref) {
                        alert('berhasil ditambahkan Departemen ' + $scope.newDep.Name);
                        $scope.view = 'List';
                        $scope.breadcrumb.view = $scope.view;
                        $scope.newDep = {};
                    }, function(error) {
                        console.log("Error:", error);
                    });
                }
            }, function(error) {
                alert(error);
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

            $scope.ListDepartemen.$remove($scope.dep).then(function(ref) {
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
            $scope.dep.Sche = parseInt($scope.dep.Sche);
            $scope.dep.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.dep.UpdatedBy = $rootScope.User.$id;
            $scope.ListDepartemen.$save($scope.dep).then(function(ref) {
                $scope.view = 'Detail';
                $scope.breadcrumb.view = $scope.view;
            }, function(err) {
                console.log("Error: ", err)
            })
        };



    }
]);
