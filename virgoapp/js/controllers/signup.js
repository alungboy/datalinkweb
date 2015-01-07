'use strict';

function randomPhone() {
    var result = '';
    var chars = '123456789'
    var lengthRandom = 8;
    for (var i = lengthRandom; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return '08' + result;
}


// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', 'UserCompaniesRef', 'fbAuth', 'UserRef', 'CompanyRef', 'EmpsCompanyRef', 'fingersCompanyRef', 'AttsCompanyRef',
    function($scope, $http, $state, UserCompaniesRef, fbAuth, UserRef, CompanyRef, EmpsCompanyRef, fingersCompanyRef, AttsCompanyRef) {
        $scope.user = {};
        $scope.authError = null;


        var generateSampleData = function(compKey, adminName, adminEmail) {
            var empsRef = EmpsCompanyRef(compKey);
            var fingersRef = fingersCompanyRef(compKey);
            var attsRef = AttsCompanyRef(compKey);
            var dataEmps = {
                '1': {
                    Pin: 1,
                    EmpId: '1',
                    Name: 'System',
                    Pri: 14,
                    Passwd: '2346',
                    Card: '[a32bdd0000]',
                    Grp: 1,
                    Sex: 'Male',
                    Email: 'info@easytimeman.com',
                    Phone: randomPhone(),
                    dept: 'Main',
                    EmailRpt: false,
                    SmsRpt: false,
                    Finger: 2,
                    createdAt: {
                        '.sv': 'timestamp'
                    },
                    modifiedAt: {
                        '.sv': 'timestamp'
                    }

                },
                '2': {
                    Pin: 2,
                    EmpId: '2',
                    Name: adminName,
                    Pri: 4,
                    Passwd: chance.string({
                        length: 5,
                        pool: '123456789'
                    }),
                    Card: '[' + chance.string({
                        length: 10,
                        pool: '0123456789abcdef'
                    }) + ']',
                    Grp: chance.integer({
                        min: 1,
                        max: 4
                    }),
                    Sex: 'Male',
                    Email: adminEmail,
                    Phone: randomPhone(),
                    Dept: 'Main',
                    EmailRpt: false,
                    SmsRpt: false,
                    Finger: 2,
                    createdAt: {
                        '.sv': 'timestamp'
                    },
                    modifiedAt: {
                        '.sv': 'timestamp'
                    }
                }
            };

            for (var i = 3; i < 30; i++) {
                var pin = '' + i;
                dataEmps[pin] = {
                    Pin: pin,
                    EmpId: chance.ssn(),
                    Name: chance.name(),
                    Pri: 0,
                    Passwd: chance.string({
                        length: 5,
                        pool: '123456789'
                    }),
                    Card: '[' +
                        chance.string({
                            length: 10,
                            pool: '0123456789abcdef'
                        }) +
                        ']',
                    Grp: chance.integer({
                        min: 1,
                        max: 4
                    }),
                    Sex: chance.gender(),
                    Email: chance.email(),
                    Phone: randomPhone(),
                    Dept: 'Main',
                    Birthday: chance.birthday(),
                    EmailRpt: false,
                    SmsRpt: false,
                    Finger: 1,
                    createdAt: {
                        '.sv': 'timestamp'
                    },
                    modifiedAt: {
                        '.sv': 'timestamp'
                    }
                }

            }

            empsRef.$update(dataEmps);

            var dataFinger = {};

            for (var i = 1; i < 33; i++) {
                var md5dump = chance.string({
                    length: 32,
                    pool: '0123456789abcdefghijklmopqrstuvwzyz'
                });

                var md5dump2 = chance.string({
                    length: 32,
                    pool: '0123456789abcdefghijklmopqrstuvwzyz'
                });

                dataFinger[md5dump] = {
                    Pin: '' + i,
                    FID: 0,
                    TMP: 'ini isi data finger orang',
                    Hash: md5dump,
                    Size: chance.string({
                        length: 4,
                        pool: '123456789'
                    }),
                    Sn: '2360660200048',
                    createdAt: {
                        '.sv': 'timestamp'
                    },
                    modifiedAt: {
                        '.sv': 'timestamp'
                    }


                }

                dataFinger[md5dump2] = {
                    Pin: '' + i,
                    FID: 1,
                    TMP: 'ini isi data finger orang',
                    Hash: md5dump2,
                    Size: chance.string({
                        length: 4,
                        pool: '123456789'
                    }),
                    Sn: '5306863090023',
                    createdAt: {
                        '.sv': 'timestamp'
                    },
                    modifiedAt: {
                        '.sv': 'timestamp'
                    }


                }


            }

            fingersRef.$update(dataFinger);


            var dataAtts = {};

            for (var i = 3; i < 33; i++) {

                for (var j = 9; j < 11; j++) {

                    for (var k = 0; k < 30; k++) {


                        for (var l = 0; l < 2; l++) {


                            var dateDump = chance.date({
                                year: 2014,
                                month: j,
                                day: k + 1
                            });

                            var key = '' + '5306863090023' + '- ' + i + '-' + dateDump.valueOf();
                            dataAtts[key] = {
                                Sn: '5306863090023',
                                Pin: i,
                                Verified: 0,
                                Gmt: '+0800',
                                Calc: false,
                                Time: dateDump,
                                createdAt: {
                                    '.sv': 'timestamp'
                                },
                                modifiedAt: {
                                    '.sv': 'timestamp'
                                }
                            }



                        }

                        var dateDump2 = chance.date({
                            year: 2014,
                            month: j,
                            day: k + 1
                        });

                        var key = '' + '2360660200048' + '- ' + i + '-' + dateDump2.valueOf();
                        dataAtts[key] = {
                            Sn: '2360660200048',
                            Pin: i,
                            Verified: 0,
                            Gmt: '+0800',
                            Calc: false,
                            Time: dateDump,
                            createdAt: {
                                '.sv': 'timestamp'
                            },
                            modifiedAt: {
                                '.sv': 'timestamp'
                            }
                        }
                    }


                }

            }
            attsRef.$update(dataAtts);


        };


        $scope.signup = function() {
            e.preventDefault();

            $scope.authError = null;

            fbAuth.$createUser($scope.user.email, $scope.user.password).then(function() {
                return fbAuth.$authWithPassword({
                    email: $scope.user.email,
                    password: $scope.user.password
                });
            }).then(function(authData) {
                delete authData.expires;
                delete authData.token;
                delete authData.auth;
                delete authData.provider;

                authData.name = $scope.user.name;
                var userDb = UserRef(authData.uid);
                userDb.$update(authData);
                var userCompaniesDb = UserCompaniesRef(authData.uid);
                userCompaniesDb.$push({
                    role: 'admin',
                    name: $scope.user.companyName
                }).then(function(ref) {
                    var key = ref.key();
                    var companydb = CompanyRef(key);
                    var membersCompany = {};
                    membersCompany[authData.uid] = {
                        name: $scope.user.name,
                        role: 'admin'
                    };
                    companydb.$update({
                        name: $scope.user.companyName,
                        createdBy: authData.uid,
                        members: membersCompany
                    }).then(function(ref) {
                        var key = ref.key();
                        generateSampleData(key, $scope.user.name, $scope.user.email);
                        $state.go('app.dashboard-v1');
                    }, function(error) {
                        $scope.authError = error;
                    });
                }, function(error) {
                    $scope.authError = error;
                });


            }).catch(function(error) {
                $scope.authError = error;
            });


        };
    }
]);
