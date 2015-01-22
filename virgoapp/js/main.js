'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$translate', '$localStorage', '$window', 'UserObj', 'UsersObj',
        function($scope, $rootScope, $translate, $localStorage, $window, UserObj, UsersObj) {
            $rootScope.User = UserObj();
            $rootScope.Users = UsersObj();
            $scope.User = UserObj();
            $scope.Users = UsersObj();
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'VirgoTravel-App',
                version: '1.0.0',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 8,
                    navbarHeaderColor: 'bg-info dker',
                    navbarHeaderHide: false,
                    navbarCollapseColor: 'bg-info dker',
                    asideColor: 'bg-light dker b-r',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: true,
                    container: false
                }
            };
            
            // Moment Local
            moment.locale('id');

            // angular translate
            $scope.lang = {
                isopen: false
            };
            $scope.langs = {
                id_ID: 'Indonesia',
                en: 'English'
            };
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "Indonesia";
            $scope.setLang = function(langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

        }
    ]);
