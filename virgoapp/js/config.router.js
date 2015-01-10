'use strict';

/**
 * Config for the router
 */
 
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', 'FbAuth', 'UserObj',
            function($rootScope, $state, $stateParams, FbAuth, UserObj) {

                $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                    if (error === "AUTH_REQUIRED") {
                        $state.go("access.login");
                        event.preventDefault();
                    }
                });


                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .when('', '/app/home')
                    .when('/', '/app/home')
                    .otherwise('/access/404');

                $stateProvider

                // Access
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'views/access/login.html',
                        controller: 'LoginCtrl',
                        resolve: {

                        }
                    })

                .state('access.404', {
                    url: '/404',
                    templateUrl: 'views/access/page_404.html'
                })

                // Print
                .state('printinvoicepelni', {
                    url: '/printinvoicepelni/:noInvoice',
                    templateUrl: 'views/print/printinvoicepelni.html',
                    // controller: 'PrintInvoicePelniCtrl'
                })

                // App
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'views/app.html',
                    resolve: {
                        "currentAuth": ["FbAuth", function(FbAuth) {
                            return FbAuth.$requireAuth();
                        }]
                    }

                })


                // Home
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeCtrl',

                })

                // TIKET PELNI
                .state('app.pelni', {
                    abstract: true,
                    url: '/pelni',
                    template: '<div class="wrapper" style="padding:0px;" ui-view></div>',

                })
                
                // STATE STOCK TIKET
                .state('app.pelni.stocktiket', {
                    url: '/stocktiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/stocktiket.html',
                    controller: 'StockTiketPelniCtrl',
                    resolve: {
                        tiketBaik: ['$stateParams', 'TiketPelniBaikArr',
                            function($stateParams, TiketPelniBaikArr) {
                                return TiketPelniBaikArr($stateParams.startDate, parseInt($stateParams.pageSize), $stateParams.asc)
                                    .$loaded();
                            }
                        ],
                    }

                })

                // STATE SEARCH JADWAL (INVOICE)
                .state('app.pelni.search', {
                    url: '/search',
                    templateUrl: 'views/pelni/search.html',
                    controller: 'InvoicePelniCtrl',
  

                })

                // STATE INVOICE
                .state('app.pelni.invoice', {
                    url: '/invoice/:idJadwal/:kelas',
                    templateUrl: 'views/pelni/invoice.html',
                    controller: 'InvoicePelniCtrl'
  

                })

                // STATE ISSUED
                .state('app.pelni.issuedtiket', {
                    url: '/issuedtiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/issuedtiket.html',
                    controller: 'IssuedTiketPelniCtrl',
                    resolve: {
                        tiketIssued: ['$stateParams', 'TiketPelniIssuedArr',
                            function($stateParams, TiketPelniIssuedArr) {
                                return TiketPelniIssuedArr($stateParams.startDate, parseInt($stateParams.pageSize), $stateParams.asc)
                                    .$loaded();
                            }
                        ],
                    }

                })

                // STATE PRINT
                .state('app.pelni.printtiket', {
                    url: '/printtiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/printtiket.html',
                    controller: 'PrintTiketPelniCtrl',
                    resolve: {
                        tiketPrinted: ['$stateParams', 'TiketPelniPrintedArr',
                            function($stateParams, TiketPelniPrintedArr) {
                                return TiketPelniPrintedArr($stateParams.startDate, parseInt($stateParams.pageSize), $stateParams.asc)
                                    .$loaded();
                            }
                        ],
                    }

                })

                // STATE TIKET RUSAK
                .state('app.pelni.rusaktiket', {
                    url: '/rusaktiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/rusaktiket.html',
                    controller: 'RusakTiketPelniCtrl',
                    resolve: {
                        tiketIssued: ['$stateParams', 'TiketPelniIssuedArr',
                            function($stateParams, TiketPelniIssuedArr) {
                                return TiketPelniIssuedArr($stateParams.startDate, parseInt($stateParams.pageSize), $stateParams.asc)
                                    .$loaded();
                            }
                        ],
                    }

                })

                // STATE TIKET BATAL
                .state('app.pelni.bataltiket', {
                    url: '/bataltiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/bataltiket.html',
                    controller: 'BatalTiketPelniCtrl',
                    resolve: {
                        tiketIssued: ['$stateParams', 'TiketPelniIssuedArr',
                            function($stateParams, TiketPelniIssuedArr) {
                                return TiketPelniIssuedArr($stateParams.startDate, parseInt($stateParams.pageSize), $stateParams.asc)
                                    .$loaded();
                            }
                        ],
                    }

                })

                // STATE TIKET HILANG
                .state('app.pelni.hilangtiket', {
                    url: '/hilangtiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/hilangtiket.html',
                    controller: 'HilangTiketPelniCtrl',
                    resolve: {
                        tiketIssued: ['$stateParams', 'TiketPelniIssuedArr',
                            function($stateParams, TiketPelniIssuedArr) {
                                return TiketPelniIssuedArr($stateParams.startDate, parseInt($stateParams.pageSize), $stateParams.asc)
                                    .$loaded();
                            }
                        ],
                    }

                })

                // // Dashboard
                // .state('app.dashboard', {
                //     url: '/dashboard',
                //     templateUrl: 'views/dashboard/dashboard.html',
                //     controller: 'DashboardCtrl',
                // })

                // // Map
                // .state('app.map', {
                //     url: '/map',
                //     templateUrl: 'views/map/map.html',
                //     controller: 'MapCtrl',
                // })

                // // REKAP HARIAN
                // .state('app.reportday', {
                //         url: '/reportday/:compId',
                //         templateUrl: 'views/report/reportday.html',
                //         controller: 'ReportDayCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.reportday.list', {
                //         url: '/list',
                //         templateUrl: 'views/report/reportday-list.html',
                //         controller: 'ReportDayListCtrl'
                //     })

                // // REKAP BULANAN
                // .state('app.reportmonth', {
                //         url: '/reportmonth/:compId',
                //         templateUrl: 'views/report/reportmonth.html',
                //         controller: 'ReportMonthCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.reportmonth.list', {
                //         url: '/list',
                //         templateUrl: 'views/report/reportmonth-list.html',
                //         controller: 'ReportMonthListCtrl'
                //     })

                // // REKAP PEGAWAI
                // .state('app.reportemp', {
                //         url: '/reportemp/:compId',
                //         templateUrl: 'views/report/reportemp.html',
                //         controller: 'ReportEmpCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.reportemp.list', {
                //         url: '/list',
                //         templateUrl: 'views/report/reportemp-list.html',
                //         controller: 'ReportEmpListCtrl'
                //     })

                // // PRINT
                // .state('print', {
                //         url: '/print',
                //         template: '<div ui-view class="fade-in-up"></div>',
                //         abstract: true,
                //         resolve: {

                //             "currentAuth": ["FbAuth", function(FbAuth) {
                //                 return FbAuth.$requireAuth();
                //             }]
                //         }
                //     })
                //     .state('print.rekapharian', {
                //         url: '/rekapharian',
                //         templateUrl: 'views/print/rekapharian.html'
                //     })
                //     .state('print.rekapbulanan', {
                //         url: '/rekapbulanan',
                //         templateUrl: 'views/print/rekapbulanan.html'
                //     })
                //     .state('print.rekappegawai', {
                //         url: '/rekappegawai',
                //         templateUrl: 'views/print/rekappegawai.html'
                //     })


                // // Kehadiran
                // .state('app.atts', {
                //         url: '/atts/:compId',
                //         templateUrl: 'views/atts/atts.html',
                //         controller: 'AttsCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.atts.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/atts/atts-list.html',
                //         controller: 'AttsListCtrl',
                //         resolve: {
                //             atts: ['$stateParams', 'AttsCompanyObj',
                //                 function($stateParams, AttsCompanyObj) {
                //                     return AttsCompanyObj($stateParams.compId, parseInt($stateParams.idx), parseInt($stateParams.size))
                //                         .$loaded();
                //                 }
                //             ],
                //         }
                //     })


                // // Pegawai
                // .state('app.emps', {
                //         url: '/emps/:compId',
                //         templateUrl: 'views/emps/emps.html',
                //         controller: 'EmpsCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }

                //     })
                //     .state('app.emps.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/emps/emps-list.html',
                //         controller: 'EmpsListCtrl',
                //         resolve: {
                //             emps: ['$stateParams', 'EmpsCompanyArr',
                //                 function($stateParams, EmpsCompanyArr) {
                //                     return EmpsCompanyArr($stateParams.compId, parseInt($stateParams.idx), parseInt($stateParams.size))
                //                         .$loaded();
                //                 }
                //             ],
                //             deps: ['$stateParams', 'DepartCompanyObj',
                //                 function($stateParams, DepartCompanyObj) {
                //                     return DepartCompanyObj($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ],
                //             devs: ['$stateParams', 'DevicesCompanyObj',
                //                 function($stateParams, DevicesCompanyObj) {
                //                     return DevicesCompanyObj($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ],
                //         }
                //     })

                // // Ijin
                // .state('app.exception', {
                //         url: '/exception/:compId',
                //         templateUrl: 'views/exception/exception.html',
                //         controller: 'ExceptionCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.exception.list', {
                //         url: '/list',
                //         templateUrl: 'views/exception/exception-list.html',
                //         controller: 'ExceptionListCtrl'
                //     })

                // // Jadwal
                // .state('app.sches', {
                //         url: '/sches/:compId',
                //         templateUrl: 'views/sches/sches.html',
                //         controller: 'SchesCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.sches.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/sches/sches-list.html',
                //         controller: 'SchesListCtrl',
                //         resolve: {
                //             sches: ['$stateParams', 'SchesCompanyArr',
                //                 function($stateParams, SchesCompanyArr) {
                //                     return SchesCompanyArr($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ],
                //         }
                //     })

                // // LIBUR
                // .state('app.dayoff', {
                //     url: '/dayoff',
                //     templateUrl: 'views/dayoff/dayoff.html',
                //     controller: 'DayOffCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad', 'uiLoad',
                //             function($ocLazyLoad, uiLoad) {
                //                 return uiLoad.load(
                //                     ['vendor/jquery/fullcalendar/fullcalendar.css',
                //                         'vendor/jquery/fullcalendar/theme.css',
                //                         'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                //                         'vendor/jquery/fullcalendar/fullcalendar.min.js'
                //                     ]
                //                 ).then(
                //                     function() {
                //                         return $ocLazyLoad.load('ui.calendar');
                //                     }
                //                 )
                //             }
                //         ]
                //     }
                // })

                // // Perusahaan
                // .state('app.comps', {
                //     url: '/comps',
                //     templateUrl: 'views/comps/comps.html',
                //     controller: 'CompsCtrl',
                //     resolve: {
                //         comps: ['UserCompaniesObj',
                //             function(UserCompaniesObj) {
                //                 return UserCompaniesObj().$loaded();
                //             }
                //         ],
                //         deps: ['uiLoad',
                //             function(uiLoad) {
                //                 return uiLoad.load([
                //                     'js/app/map/load-google-maps.js',
                //                     'js/app/map/ui-map.js'
                //                 ]).then(
                //                     function() {
                //                         return loadGoogleMaps();
                //                     }
                //                 );
                //             }
                //         ]
                //     }
                // })


                // // Departemen
                // .state('app.depts', {
                //         url: '/depts/:compId',
                //         templateUrl: 'views/depts/depts.html',
                //         controller: 'DeptsCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.depts.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/depts/depts-list.html',
                //         controller: 'DeptsListCtrl',
                //         resolve: {
                //             deps: ['$stateParams', 'DepartCompanyArr',
                //                 function($stateParams, DepartCompanyArr) {
                //                     return DepartCompanyArr($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ],
                //             sches: ['$stateParams', 'SchesCompanyObj',
                //                 function($stateParams, SchesCompanyObj) {
                //                     return SchesCompanyObj($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ],
                //         }
                //     })

                // // Mesin
                // .state('app.devs', {
                //         url: '/devs/:compId',
                //         templateUrl: 'views/devs/devs.html',
                //         controller: 'DevsCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.devs.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/devs/devs-list.html',
                //         controller: 'DevsListCtrl',
                //         resolve: {
                //             devs: ['$stateParams', 'DevicesCompanyObj',
                //                 function($stateParams, DevicesCompanyObj) {
                //                     return DevicesCompanyObj($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ],
                //         }
                //     })

                // // Status Mesin
                // .state('app.cmds', {
                //         url: '/cmds/:compId',
                //         templateUrl: 'views/cmds/cmds.html',
                //         controller: 'CmdsCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.cmds.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/cmds/cmds-list.html',
                //         controller: 'CmdsListCtrl',
                //         resolve: {
                //             cmds: ['$stateParams', 'CmdsCompanyArr',
                //                 function($stateParams, CmdsCompanyArr) {
                //                     return CmdsCompanyArr($stateParams.compId, parseInt($stateParams.idx), parseInt($stateParams.size))
                //                         .$loaded();
                //                 }
                //             ],
                //             devs: ['$stateParams', 'DevicesCompanyObj',
                //                 function($stateParams, DevicesCompanyObj) {
                //                     return DevicesCompanyObj($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ],
                //         }
                //     })

                // // Data Sidik Masuk
                // .state('app.fingersin', {
                //         url: '/fingersin/:compId',
                //         templateUrl: 'views/fingersin/fingersin.html',
                //         controller: 'FingersinCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.fingersin.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/fingersin/fingersin-list.html',
                //         controller: 'FingersinListCtrl',
                //         resolve: {
                //             fsin: ['$stateParams', 'FingersinCompanyArr',
                //                 function($stateParams, FingersinCompanyArr) {
                //                     return FingersinCompanyArr($stateParams.compId, parseInt($stateParams.idx), parseInt($stateParams.size))
                //                         .$loaded();
                //                 }
                //             ],
                //             devs: ['$stateParams', 'DevicesCompanyObj',
                //                 function($stateParams, DevicesCompanyObj) {
                //                     return DevicesCompanyObj($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ]

                //         }
                //     })

                // // Data Pegawai Masuk
                // .state('app.empsin', {
                //         url: '/empsin/:compId',
                //         templateUrl: 'views/empsin/empsin.html',
                //         controller: 'EmpsinCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.empsin.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/empsin/empsin-list.html',
                //         controller: 'EmpsinListCtrl',
                //         resolve: {
                //             empsin: ['$stateParams', 'EmpsinCompanyArr',
                //                 function($stateParams, EmpsinCompanyArr) {

                //                     return EmpsinCompanyArr($stateParams.compId, parseInt($stateParams.idx), parseInt($stateParams.size))
                //                         .$loaded();
                //                 }
                //             ],

                //             devs: ['$stateParams', 'DevicesCompanyObj',
                //                 function($stateParams, DevicesCompanyObj) {

                //                     return DevicesCompanyObj($stateParams.compId)
                //                         .$loaded();
                //                 }
                //             ]

                //         }
                //     })

                // // Users
                // .state('app.users', {
                //         url: '/users/:compId',
                //         templateUrl: 'views/users/users.html',
                //         controller: 'UsersCtrl',
                //         resolve: {
                //             comps: ['UserCompaniesObj',
                //                 function(UserCompaniesObj) {
                //                     return UserCompaniesObj().$loaded();
                //                 }
                //             ],
                //         }
                //     })
                //     .state('app.users.list', {
                //         url: '/list/:idx/:size',
                //         templateUrl: 'views/users/users-list.html',
                //         controller: 'UsersListCtrl',
                //         resolve: {
                //             members: ['$stateParams', 'DepartementsMemberObj',
                //                 function($stateParams, DepartementsMemberObj) {
                //                     return DepartementsMemberObj($stateParams.compId, parseInt($stateParams.idx), parseInt($stateParams.size))
                //                         .$loaded();
                //                 }
                //             ],
                //         }
                //     })

            }
        ]
    );
