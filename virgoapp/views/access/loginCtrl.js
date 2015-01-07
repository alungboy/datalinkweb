'use strict';

/* Controllers */
// signin controller
app.controller('LoginCtrl', ['$window', '$scope', '$rootScope', '$http', '$state', 'FbAuth', 'UserRef',
    function($window, $scope, $rootScope, $http, $state, FbAuth, UserRef) {
        FbAuth.$unauth();
        $scope.user = null;
        $scope.authError = null;
        $scope.loginFb = function(e) {
            e.preventDefault();
            $scope.authError = null;
            FbAuth.$authWithOAuthPopup("facebook", {
                scope: "email,public_profile"
            }).then(function(authData) {
                if (authData) {
                    delete authData.token;
                    delete authData.expires;
                    delete authData.facebook.accessToken;
                    UserRef(authData.uid).$update(authData);
                    $window.location.replace("./")
                }
            }).catch(function(error) {
                console.log(error);
                switch (error.code) {
                    case "INVALID_PASSWORD":
                        $scope.authError = "Email atau password salah!";
                        break;
                    case "INVALID_USER":
                        $scope.authError = "Email atau password salah!";
                        break;
                    default:
                        $scope.authError = error;
                        break;
                }


            });
        };
    }
]);
