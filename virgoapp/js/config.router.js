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
                        controller: 'SearchJadwalPelniCtrl',
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
                        invoices: ['$stateParams', 'InvoicePelniArr',
                            function($stateParams, InvoicePelniArr) {
                                return InvoicePelniArr(10)
                                    .$loaded();
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
                        url: '/list/:pageSize',
                        templateUrl: 'views/pelni/invoice/invoicelist.html',
                        controller: 'InvoiceListPelniCtrl',
                        resolve: {
                            invoices: ['$stateParams', 'InvoicePelniObj',
                                function($stateParams, InvoicePelniObj) {
                                    return InvoicePelniObj(parseInt($stateParams.pageSize))
                                        .$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.pelni.invoice.detail', {
                        url: '/detail/:pageSize/:idInvoice',
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
                        url: '/edit/:pageSize/:idInvoice',
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
                    .state('app.pelni.invoice.print', {
                        url: '/print/:idInvoice',
                        templateUrl: 'views/pelni/invoice/invoiceprint.html',
                        controller: 'InvoicePrintPelniCtrl',
                        resolve: {
                            invoicePelni: ['$stateParams', 'InvoicePelniSingleObj',
                                function($stateParams, InvoicePelniSingleObj) {
                                    return InvoicePelniSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],

                        }

                    })

                // State Invoice Lunas
                .state('app.pelni.invoicelunas', {
                        url: '/invoicelunas',
                        abstract: true,
                        template: '<div class="fade-in-right" ui-view></div>',
                    })
                    .state('app.pelni.invoicelunas.list', {
                        url: '/list/:pageSize',
                        templateUrl: 'views/pelni/invoicelunas/invoicelist.html',
                        controller: 'InvoiceLunasListPelniCtrl',
                        resolve: {
                            invoices: ['$stateParams', 'InvoicePelniObj',
                                function($stateParams, InvoicePelniObj) {
                                    return InvoicePelniObj(parseInt($stateParams.pageSize))
                                        .$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.pelni.invoicelunas.detail', {
                        url: '/detail/:pageSize/:idInvoice',
                        templateUrl: 'views/pelni/invoicelunas/invoicedetail.html',
                        controller: 'InvoiceLunasDetailPelniCtrl',
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
                    url: '/printtiket/:pageSize',
                    templateUrl: 'views/pelni/printtiket/printtiket.html',
                    controller: 'PrintTiketPelniCtrl',
                    resolve: {
                        tiketPrinted: ['$stateParams', 'TiketPelniPrintedArr',
                            function($stateParams, TiketPelniPrintedArr) {
                                return TiketPelniPrintedArr(parseInt($stateParams.pageSize))
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

                // STATE SEARCH INVOICE & TIKET
                .state('app.pelni.searchtiket', {
                        url: '/searchtiket/:noTiket',
                        templateUrl: 'views/pelniinvoicetiket/searchtiket/searchtiket.html',
                        controller: 'SearchTiketPelniCtrl',
                        resolve: {
                            tiketSing: ['$stateParams', 'TiketPelniSingleObj',
                                function($stateParams, TiketPelniSingleObj) {
                                    return TiketPelniSingleObj($stateParams.noTiket)
                                        .$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.pelni.searchinvoice', {
                        url: '/searchinvoice/:idInvoice',
                        templateUrl: 'views/pelniinvoicetiket/searchinvoice/searchinvoice.html',
                        controller: 'SearchInvoicePelniCtrl',
                        resolve: {
                            invoicePelni: ['$stateParams', 'InvoicePelniSingleObj',
                                function($stateParams, InvoicePelniSingleObj) {
                                    return InvoicePelniSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],
                        }
                    })


                // STATE REPORT
                .state('app.pelni.stocktiketreport', {
                        url: '/stocktiketreport',
                        templateUrl: 'views/pelnireport/stocktiket/stocktiketreport.html',
                        controller: 'StockTiketReportPelniCtrl',
                        resolve: {
                            tiketBaik: ['$stateParams', 'TiketPelniBaikArr',
                                function($stateParams, TiketPelniBaikArr) {
                                    return TiketPelniBaikArr(0, 10000, 'asc')
                                        .$loaded();
                                }
                            ]
                        }
                    })
                    .state('app.pelni.penjualanharianreport', {
                        url: '/penjualanharianreport/:date/:pageSize',
                        templateUrl: 'views/pelnireport/penjualanharian/penjualanharianreport.html',
                        controller: 'PenujualanHarianReportPelniCtrl',
                        resolve: {
                            issuedDay: ['$stateParams', 'TiketPelniIssuedDayArr',
                                function($stateParams, TiketPelniIssuedDayArr) {
                                    return TiketPelniIssuedDayArr($stateParams.date, $stateParams.pageSize)
                                        .$loaded();
                                }
                            ]
                        }
                    })
                    .state('app.pelni.penjualanbulananreport', {
                        url: '/penjualanbulananreport/:date',
                        templateUrl: 'views/pelnireport/penjualanbulanan/penjualanbulananreport.html',
                        controller: 'PenujualanBulananReportPelniCtrl',
                        resolve: {
                            issuedMonth: ['$stateParams', 'TiketPelniIssuedMonthArr',
                                function($stateParams, TiketPelniIssuedMonthArr) {
                                    return TiketPelniIssuedMonthArr($stateParams.date)
                                        .$loaded();
                                }
                            ]
                        }
                    })
                    .state('app.pelni.rusakbulananreport', {
                        url: '/rusakbulananreport/:date',
                        templateUrl: 'views/pelnireport/rusakbulanan/rusakbulananreport.html',
                        controller: 'RusakBulananReportPelniCtrl',
                        resolve: {
                            voidMonth: ['$stateParams', 'TiketPelniVoidMonthArr',
                                function($stateParams, TiketPelniVoidMonthArr) {
                                    return TiketPelniVoidMonthArr($stateParams.date)
                                        .$loaded();
                                }
                            ]
                        }
                    })
                    .state('app.pelni.batalbulananreport', {
                        url: '/batalbulananreport/:date',
                        templateUrl: 'views/pelnireport/batalbulanan/batalbulananreport.html',
                        controller: 'BatalBulananReportPelniCtrl',
                        resolve: {
                            cancelMonth: ['$stateParams', 'TiketPelniCancelMonthArr',
                                function($stateParams, TiketPelniCancelMonthArr) {
                                    return TiketPelniCancelMonthArr($stateParams.date)
                                        .$loaded();
                                }
                            ]
                        }
                    })
                    .state('app.pelni.hilangbulananreport', {
                        url: '/hilangbulananreport/:date',
                        templateUrl: 'views/pelnireport/hilangbulanan/hilangbulananreport.html',
                        controller: 'HilangBulananReportPelniCtrl',
                        resolve: {
                            missingMonth: ['$stateParams', 'TiketPelniMissingMonthArr',
                                function($stateParams, TiketPelniMissingMonthArr) {
                                    return TiketPelniMissingMonthArr($stateParams.date)
                                        .$loaded();
                                }
                            ]
                        }
                    })

                // STATE ADMIN
                .state('app.adminpenjualanharianreport', {
                        url: '/admin/penjualanharianreport/:date/:pageSize',
                        templateUrl: 'views/admin/penjualanharianpelni/penjualanharianreport.html',
                        controller: 'PenujualanHarianReportPelniAdminCtrl',
                        resolve: {
                            issuedDay: ['$stateParams', 'TiketPelniIssuedDayArr',
                                function($stateParams, TiketPelniIssuedDayArr) {
                                    return TiketPelniIssuedDayArr($stateParams.date, $stateParams.pageSize)
                                        .$loaded();
                                }
                            ]
                        }
                    })
                    .state('app.adminpenjualanbulananreport', {
                        url: '/admin/penjualanbulananreport/:date',
                        templateUrl: 'views/admin/penjualanbulananpelni/penjualanbulananreport.html',
                        controller: 'PenujualanBulananReportPelniAdminCtrl',
                        resolve: {
                            issuedMonth: ['$stateParams', 'TiketPelniIssuedMonthArr',
                                function($stateParams, TiketPelniIssuedMonthArr) {
                                    return TiketPelniIssuedMonthArr($stateParams.date)
                                        .$loaded();
                                }
                            ]
                        }
                    })



            }
        ]
    );
