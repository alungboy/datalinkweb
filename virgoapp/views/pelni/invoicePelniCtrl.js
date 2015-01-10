'use strict';
app.controller('InvoicePelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state',
    function($scope, $rootScope, $stateParams, $state) {


        $scope.totalPenumpang = [1];
        $scope.newPemasan = {};
        $scope.newPenumpang = [];
        $scope.total = 1;

        $scope.lockInvoice = function(){
            $scope.lockform = true;
        }
        $scope.unlockInvoice = function(){
            $scope.lockform = false;
        }
        $scope.addTotal = function() {
            $scope.totalPenumpang = [1];
            if ($scope.total > 2 && $scope.total < 11)  {
                for (var i = 2; $scope.total >= i; i++) {
                    
                    $scope.totalPenumpang.push(i);
                   
                }
               
            } else {
                
                 $scope.totalPenumpang = [1];
            }
        };

        $scope.printInvoice = function(){
            console.log($scope.newPemasan);
            console.log($scope.newPenumpang);
        };

    }
]);
