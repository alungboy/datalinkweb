'use strict';
app.controller('SchesListCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'sches', 'CompanyIdCounterRef',
    function($scope, $rootScope, $stateParams, $state, sches, CompanyIdCounterRef) {

        $scope.ListJadwal = [];
        $scope.ListJadwal = sches;
       
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


        $scope.Detail = function(selectedSche) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
            $scope.selectedSche = selectedSche;

        }
        $scope.toCreate = function() {
            $scope.view = 'Create';
            $scope.breadcrumb.view = $scope.view;
            $scope.newSche = {
                Name: 'Nama Jadwal',
                Note: 'Catatan'
            };
            $scope.newSche[1] = {
                Active: true,
                Open: 60,
                Close: 59,
                StartWork: '08:00:00',
                EndWork: '17:00:00',
                IsOverTime: true,
                OverTime: '18:00:00',
                EndOverTime: '23:00:00',
            };
            $scope.newSche[2] = {
                Active: true,
                Open: 60,
                Close: 59,
                StartWork: '08:00:00',
                EndWork: '17:00:00',
                IsOverTime: true,
                OverTime: '18:00:00',
                EndOverTime: '23:00:00',
            };
            $scope.newSche[3] = {
                Active: true,
                Open: 60,
                Close: 59,
                StartWork: '08:00:00',
                EndWork: '17:00:00',
                IsOverTime: true,
                OverTime: '18:00:00',
                EndOverTime: '23:00:00',
            };
            $scope.newSche[4] = {
                Active: true,
                Open: 60,
                Close: 59,
                StartWork: '08:00:00',
                EndWork: '17:00:00',
                IsOverTime: true,
                OverTime: '18:00:00',
                EndOverTime: '23:00:00',
            };
            $scope.newSche[5] = {
                Active: true,
                Open: 60,
                Close: 59,
                StartWork: '08:00:00',
                EndWork: '17:00:00',
                IsOverTime: true,
                OverTime: '18:00:00',
                EndOverTime: '23:00:00',
            };
            $scope.newSche[6] = {
                Active: false,
                Open: 60,
                Close: 59,
                StartWork: '08:00:00',
                EndWork: '17:00:00',
                IsOverTime: true,
                OverTime: '18:00:00',
                EndOverTime: '23:00:00',
            };
            $scope.newSche[7] = {
                Active: false,
                Open: 60,
                Close: 59,
                StartWork: '08:00:00',
                EndWork: '17:00:00',
                IsOverTime: true,
                OverTime: '18:00:00',
                EndOverTime: '23:00:00',
            };

        }

        // State View Create

        $scope.create = function() {
            var ScheCountRef = CompanyIdCounterRef($stateParams.compId, "ScheId");

            ScheCountRef.$transaction(function(currentCount) {
                if (!currentCount) {
                    return 1;
                }
                if (currentCount < 1) {
                    return;
                };
                return currentCount + 1;
            }).then(function(snapshot) {
                if (snapshot === null) {
                    alert("Gagal menambahakn Jadwal!");
                } else {
                    var newKey = snapshot.val();
                    var dbSches = $scope.ListJadwal.$inst();
                    $scope.newSche.UpdatedAt = {
                        '.sv': 'timestamp'
                    };
                    $scope.newSche.UpdatedBy = $rootScope.User.$id;
                    dbSches.$set('' + newKey, $scope.newSche).then(function(ref) {
                        alert('berhasil ditambahkan jadwal ' + $scope.newSche.Name);
                        $scope.view = 'List';
                        $scope.breadcrumb.view = $scope.view;
                        $scope.newSche = {};
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

            $scope.ListJadwal.$remove($scope.dep).then(function(ref) {
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
            $scope.selectedSche.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.selectedSche.UpdatedBy = $rootScope.User.$id;
            $scope.ListJadwal.$save($scope.selectedSche).then(function(ref) {
                $scope.view = 'Detail';
                $scope.breadcrumb.view = $scope.view;

            }, function(err) {
                console.log("Error: ", err)
            })

        };



    }
]);
