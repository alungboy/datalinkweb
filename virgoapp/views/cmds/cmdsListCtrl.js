'use strict';
app.controller('CmdsListCtrl', ['$scope', '$stateParams', '$state', 'cmds', 'devs',
    function($scope, $stateParams, $state, cmds, devs) {

        $scope.timeFromNow = function(input) {
            return moment(input).fromNow();
        };

        $scope.devs = devs

        $scope.ListCmds = [];
        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.size);
            if ($scope.ListCmds.length >= paramSize) {
                return true;
            } else {
                return false;
            }

        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.size);

            if ($scope.ListCmds.length >= paramSize) {

                $state.transitionTo('app.cmds.list', {
                    compId: $stateParams.compId,
                    idx: '1',
                    size: paramSize + 5
                });
            }
        };

        $scope.view = 'List';
        $scope.breadcrumb.view = $scope.view;
        $scope.checkView = function(input) {
            return $scope.view == input;
        };

        $scope.compId = $stateParams.compId;
        $scope.idx = parseInt($stateParams.idx);
        $scope.size = parseInt($stateParams.size);


        // State View List

        $scope.ListCmds = cmds;

        $scope.resendCmd = function(cmd) {
            cmd.Sent = null;
            $scope.ListCmds.$save(cmd).then(function(ref) {
                cmd.Sent = false;
                cmd.Reply = false;
                cmd.Return = -1;
                $scope.ListCmds.$save(cmd)
            }, function(err) {
                console.log("Error: ", err)
            })

            return $scope.view == input;
        };
        $scope.showProcess = function(input) {

            if (input.Sent === false) {
                return 'Pending';
            }
            if (input.Sent === true && input.Reply === false) {
                return 'Waiting';
            }
            if (input.Reply === true && (input.Return == undefined || input.Return < 0)) {
                return 'Failed';
            }
            if (input.Reply === true && input.Return != undefined && input.Return >= 0) {
                return 'Success';
            }
            return 'Waiting';
        };


    }
]);
