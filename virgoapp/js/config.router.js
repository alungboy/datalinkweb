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

                // TIKET PELNI > ISSUED TIKET
                .state('app.pelni.issuedtiket', {
                    url: '/issuedtiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/tiketpelni/issuedtiket/issuedtiket.html',
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

                // TIKET PELNI > PRINT TIKET
                .state('app.pelni.printtiket', {
                    url: '/printtiket/:pageSize',
                    templateUrl: 'views/tiketpelni/printtiket/printtiket.html',
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

                // TIKET PELNI > TIKET RUSAK
                .state('app.pelni.rusaktiket', {
                    url: '/rusaktiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/tiketpelni/rusaktiket/rusaktiket.html',
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

                // TIKET PELNI > TIKET BATAL
                .state('app.pelni.bataltiket', {
                    url: '/bataltiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/tiketpelni/bataltiket/bataltiket.html',
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

                // TIKET PELNI > TIKET HILANG
                .state('app.pelni.hilangtiket', {
                    url: '/hilangtiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/tiketpelni/hilangtiket/hilangtiket.html',
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

                // TIKET PELNI > STOCK TIKET
                .state('app.pelni.stocktiket', {
                    url: '/stocktiket/:startDate/:pageSize/:asc',
                    templateUrl: 'views/tiketpelni/stocktiket/stocktiket.html',
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

                // TIKET PELNI > SEARCH DATA TIKET
                .state('app.pelni.searchtiket', {
                    url: '/searchtiket/:noTiket',
                    templateUrl: 'views/tiketpelni/stocktiket/stocktiket.html',
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









                // INVOICE PELNI > SEARCH JADWAL 
                .state('app.pelni.search', {
                        url: '/search/:embar/:debar',
                        templateUrl: 'views/invoicepelni/searchjadwal/search.html',
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
                        templateUrl: 'views/invoicepelni/searchjadwal/results.html',
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
                        templateUrl: 'views/invoicepelni/searchjadwal/reskapal.html',
                        controller: 'SearchResultsKapalPelniCtrl',
                        resolve: {
                            listKapalPelni: ['$stateParams', 'JadwalPelniKapalArr',
                                function($stateParams, JadwalPelniKapalArr) {
                                    return JadwalPelniKapalArr($stateParams.idKapal).$loaded();
                                }
                            ],
                        }

                    })

                // INVOICE PELNI > CREATE
                .state('app.pelni.invoicenew', {
                    url: '/invoicenew/:idJadwal/:idKelas/',
                    templateUrl: 'views/invoicepelni/invoicenew/invoicenew.html',
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

                // INVOICE PELNI > LIST > CRUD - PRINT
                .state('app.pelni.invoice', {
                        url: '/invoice',
                        abstract: true,
                        template: '<div class="fade-in-right" ui-view></div>',

                    })
                    .state('app.pelni.invoice.list', {
                        url: '/list/:pageSize',
                        templateUrl: 'views/invoicepelni/invoicelist/invoicelist.html',
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
                        templateUrl: 'views/invoicepelni/invoicedetail/invoicedetail.html',
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
                        templateUrl: 'views/invoicepelni/invoiceedit/invoiceedit.html',
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
                        templateUrl: 'views/invoicepelni/invoiceprint/invoiceprint.html',
                        controller: 'InvoicePrintPelniCtrl',
                        resolve: {
                            invoicePelni: ['$stateParams', 'InvoicePelniSingleObj',
                                function($stateParams, InvoicePelniSingleObj) {
                                    return InvoicePelniSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],

                        }

                    })

                // INVOICE PELNI > SEARCH DATA INVOICE
                .state('app.pelni.searchinvoice', {
                    url: '/searchinvoice/:idInvoice',
                    templateUrl: 'views/invoicepelni/searchinvoice/searchinvoice.html',
                    controller: 'SearchInvoicePelniCtrl',
                    resolve: {
                        invoicePelni: ['$stateParams', 'InvoicePelniSingleObj',
                            function($stateParams, InvoicePelniSingleObj) {
                                return InvoicePelniSingleObj($stateParams.idInvoice).$loaded();
                            }
                        ],
                    }
                })


                // INVOICE PESAWAT
                .state('app.invoicepesawat', {
                        url: '/invoice-pesawat',
                        abstract: true,
                        template: '<div class="fade-in-right" ui-view></div>',

                    })
                    // INVOICE PESAWAT > INVOICE BARU
                    .state('app.invoicepesawat.new', {
                        url: '/new',
                        templateUrl: 'views/invoicepesawat/invoicenew/invoicenew.html',
                        controller: 'InvoicePesawatNewCtrl',
                        resolve: {
                            invoices: ['$stateParams', 'InvoicePesawatArr',
                                function($stateParams, InvoicePesawatArr) {
                                    return InvoicePesawatArr(10)
                                        .$loaded();
                                }
                            ],
                        }
                    })
                    // INVOICE PESAWAT > LIST INVOICE
                    .state('app.invoicepesawat.list', {
                        url: '/list/:pageSize',
                        templateUrl: 'views/invoicepesawat/invoicelist/invoicelist.html',
                        controller: 'InvoicePesawatListCtrl',
                        resolve: {
                            invoices: ['$stateParams', 'InvoicePesawatObj',
                                function($stateParams, InvoicePesawatObj) {
                                    return InvoicePesawatObj(parseInt($stateParams.pageSize))
                                        .$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.invoicepesawat.detail', {
                        url: '/detail/:pageSize/:idInvoice',
                        templateUrl: 'views/invoicepesawat/invoicedetail/invoicedetail.html',
                        controller: 'InvoicePesawatDetailCtrl',
                        resolve: {
                            invoices: ['$stateParams', 'InvoicePesawatSingleObj',
                                function($stateParams, InvoicePesawatSingleObj) {
                                    return InvoicePesawatSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],
                        }
                    })
                    .state('app.invoicepesawat.edit', {
                        url: '/edit/:pageSize/:idInvoice',
                        templateUrl: 'views/invoicepesawat/invoiceedit/invoiceedit.html',
                        controller: 'InvoicePesawatEditCtrl',
                        resolve: {
                            invoices: ['$stateParams', 'InvoicePesawatSingleObj',
                                function($stateParams, InvoicePesawatSingleObj) {
                                    return InvoicePesawatSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],

                        }

                    })
                    .state('app.invoicepesawat.print', {
                        url: '/print/:idInvoice',
                        templateUrl: 'views/invoicepesawat/invoiceprint/invoiceprint.html',
                        controller: 'InvoicePesawatPrintCtrl',
                        resolve: {
                            invoices: ['$stateParams', 'InvoicePesawatSingleObj',
                                function($stateParams, InvoicePesawatSingleObj) {
                                    return InvoicePesawatSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],

                        }

                    })





                // KASIR > INVOICE KAPAL LUNAS
                .state('app.pelni.invoicelunas', {
                        url: '/invoicelunas',
                        abstract: true,
                        template: '<div class="fade-in-right" ui-view></div>',
                    })
                    .state('app.pelni.invoicelunas.list', {
                        url: '/list/:pageSize',
                        templateUrl: 'views/kasir/invoicepelni/invoicelist.html',
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
                        templateUrl: 'views/kasir/invoicepelni/invoicedetail.html',
                        controller: 'InvoiceLunasDetailPelniCtrl',
                        resolve: {
                            invoicePelni: ['$stateParams', 'InvoicePelniSingleObj',
                                function($stateParams, InvoicePelniSingleObj) {
                                    return InvoicePelniSingleObj($stateParams.idInvoice).$loaded();
                                }
                            ],
                        }
                    })









                // LAPORAN PELNI > STOCK TIKET
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
                    // LAPORAN PELNI > PENJUALAN HARIAN
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
                    // LAPORAN PELNI > PENJUALAN BULANAN
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
                    // LAPORAN PELNI > RUSAK BULANAN
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
                    // LAPORAN PELNI > BATAL BULANAN
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
                    // LAPORAN PELNI > HILANG BULANAN
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

                // ADMIN > PENJUALAN HARIAN PELNI (TIKET)
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
                    // ADMIN > PENJUALAN BULANAN PELNI (TIKET)
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
