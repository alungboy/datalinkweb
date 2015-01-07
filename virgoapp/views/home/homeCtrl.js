'use strict';

/* Controllers */

app
    .controller('HomeCtrl', ['$scope', function($scope) {


        $scope.d3 = [{
            label: " Masuk",
            data: 60
        }, {
            label: "Tidak Masuk",
            data: 10
        }, {
            label: "Sakit",
            data: 10
        }, {
            label: "Ijin",
            data: 10
        }, {
            label: "Tugas Luar",
            data: 10
        }];


    }]);
