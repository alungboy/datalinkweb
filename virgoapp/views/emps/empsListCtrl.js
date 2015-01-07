'use strict';
app.controller('EmpsListCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$modal', '$log', 'emps', 'deps', 'devs', 'comps', 'CompanyIdCounterRef',
    function($scope, $rootScope, $stateParams, $state, $modal, $log, emps, deps, devs, comps, CompanyIdCounterRef) {

        $scope.countFinger = function(fingers) {
            if (fingers) {
                return Object.keys(fingers).length;
            } else {
                return 0;
            }

        };
        // Departemen Helper
        $scope.ListDepartemen = deps;
        $scope.CompanyName = comps[$stateParams.compId].Name;

        $scope.getPreName = function(Pre) {
            if (Pre == 1) {
                return 'Supervisor';
            }
            if (Pre == 14) {
                return 'Admin';
            }
            return 'User';
        };

        $scope.getSex = function(val) {
            if (val == 'm') {
                return 'Pria';
            }

            if (val == 'f') {
                return 'Wanita';
            }
            return '';
        };

        $scope.ListPegawai = [];
        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.size);
            if ($scope.ListPegawai.length >= paramSize) {
                return true;
            } else {
                return false;
            }

        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.size);

            if ($scope.ListPegawai.length >= paramSize) {

                $state.transitionTo('app.emps.list', {
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

        $scope.ListPegawai = emps;

        $scope.Detail = function(selectedEmp) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
            $scope.emp = selectedEmp;
        }
        $scope.toCreate = function(selectedEmp) {
            $scope.view = 'Create';
            $scope.breadcrumb.view = $scope.view;
            $scope.newEmp = {};
        }

        // State View Create

        $scope.create = function() {

            var PinCountRef = CompanyIdCounterRef($stateParams.compId, "EmpPin");

            PinCountRef.$transaction(function(currentCount) {
                if (!currentCount) {
                    return 1;
                }
                if (currentCount < 1) {
                    return;
                };
                return currentCount + 1;
            }).then(function(snapshot) {
                if (snapshot === null) {
                    alert("Gagal menambahakn pegawai!");
                } else {
                    var newKey = snapshot.val();
                    $scope.newEmp.Company = $scope.compId;
                    $scope.newEmp.Sn = "";
                    $scope.newEmp.Grp = parseInt($scope.newEmp.Grp);
                    $scope.newEmp.Card = "0000000000";
                    $scope.newEmp.Passwd = "";
                    $scope.newEmp.Pri = 0;
                    $scope.newEmp.Tz = "0000000000000000";
                    $scope.newEmp.Active = true;
                    $scope.newEmp.UpdatedAt = {
                        '.sv': 'timestamp'
                    };
                    $scope.newEmp.Sche = $scope.ListDepartemen[$scope.newEmp.Grp].Sche;
                    $scope.newEmp.UpdatedBy = $rootScope.User.$id;
                    $scope.newEmp.Pin = newKey;
                    $scope.newEmp.DeptName = $scope.ListDepartemen[$scope.newEmp.Grp].Name;

                    var dbEmps = $scope.ListPegawai.$inst();
                    dbEmps.$set('' + newKey, $scope.newEmp).then(function(ref) {
                        alert('berhasil ditambahkan ' + $scope.newEmp.Name);
                        $scope.view = 'List';
                        $scope.breadcrumb.view = $scope.view;
                        $scope.newEmp = {};
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
        $scope.toMove = function() {
            $scope.view = 'Move';
            $scope.breadcrumb.view = $scope.view;
        };
        $scope.remove = function() {

            $scope.ListPegawai.$remove($scope.emp).then(function(ref) {
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
            $scope.emp.UpdatedAt = {
                '.sv': 'timestamp'
            };

            $scope.emp.Sche = $scope.ListDepartemen[$scope.emp.Grp].Sche;
            $scope.emp.Grp = parseInt($scope.emp.Grp);
            $scope.emp.Company = $scope.compId;
            $scope.emp.UpdatedBy = $rootScope.User.$id;
            $scope.emp.Pri = parseInt($scope.emp.Pri);
            $scope.emp.DeptName = $scope.ListDepartemen[$scope.emp.Grp].Name;
            $scope.emp.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.emp.UpdatedBy = $rootScope.User.$id;
            $scope.ListPegawai.$save($scope.emp).then(function(ref) {
                $scope.view = 'Detail';
                $scope.breadcrumb.view = 'Detail';

            }, function(err) {
                console.log("Error: ", err)
            })
        };

        // Modal
        $scope.open = function(selected) {
            var passItem = {
                Selected: selected,
                CompName: $scope.CompanyName,
                CompId: $scope.compId,
                Devs: devs,
            };
            var modalInstance = $modal.open({
                templateUrl: 'modalemps.html',
                controller: 'EmpsModalCtrl',
                size: 'md',
                resolve: {
                    item: function() {
                        return passItem;
                    }
                }

            });
            modalInstance.result.then(function(selectedItem) {}, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // Modal Move
        $scope.moveEmp = function(selected) {
            var passItem = {
                Selected: selected,
                CompId: $scope.compId,
                Comps: comps,
                Deps: deps,
            };
            
            var modalInstance = $modal.open({
                templateUrl: 'modalempsmove.html',
                controller: 'EmpsModalMoveCtrl',
                size: 'md',
                resolve: {
                    item: function() {
                        return passItem;
                    }
                }

            });
            modalInstance.result.then(function(selectedItem) {}, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }
]);

app.controller('EmpsModalCtrl', ['$scope', '$modalInstance', 'item', 'CmdsCompanyDetailRef',
    function($scope, $modalInstance, item, CmdsCompanyDetailRef) {
        $scope.Value = item.Selected;
        $scope.Devs = item.Devs;
        $scope.DeptName = item.DeptName;
        $scope.CompName = item.CompName;
        $scope.CompId = item.CompId;

        $scope.disabledFinger = function(id) {

            if (id != undefined && $scope.Value.Fingers[parseInt(id)]) {
                return true;
            }

            if (id != undefined && $scope.Value.Fingers.length == (parseInt(id) + 1)) {
                return true;
            }

            return false;
        }
        $scope.getFinger = function(fid, sn) {

            if (!sn) {
                alert("Mohon pilih mesin!");
                return
            }


            var sendCmd = {
                Cmd: "ENROLL_FP PIN=" + $scope.Value.Pin + "\tFID=" + fid + "\tRETRY=3\tOVERWRITE=1",
                CmdReply: "",
                Company: $scope.CompId,
                CreatedAt: {
                    '.sv': 'timestamp'
                },
                DataReply: "",
                Note: "Ambil sample sidik jari pegawai no." + $scope.Value.Pin + " " + $scope.Value.Name + "/" + $scope.Value.EmpId + " jari " + $scope.getFingerName(fid) + "ke mesin",
                Reply: false,
                Sent: false,
                Sn: sn,
                Title: "Ambil sample sidik",
                UpdatedAt: {
                    '.sv': 'timestamp'
                }
            }

            var childKey = 'fid' + sn + '-' + $scope.Value.Pin + '-' + fid;

            CmdsCompanyDetailRef($scope.CompId, childKey).$update(sendCmd).then(function(ref) {
                alert('Ambil Sidik ' + $scope.getFingerName(fid));
            }, function(error) {
                console.log("Error:", error);
            });

        };




        $scope.getFingerName = function(val) {
            switch (val) {
                case 0:
                    return 'Jari Kelingking Kiri';
                    break;
                case 1:
                    return 'Jari Manis Kiri';
                    break;
                case 2:
                    return 'Jari Tengah Kiri';
                    break;
                case 3:
                    return 'Jari Telunjuk Kiri';
                    break;
                case 4:
                    return 'Jari Jompol Kiri';
                    break;
                case 5:
                    return 'Jari Jempol Kanan';
                    break;
                case 6:
                    return 'Jari Telunjuk Kanan';
                    break;
                case 7:
                    return 'Jari Tengah Kanan';
                    break;
                case 8:
                    return 'Jari Manis Kanan';
                    break;
                case 9:
                    return 'Jari Kelingking Kanan';
                    break;

                default:
                    return '';
                    break;
            }
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

app.controller('EmpsModalMoveCtrl', ['$scope', '$modalInstance', 'item', 'CmdsCompanyDetailRef',
    function($scope, $modalInstance, item, CmdsCompanyDetailRef) {
        $scope.Value = item.Selected;
        $scope.Devs = item.Devs;
        $scope.DeptName = item.DeptName;
        $scope.CompName = item.CompName;
        $scope.CompId = item.CompId;

        $scope.disabledFinger = function(id) {

            if (id != undefined && $scope.Value.Fingers[parseInt(id)]) {
                return true;
            }

            if (id != undefined && $scope.Value.Fingers.length == (parseInt(id) + 1)) {
                return true;
            }

            return false;
        }
        $scope.getFinger = function(fid, sn) {

            if (!sn) {
                alert("Mohon pilih mesin!");
                return
            }


            var sendCmd = {
                Cmd: "ENROLL_FP PIN=" + $scope.Value.Pin + "\tFID=" + fid + "\tRETRY=3\tOVERWRITE=1",
                CmdReply: "",
                Company: $scope.CompId,
                CreatedAt: {
                    '.sv': 'timestamp'
                },
                DataReply: "",
                Note: "Ambil sample sidik jari pegawai no." + $scope.Value.Pin + " " + $scope.Value.Name + "/" + $scope.Value.EmpId + " jari " + $scope.getFingerName(fid) + "ke mesin",
                Reply: false,
                Sent: false,
                Sn: sn,
                Title: "Ambil sample sidik",
                UpdatedAt: {
                    '.sv': 'timestamp'
                }
            }

            var childKey = 'fid' + sn + '-' + $scope.Value.Pin + '-' + fid;

            CmdsCompanyDetailRef($scope.CompId, childKey).$update(sendCmd).then(function(ref) {
                alert('Ambil Sidik ' + $scope.getFingerName(fid));
            }, function(error) {
                console.log("Error:", error);
            });

        };




        $scope.getFingerName = function(val) {
            switch (val) {
                case 0:
                    return 'Jari Kelingking Kiri';
                    break;
                case 1:
                    return 'Jari Manis Kiri';
                    break;
                case 2:
                    return 'Jari Tengah Kiri';
                    break;
                case 3:
                    return 'Jari Telunjuk Kiri';
                    break;
                case 4:
                    return 'Jari Jompol Kiri';
                    break;
                case 5:
                    return 'Jari Jempol Kanan';
                    break;
                case 6:
                    return 'Jari Telunjuk Kanan';
                    break;
                case 7:
                    return 'Jari Tengah Kanan';
                    break;
                case 8:
                    return 'Jari Manis Kanan';
                    break;
                case 9:
                    return 'Jari Kelingking Kanan';
                    break;

                default:
                    return '';
                    break;
            }
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);