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
                    templateUrl: 'views/pelni/invoice/printinvoicepelni.html',
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
                    template: '<div class="wrapper fade-in-up" style="padding:0px;" ui-view></div>',

                })

                // STATE STOCK TIKET
                .state('app.pelni.stocktiket', {
                    url: '/stocktiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/stocktiket/stocktiket.html',
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

                // STATE SEARCH JADWAL 
                .state('app.pelni.search', {
                        url: '/search/:embar/:debar',
                        templateUrl: 'views/pelni/search/search.html',
                        controller: 'SearchTiketPelniCtrl',
                        resolve: {
                            listPelabuhanPelni: ['$stateParams', 'PelabuhanPelniArr',
                                function($stateParams, PelabuhanPelniArr) {
                                    return PelabuhanPelniArr().$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.pelni.search.results', {
                        url: '/results',
                        templateUrl: 'views/pelni/search/results.html',
                        controller: 'SearchResultsTiketPelniCtrl',
                        resolve: {
                            listJadwalPelni: ['$stateParams', 'JadwalPelniArr',
                                function($stateParams, JadwalPelniArr) {
                                    return JadwalPelniArr($stateParams.embar, $stateParams.debar).$loaded();
                                }
                            ],
                        }

                    })
                    .state('app.pelni.search.reskapal', {
                        url: '/reskapal/:idKapal',
                        templateUrl: 'views/pelni/search/reskapal.html',
                        controller: 'SearchResultsKapalPelniCtrl',
                        resolve: {
                            listKapalPelni: ['$stateParams', 'JadwalPelniKapalArr',
                                function($stateParams, JadwalPelniKapalArr) {
                                    return JadwalPelniKapalArr($stateParams.idKapal).$loaded();
                                }
                            ],
                        }

                    })

                // STATE INVOICE CREATE ONLY
                .state('app.pelni.invoicenew', {
                    url: '/invoicenew/:idJadwal/:idKelas/',
                    templateUrl: 'views/pelni/invoice/invoicenew.html',
                    controller: 'InvoiceNewPelniCtrl',
                    resolve: {
                        singleJadwal: ['$stateParams', 'JadwalPelniSingleObj',
                            function($stateParams, JadwalPelniSingleObj) {
                                return JadwalPelniSingleObj($stateParams.idJadwal).$loaded();
                            }
                        ],
                    }
                })

                // STATE LIST DETAIL EDIT INVOICE
                .state('app.pelni.invoice', {
                        url: '/invoice',
                        abstract: true,
                        template: '<div class="fade-in-right" ui-view></div>',

                    })
                    .state('app.pelni.invoice.list', {
                        url: '/list',
                        templateUrl: 'views/pelni/invoice/invoicelist.html',
                    })
                    .state('app.pelni.invoice.detail', {
                        url: '/detail/:idInvoice',
                        templateUrl: 'views/pelni/invoice/invoicedetail.html',
                        controller: 'InvoiceDetailPelniCtrl',
                        resolve: {
                            invoicePelni: ['$stateParams', 'InvoicePelniSingleObj',
                                function($stateParams, InvoicePelniSingleObj) {
                                    return InvoicePelniSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],

                        }

                    })
                    .state('app.pelni.invoice.edit', {
                        url: '/edit/:idInvoice',
                        templateUrl: 'views/pelni/invoice/invoiceedit.html',
                        controller: 'InvoiceEditPelniCtrl',
                        resolve: {
                            invoicePelni: ['$stateParams', 'InvoicePelniSingleObj',
                                function($stateParams, InvoicePelniSingleObj) {
                                    return InvoicePelniSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],

                        }

                    })


                // STATE ISSUED
                .state('app.pelni.issuedtiket', {
                    url: '/issuedtiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/pelni/issuedtiket/issuedtiket.html',
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
                    templateUrl: 'views/pelni/printtiket/printtiket.html',
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
                    templateUrl: 'views/pelni/rusaktiket/rusaktiket.html',
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
                    templateUrl: 'views/pelni/bataltiket/bataltiket.html',
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
                    templateUrl: 'views/pelni/hilangtiket/hilangtiket.html',
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

                // STATE STOCK TIKET
                .state('app.pelni.stockpenjualan', {
                    url: '/stockpenjualan/:date/:month/:year',
                    templateUrl: 'views/pelni/stockpenjualan/stockpenjualan.html',
                    controller: 'StockPenjualanPelniCtrl',
                    resolve: {
                        tiketBaik: ['$stateParams', 'TiketPelniBaikArr',
                            function($stateParams, TiketPelniBaikArr) {
                                return TiketPelniBaikArr(0, 10000, 'asc')
                                    .$loaded();
                            }
                        ],
                        tiketIssuedDay: ['$stateParams', 'TiketPelniIssuedDayArr',
                            function($stateParams, TiketPelniIssuedDayArr) {
                                return TiketPelniIssuedDayArr($stateParams.date, $stateParams.month, $stateParams.year)
                                    .$loaded();
                            }
                        ],
                    }
                })




            }
        ]
    );
