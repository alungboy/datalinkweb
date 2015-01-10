'use strict';
app.controller('SearchTiketPelniCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 
    function($scope, $rootScope, $stateParams, $state) {
        

        $scope.DebarkasiArr = [
            {
                'nama' : 'Bitung',
                'kode' : '(113)'
            },
            {
                'nama' : 'Aceh',
                'kode' : '(001)'
            },
            {
                'nama' : 'Bau-Bau',
                'kode' : '(103)'
            }
        ];

        
    }
]);
