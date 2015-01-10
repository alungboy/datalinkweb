'use strict';
app.controller('InvoicePelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state',
    function($scope, $rootScope, $stateParams, $state) {


        $scope.listPenumpang = [{
            Nama: '',
            Status: '',
            Umur: null,
            Harga: null
        }];
        $scope.newPemasan = {};
        $scope.newPenumpang = [];


        $scope.tambahPng = function() {
            $scope.listPenumpang.push({
                Nama: '',
                Status: '',
                Umur: null,
                Harga: null
            });
        };

        $scope.rmPng = function(key){
            $scope.listPenumpang.splice(key, 1);
        }

        $scope.lockInvoice = function() {
            $scope.lockform = true;
        }
        $scope.unlockInvoice = function() {
            $scope.lockform = false;
        }
    
        $scope.printInvoice = function() {
            console.log($scope.newPemasan);
            console.log($scope.listPenumpang);
        };

    }
]);
