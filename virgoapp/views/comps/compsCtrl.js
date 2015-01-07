'use strict';
app.controller('CompsCtrl', ['$scope', '$stateParams', '$state', 'comps', 'deps',
    function($scope, $stateParams, $state, comps, deps) {

        $scope.listCompanies = [];

        $scope.view = 'List';
        $scope.checkView = function(input) {
            return $scope.view == input;
        };

        // State View List

        $scope.listCompanies = comps;

        $scope.Detail = function(selectedDep) {
            $scope.view = 'Detail';

            $scope.comp = selectedDep;

        }
        $scope.toCreate = function(selectedDep) {
            $scope.view = 'Create';
            $scope.newDep = {};
        }

        // State View Detail
        $scope.toList = function() {
            $scope.view = 'List';
        };
        $scope.toEdit = function() {
            $scope.view = 'Edit';
        };

        // State View Edit
        $scope.toDetail = function() {
            $scope.view = 'Detail';
        };


        $scope.update = function() {
            $scope.listCompanies.$save($scope.comp).then(function(ref) {
                $scope.view = 'Detail';

            }, function(err) {
                console.log("Error: ", err)
            })
        };


        $scope.myMarkers = [];

 console.log(deps);
        $scope.mapOptions = {
            center: new google.maps.LatLng(-1.4061088354351468, 118.9599609375),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        navigator.geolocation.getCurrentPosition(success);

        function success(position) {

            console.log(position);
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            $scope.mapOptions = {
                center: new google.maps.LatLng(lat, lon),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        }

        $scope.addMarker = function($event, $params) {
            $scope.myMarkers.push(new google.maps.Marker({
                map: $scope.myMap,
                position: $params[0].latLng
            }));
        };

        $scope.setZoomMessage = function(zoom) {
            $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
            console.log(zoom, 'zoomed');
        };

        $scope.openMarkerInfo = function(marker) {
            $scope.currentMarker = marker;
            $scope.currentMarkerLat = marker.getPosition().lat();
            $scope.currentMarkerLng = marker.getPosition().lng();
            $scope.myInfoWindow.open($scope.myMap, marker);
        };

        $scope.setMarkerPosition = function(marker, lat, lng) {
            marker.setPosition(new google.maps.LatLng(lat, lng));
        };
    }
]);


app.directive('uiEvent', ['$parse',
    function($parse) {
        return function($scope, elm, attrs) {
            var events = $scope.$eval(attrs.uiEvent);
            angular.forEach(events, function(uiEvent, eventName) {
                var fn = $parse(uiEvent);
                elm.bind(eventName, function(evt) {
                    var params = Array.prototype.slice.call(arguments);
                    //Take out first paramater (event object);
                    params = params.splice(1);
                    fn($scope, {
                        $event: evt,
                        $params: params
                    });
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            });
        };
    }
]);
