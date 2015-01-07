'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$rootScope', '$http', '$state', 'fbAuth', function($scope, $rootScope, $http, $state, fbAuth) {
    fbAuth.$unauth();
    $scope.user = null;
    $scope.authError = null;
    $scope.login = function(e) {
        e.preventDefault();
        $scope.authError = null;
        fbAuth.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        }).then(function(authData) {
            $scope.user = authData;
            $state.go('app.dashboard-v1');
        }).catch(function(error) {
            $scope.authError = error;
        });
    };
}]);
