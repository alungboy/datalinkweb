"use strict";
angular.module('Fbase', ['app', 'firebase'])

.factory('Fbase', ['FBURL',
    function(FBURL, $firebaseAuth) {
        var RefFactory = new Firebase(FBURL);
        return RefFactory;
    }
])

.factory('FbAuth', ['Fbase', '$firebaseAuth',
    function(Fbase, $firebaseAuth) {
        var auth = $firebaseAuth(Fbase);
        return auth;
    }
])

.service("UserObj", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {
    var getObj = function() {
        var user = FbAuth.$getAuth();
        if (user) {
            return $firebase(Fbase.child('users').child(user.uid)).$asObject();
        }
        return null;
    };
    return getObj;
}])

.factory("UserRef", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {
    var objRef = null
    var getRef = function() {
        if (!objRef) {
            var user = FbAuth.$getAuth();
            if (user) {
                objRef = $firebase(Fbase.child('users').child(user.uid));
            }

        }
        return objRef;
    };
    return getRef;
}])

.factory("UsersObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var usersFactory = null
    var get = function() {
        if (!usersFactory) {
            usersFactory = $firebase(Fbase.child('users'));
        }
        return usersFactory.$asObject();
    };
    return get;
}])

.service("TiketDataObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(noTiket) {
        if (noTiket) {
            var sync = $firebase(Fbase.child('tiketpelnidata').child(noTiket));
            return sync.$asObject();
        }
        return null;
    };

    return get;
}])

.service("TiketOneObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(noTiket) {
        if (noTiket) {
            var sync = $firebase(Fbase.child('tiketpelni').child(noTiket));
            return sync.$asObject();
        }
        return null;
    };

    return get;
}])

.service("TiketPelniSingleObj", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(noTiket) {

        var sync = Fbase.child('tiketpelni');
        if (!noTiket || noTiket.length !== 10) {
            sync = sync.orderByChild('NoTiket').equalTo(1000468731);
        } else {
            sync = sync.orderByChild('NoTiket').equalTo(parseInt(noTiket));
        }

        return $firebase(sync).$asObject();
    }

    return get;
}])

.service("TiketPelniBaikArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(startDate, pageSize, asc) {
        if (!pageSize) {
            pageSize = 10;
        }
        var sync = Fbase.child('tiketpelni');
        if (!startDate || startDate.length !== 13) {
            sync = sync.orderByChild('StatusTgl').startAt(10000000000000).endAt(19999999999999);
        } else {
            sync = sync.orderByChild('StatusTgl').startAt(parseInt('1' + startDate)).endAt(19999999999999);
        }

        if (!asc || asc == '' || asc == 0) {
            sync = sync.limitToLast(parseInt(pageSize));
        } else {
            sync = sync.limitToFirst(parseInt(pageSize));
        }

        return $firebase(sync).$asArray();
    }

    return get;
}])


.service("TiketPelniIssuedArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(startDate, pageSize, asc) {
        if (!pageSize) {
            pageSize = 10;
        }
        var sync = Fbase.child('tiketpelni');
        if (!startDate || startDate.length !== 13) {
            sync = sync.orderByChild('StatusTgl').startAt(20000000000000).endAt(29999999999999);
        } else {
            sync = sync.orderByChild('StatusTgl').startAt(parseInt('2' + startDate)).endAt(29999999999999);
        }

        if (!asc || asc == '' || asc == 0) {
            sync = sync.limitToLast(parseInt(pageSize));
        } else {
            sync = sync.limitToFirst(parseInt(pageSize));
        }

        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniIssuedDayArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date, pageSize) {
        var sync = Fbase.child('tiketpelni');

        if (date == null || date == '' || date.length !== 8) {
            var dayStart = moment().startOf('day').valueOf();
            var dayEnd = moment().endOf('day').valueOf();
        } else {
            var dayStart = moment(date, 'YYYYMMDD').startOf('day').valueOf();
            var dayEnd = moment(date, 'YYYYMMDD').endOf('day').valueOf();
        }
        pageSize = parseInt(pageSize);
        if (!pageSize || pageSize < 2000) {
            pageSize = 2000;
        }

        var dStart = parseInt('2' + dayStart);
        var dEnd = parseInt('2' + dayEnd);
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd).limitToLast(pageSize);

        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniIssuedMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');


        if (date == null || date == '' || date.length !== 8) {
            var dStart = moment().startOf('month').valueOf();
            var dEnd = moment().endOf('month').valueOf();
        } else {
            var dStart = moment(date, 'YYYYMMDD').startOf('month').valueOf();
            var dEnd = moment(date, 'YYYYMMDD').endOf('month').valueOf();
        }

        dStart = parseInt('2' + dStart);
        dEnd = parseInt('2' + dEnd);

        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd);
        return $firebase(sync).$asArray();
    }
    return get;
}])

.service("TiketPelniPrintedArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(pageSize) {
        if (!pageSize) {
            pageSize = 10;
        }
        var sync = Fbase.child('tiketpelni');

        sync = sync.orderByChild('PrintedOutAt').startAt(1).endAt(9999999999999);


        sync = sync.limitToLast(parseInt(pageSize));


        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniVoidMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');


        if (date == null || date == '' || date.length !== 8) {
            var dStart = moment().startOf('month').valueOf();
            var dEnd = moment().endOf('month').valueOf();
        } else {
            var dStart = moment(date, 'YYYYMMDD').startOf('month').valueOf();
            var dEnd = moment(date, 'YYYYMMDD').endOf('month').valueOf();
        }

        dStart = parseInt('4' + dStart);
        dEnd = parseInt('4' + dEnd);

        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd);
        return $firebase(sync).$asArray();
    }
    return get;
}])

.service("TiketPelniCancelMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');


        if (date == null || date == '' || date.length !== 8) {
            var dStart = moment().startOf('month').valueOf();
            var dEnd = moment().endOf('month').valueOf();
        } else {
            var dStart = moment(date, 'YYYYMMDD').startOf('month').valueOf();
            var dEnd = moment(date, 'YYYYMMDD').endOf('month').valueOf();
        }

        dStart = parseInt('3' + dStart);
        dEnd = parseInt('3' + dEnd);
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd);
        return $firebase(sync).$asArray();
    }
    return get;
}])

.service("TiketPelniMissingMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');

        if (date == null || date == '' || date.length !== 8) {
            var dStart = moment().startOf('month').valueOf();
            var dEnd = moment().endOf('month').valueOf();
        } else {
            var dStart = moment(date, 'YYYYMMDD').startOf('month').valueOf();
            var dEnd = moment(date, 'YYYYMMDD').endOf('month').valueOf();
        }

        dStart = parseInt('5' + dStart);
        dEnd = parseInt('5' + dEnd);
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd);
        return $firebase(sync).$asArray();
    }
    return get;
}])

.factory("ReqJadwalPelniRef", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {
    var objRef = null

    var getRef = function() {
        if (!objRef) {


            objRef = $firebase(Fbase.child('reqjadwalpelni'));


        }
        return objRef;
    };

    return getRef;
}])

.factory("ReqIssuedPelniRef", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {
    var objRef = null

    var getRef = function() {
        if (!objRef) {

            objRef = $firebase(Fbase.child('reqissuedpelni'));
        }
        return objRef;
    };

    return getRef;
}])

.factory("PelabuhanPelniArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var obj = null
    var get = function() {
        if (!obj) {
            obj = $firebase(Fbase.child('pelabuhanpelni'));
        }
        return obj.$asArray();
    };

    return get;
}])

.service("JadwalPelniArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var timeNow = moment().format('YYYYMMDD') + '0000';
    var timeEnd = '999999999999'
    var get = function(embar, debar) {

        var obj = $firebase(Fbase.child('jadwalpelni').orderByChild('RuteTgl').startAt(embar + '-' + debar + '-' + timeNow).endAt(embar + '-' + debar + '-' + timeEnd));

        return obj.$asArray();
    };

    return get;
}])

.service("JadwalPelniKapalArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var timeNow = moment().format('YYYYMMDD') + '0000';
    var timeEnd = '999999999999'
    var get = function(idKapal) {

        var obj = $firebase(Fbase.child('jadwalpelni').orderByChild('KapalTgl').startAt(idKapal + '-' + timeNow).endAt(idKapal + '-' + timeEnd));

        return obj.$asArray();
    };

    return get;
}])


.service("JadwalPelniSingleObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(idJadwal) {

        var obj = $firebase(Fbase.child('jadwalpelni').child(idJadwal));

        return obj.$asObject();
    };

    return get;
}])

.factory("InvoicePelniRef", ['Fbase', 'FbAuth', "$firebase", function(Fbase, FbAuth, $firebase) {
    var objRef = null

    var getRef = function() {
        if (!objRef) {


            objRef = $firebase(Fbase.child('invoicepelni'));


        }
        return objRef;
    };

    return getRef;
}])

.service("InvoicePelniObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(pageSize) {

        if (!pageSize || pageSize == '') {
            var obj = Fbase.child('invoicepelni').orderByChild('CreatedAt').startAt(1).endAt(9999999999999);
            obj = obj.limitToLast(10);
        } else {
            var obj = Fbase.child('invoicepelni').orderByChild('CreatedAt').startAt(1).endAt(9999999999999);
            obj = obj.limitToLast(parseInt(pageSize));
        }

        return $firebase(obj).$asObject();
    };


    return get;
}])

.service("InvoicePelniArr", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(pageSize) {

        if (!pageSize || pageSize == '') {
            var obj = Fbase.child('invoicepelni').orderByChild('CreatedAt').startAt(1).endAt(9999999999999);
            obj = obj.limitToLast(10);
        } else {
            var obj = Fbase.child('invoicepelni').orderByChild('CreatedAt').startAt(1).endAt(9999999999999);
            obj = obj.limitToLast(parseInt(pageSize));
        }

        return $firebase(obj).$asArray();
    };


    return get;
}])

.service("InvoicePelniSingleObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(idInvoicePelni) {

        if (!idInvoicePelni || idInvoicePelni == '') {
            var obj = Fbase.child('invoicepelni').child('-JgUoFSaOSNKdtPIEfRC');
        } else {
            var obj = Fbase.child('invoicepelni').child(idInvoicePelni);
        }
        return $firebase(obj).$asObject();
    };
    return get;
}])


.factory('HargaFac', ['Fbase', "$firebase", function(Fbase, $firebase) {
    var harga = {};
    harga.pelni = {
        // DOROLONDA 
        '127': {
            // Rute Barat bitung call-2 tujuan call-2
            // Toli-Toli 
            '835-2-861-2': {
                '1A': {
                    Dewasa: 688000,
                    Anak: 531000,
                    Bayi: 114000
                },
                '1B': {
                    Dewasa: 571000,
                    Anak: 444000,
                    Bayi: 102000
                },
                'EKO': {
                    Dewasa: 258000,
                    Anak: 209000,
                    Bayi: 71000
                }
            },
            // Pantoloan
            '835-2-863-2': {
                '1A': {
                    Dewasa: 950000,
                    Anak: 728000,
                    Bayi: 140000
                },
                '1B': {
                    Dewasa: 785000,
                    Anak: 604000,
                    Bayi: 124000
                },
                'EKO': {
                    Dewasa: 339000,
                    Anak: 270000,
                    Bayi: 79000
                }
            },
            // Balikpapan
            '835-2-803-2': {
                '1A': {
                    Dewasa: 1237000,
                    Anak: 943000,
                    Bayi: 169000
                },
                '1B': {
                    Dewasa: 1019000,
                    Anak: 780000,
                    Bayi: 147000
                },
                'EKO': {
                    Dewasa: 426000,
                    Anak: 335000,
                    Bayi: 88000
                }
            },
            // Surabaya
            '835-2-563-2': {
                '1A': {
                    Dewasa: 2086000,
                    Anak: 1580000,
                    Bayi: 254000
                },
                '1B': {
                    Dewasa: 1710000,
                    Anak: 1298000,
                    Bayi: 216000
                },
                'EKO': {
                    Dewasa: 624000,
                    Anak: 484000,
                    Bayi: 108000
                }
            },
            // Rute Timur bitung call-1 tujuan call-2
            // Ternate 
            '835-1-942-1': {
                '1A': {
                    Dewasa: 566000,
                    Anak: 440000,
                    Bayi: 93000
                },
                '1B': {
                    Dewasa: 473000,
                    Anak: 370000,
                    Bayi: 84000
                },
                'EKO': {
                    Dewasa: 220000,
                    Anak: 181000,
                    Bayi: 58000
                }
            },
            // Sorong
            '835-1-971-1': {
                '1A': {
                    Dewasa: 1168000,
                    Anak: 892000,
                    Bayi: 162000
                },
                '1B': {
                    Dewasa: 963000,
                    Anak: 738000,
                    Bayi: 142000
                },
                'EKO': {
                    Dewasa: 405000,
                    Anak: 319000,
                    Bayi: 85000
                }
            },
            // Manokwari
            '835-1-972-1': {
                '1A': {
                    Dewasa: 1488000,
                    Anak: 1131000,
                    Bayi: 194000
                },
                '1B': {
                    Dewasa: 1223000,
                    Anak: 933000,
                    Bayi: 168000
                },
                'EKO': {
                    Dewasa: 475000,
                    Anak: 372000,
                    Bayi: 93000
                }
            },
            // Nabire
            '835-1-982-1': {
                '1A': {
                    Dewasa: 1560000,
                    Anak: 1186000,
                    Bayi: 201000
                },
                '1B': {
                    Dewasa: 1282000,
                    Anak: 977000,
                    Bayi: 174000
                },
                'EKO': {
                    Dewasa: 479000,
                    Anak: 375000,
                    Bayi: 93000
                }
            },
            // Serui
            '835-1-975-1': {
                '1A': {
                    Dewasa: 1674000,
                    Anak: 1270000,
                    Bayi: 213000
                },
                '1B': {
                    Dewasa: 1374000,
                    Anak: 1046000,
                    Bayi: 183000
                },
                'EKO': {
                    Dewasa: 510000,
                    Anak: 398000,
                    Bayi: 96000
                }
            },
            // Biak
            '835-1-973-1': {
                '1A': {
                    Dewasa: 1710000,
                    Anak: 1298000,
                    Bayi: 216000
                },
                '1B': {
                    Dewasa: 1404000,
                    Anak: 1068000,
                    Bayi: 186000
                },
                'EKO': {
                    Dewasa: 521000,
                    Anak: 406000,
                    Bayi: 97000
                }
            },
            // Jayapura
            '835-1-974-1': {
                '1A': {
                    Dewasa: 1879000,
                    Anak: 1425000,
                    Bayi: 233000
                },
                '1B': {
                    Dewasa: 1542000,
                    Anak: 1172000,
                    Bayi: 200000
                },
                'EKO': {
                    Dewasa: 567000,
                    Anak: 441000,
                    Bayi: 101000
                }
            }
        },
        // TILONG KABILA
        '115': {
            // Rute Global bitung-1 tujuan-2
            // Gorontalo
            '835-1-841-2': {
                '1': {
                    Dewasa: 409000,
                    Anak: 322000,
                    Bayi: 86000
                },
                '2': {
                    Dewasa: 344000,
                    Anak: 274000,
                    Bayi: 80000
                },
                'EKO': {
                    Dewasa: 157000,
                    Anak: 133000,
                    Bayi: 61000
                }
            },
            // Luwuk
            '835-1-868-2': {
                '1': {
                    Dewasa: 651000,
                    Anak: 504000,
                    Bayi: 110000
                },
                '2': {
                    Dewasa: 542000,
                    Anak: 422000,
                    Bayi: 100000
                },
                'EKO': {
                    Dewasa: 246000,
                    Anak: 200000,
                    Bayi: 70000
                }
            },
            // Kolonedale
            '835-1-867-2': {
                '1': {
                    Dewasa: 873000,
                    Anak: 670000,
                    Bayi: 136000
                },
                '2': {
                    Dewasa: 726000,
                    Anak: 560000,
                    Bayi: 121000
                },
                'EKO': {
                    Dewasa: 329000,
                    Anak: 262000,
                    Bayi: 81000
                }
            },
            // Kendari
            '835-1-922-2': {
                '1': {
                    Dewasa: 1185000,
                    Anak: 904000,
                    Bayi: 164000
                },
                '2': {
                    Dewasa: 976000,
                    Anak: 748000,
                    Bayi: 143000
                },
                'EKO': {
                    Dewasa: 410000,
                    Anak: 323000,
                    Bayi: 86000
                }
            },
            // Raha
            '835-1-924-2': {
                '1': {
                    Dewasa: 1290000,
                    Anak: 983000,
                    Bayi: 174000
                },
                '2': {
                    Dewasa: 1062000,
                    Anak: 812000,
                    Bayi: 151000
                },
                'EKO': {
                    Dewasa: 443000,
                    Anak: 348000,
                    Bayi: 89000
                }
            },
            // Bau-Bau
            '835-1-921-2': {
                '1': {
                    Dewasa: 1407000,
                    Anak: 1071000,
                    Bayi: 186000
                },
                '2': {
                    Dewasa: 1157000,
                    Anak: 883000,
                    Bayi: 161000
                },
                'EKO': {
                    Dewasa: 451000,
                    Anak: 354000,
                    Bayi: 89000
                }
            },
            // Makassar
            '835-1-893-2': {
                '1': {
                    Dewasa: 1520000,
                    Anak: 1155000,
                    Bayi: 197000
                },
                '2': {
                    Dewasa: 1249000,
                    Anak: 952000,
                    Bayi: 170000
                },
                'EKO': {
                    Dewasa: 468000,
                    Anak: 367000,
                    Bayi: 91000
                }
            },
            // Labuan Bajo
            '835-1-662-2': {
                '1': {
                    Dewasa: 1807000,
                    Anak: 1371000,
                    Bayi: 226000
                },
                '2': {
                    Dewasa: 1483000,
                    Anak: 1128000,
                    Bayi: 194000
                },
                'EKO': {
                    Dewasa: 546000,
                    Anak: 425000,
                    Bayi: 99000
                }
            },
            // Bima
            '835-1-655-2': {
                '1': {
                    Dewasa: 1875000,
                    Anak: 1422000,
                    Bayi: 233000
                },
                '2': {
                    Dewasa: 1539000,
                    Anak: 1170000,
                    Bayi: 199000
                },
                'EKO': {
                    Dewasa: 566000,
                    Anak: 440000,
                    Bayi: 101000
                }
            },
            // Lembar
            '835-1-651-2': {
                '1': {
                    Dewasa: 2170000,
                    Anak: 1643000,
                    Bayi: 262000
                },
                '2': {
                    Dewasa: 1779000,
                    Anak: 1350000,
                    Bayi: 223000
                },
                'EKO': {
                    Dewasa: 648000,
                    Anak: 502000,
                    Bayi: 109000
                }
            },
            // Denpasar/Benoa
            '835-1-613-2': {
                '1': {
                    Dewasa: 2195000,
                    Anak: 1662000,
                    Bayi: 265000
                },
                '2': {
                    Dewasa: 1779000,
                    Anak: 1365000,
                    Bayi: 225000
                },
                'EKO': {
                    Dewasa: 655000,
                    Anak: 507000,
                    Bayi: 110000
                }
            }
        },
        // SINABUNG
        '118': {
            // Rute Global call tujuan 2 kecuali kijang call 1
            // Ternate
            '835-1-942-2': {
                '1A': {
                    Dewasa: 556000,
                    Anak: 440000,
                    Bayi: 102000
                },
                '1B': {
                    Dewasa: 473000,
                    Anak: 370000,
                    Bayi: 93000
                },
                '2A': {
                    Dewasa: 340000,
                    Anak: 271000,
                    Bayi: 79000
                },
                '2B': {
                    Dewasa: 318000,
                    Anak: 254000,
                    Bayi: 77000
                },
                'EKO': {
                    Dewasa: 220000,
                    Anak: 181000,
                    Bayi: 67000
                }
            },
            // Ambon
            '835-1-946-2': {
                '1A': {
                    Dewasa: 882000,
                    Anak: 677000,
                    Bayi: 134000
                },
                '1B': {
                    Dewasa: 729000,
                    Anak: 562000,
                    Bayi: 118000
                },
                '2A': {
                    Dewasa: 514000,
                    Anak: 401000,
                    Bayi: 97000
                },
                '2B': {
                    Dewasa: 478000,
                    Anak: 374000,
                    Bayi: 93000
                },
                'EKO': {
                    Dewasa: 318000,
                    Anak: 254000,
                    Bayi: 77000
                },
            },
            // Namlea
            '835-1-951-2': {
                '1A': {
                    Dewasa: 900000,
                    Anak: 690000,
                    Bayi: 137000
                },
                '1B': {
                    Dewasa: 745000,
                    Anak: 574000,
                    Bayi: 121000
                },
                '2A': {
                    Dewasa: 526000,
                    Anak: 410000,
                    Bayi: 99000
                },
                '2B': {
                    Dewasa: 488000,
                    Anak: 381000,
                    Bayi: 95000
                },
                'EKO': {
                    Dewasa: 326000,
                    Anak: 260000,
                    Bayi: 79000
                }
            },
            // Bau-Bau
            '835-1-921-2': {
                '1A': {
                    Dewasa: 1407000,
                    Anak: 1071000,
                    Bayi: 186000
                },
                '1B': {
                    Dewasa: 1157000,
                    Anak: 883000,
                    Bayi: 161000
                },
                '2A': {
                    Dewasa: 804000,
                    Anak: 619000,
                    Bayi: 126000
                },
                '2B': {
                    Dewasa: 744000,
                    Anak: 574000,
                    Bayi: 120000
                },
                'EKO': {
                    Dewasa: 451000,
                    Anak: 354000,
                    Bayi: 90000
                }
            },
            // Makassar
            '835-1-893-2': {
                '1A': {
                    Dewasa: 1576000,
                    Anak: 1198000,
                    Bayi: 203000
                },
                '1B': {
                    Dewasa: 1295000,
                    Anak: 987000,
                    Bayi: 175000
                },
                '2A': {
                    Dewasa: 898000,
                    Anak: 689000,
                    Bayi: 135000
                },
                '2B': {
                    Dewasa: 830000,
                    Anak: 638000,
                    Bayi: 128000
                },
                'EKO': {
                    Dewasa: 482000,
                    Anak: 377000,
                    Bayi: 94000
                }
            },
            // Surabaya
            '835-1-563-2': {
                '1A': {
                    Dewasa: 2086000,
                    Anak: 1580000,
                    Bayi: 254000
                },
                '1B': {
                    Dewasa: 1710000,
                    Anak: 1298000,
                    Bayi: 216000
                },
                '2A': {
                    Dewasa: 1179000,
                    Anak: 900000,
                    Bayi: 163000
                },
                '2B': {
                    Dewasa: 1089000,
                    Anak: 832000,
                    Bayi: 154000
                },
                'EKO': {
                    Dewasa: 624000,
                    Anak: 484000,
                    Bayi: 108000
                }
            },
            // Tanjung Priok
            '835-1-431-2': {
                '1A': {
                    Dewasa: 2570000,
                    Anak: 1943000,
                    Bayi: 302000
                },
                '1B': {
                    Dewasa: 2105000,
                    Anak: 1594000,
                    Bayi: 256000
                },
                '2A': {
                    Dewasa: 1446000,
                    Anak: 1100000,
                    Bayi: 190000
                },
                '2B': {
                    Dewasa: 1335000,
                    Anak: 1017000,
                    Bayi: 179000
                },
                'EKO': {
                    Dewasa: 759000,
                    Anak: 585000,
                    Bayi: 121000
                }
            },
            // Kijang
            '835-1-251-1': {
                '1A': {
                    Dewasa: 3039000,
                    Anak: 2295000,
                    Bayi: 349000
                },
                '1B': {
                    Dewasa: 2486000,
                    Anak: 1880000,
                    Bayi: 294000
                },
                '2A': {
                    Dewasa: 1705000,
                    Anak: 1294000,
                    Bayi: 216000
                },
                '2B': {
                    Dewasa: 1572000,
                    Anak: 1195000,
                    Bayi: 203000
                },
                'EKO': {
                    Dewasa: 890000,
                    Anak: 683000,
                    Bayi: 133000
                }
            },
        },
        // TATAMAILAU
        '107' : {
            // Rute Bitung call-1 (B)
            // Sorong
            '835-1-971-1': {
                '1': {
                    Dewasa: 1168000,
                    Anak: 892000,
                    Bayi: 162000
                },
                '2': {
                    Dewasa: 963000,
                    Anak: 738000,
                    Bayi: 142000
                },
                'EKO': {
                    Dewasa: 405000,
                    Anak: 339000,
                    Bayi: 85000
                }
            },
            // Fak-Fak
            '835-1-976-1': {
                '1': {
                    Dewasa: 1459000,
                    Anak: 1110000,
                    Bayi: 191000
                },
                '2': {
                    Dewasa: 1200000,
                    Anak: 915000,
                    Bayi: 165000
                },
                'EKO': {
                    Dewasa: 466000,
                    Anak: 365000,
                    Bayi: 92000
                }
            },
            // Kaimana
            '835-1-977-1': {
                '1': {
                    Dewasa: 1544000,
                    Anak: 1174000,
                    Bayi: 201000
                },
                '2': {
                    Dewasa: 1270000,
                    Anak: 968000,
                    Bayi: 174000
                },
                'EKO': {
                    Dewasa: 476000,
                    Anak: 373000,
                    Bayi: 95000
                }
            },
            // Tual
            '835-1-949-1': {
                '1': {
                    Dewasa: 1669000,
                    Anak: 1256000,
                    Bayi: 212000
                },
                '2': {
                    Dewasa: 1370000,
                    Anak: 1033000,
                    Bayi: 182000
                },
                'EKO': {
                    Dewasa: 509000,
                    Anak: 397000,
                    Bayi: 95000
                }
            },
            // Timika
            '835-1-983-1': {
                '1': {
                    Dewasa: 2037000,
                    Anak: 1532000,
                    Bayi: 249000
                },
                '2': {
                    Dewasa: 1649000,
                    Anak: 1257000,
                    Bayi: 212000
                },
                'EKO': {
                    Dewasa: 612000,
                    Anak: 475000,
                    Bayi: 106000
                }
            },
            // Agats
            '835-1-948-1': {
                '1': {
                    Dewasa: 2239000,
                    Anak: 1695000,
                    Bayi: 269000
                },
                '2': {
                    Dewasa: 1835000,
                    Anak: 1392000,
                    Bayi: 229000
                },
                'EKO': {
                    Dewasa: 667000,
                    Anak: 516000,
                    Bayi: 111000
                }
            },
            // Merauke
            '835-1-979-1': {
                '1': {
                    Dewasa: 2304000,
                    Anak: 1743000,
                    Bayi: 276000
                },
                '2': {
                    Dewasa: 1887000,
                    Anak: 1431000,
                    Bayi: 234000
                },
                'EKO': {
                    Dewasa: 685000,
                    Anak: 529000,
                    Bayi: 113000
                }
            },
            // Rute Bitung call-2 (A)
            // Morotai
            '835-2-926-1': {
                '1': {
                    Dewasa: 587000,
                    Anak: 456000,
                    Bayi: 104000
                },
                '2': {
                    Dewasa: 489000,
                    Anak: 382000,
                    Bayi: 94000
                },
                'EKO': {
                    Dewasa: 226000,
                    Anak: 185000,
                    Bayi: 67000
                }
            },
            // Sorong
            '835-2-971-1': {
                '1': {
                    Dewasa: 1168000,
                    Anak: 892000,
                    Bayi: 162000
                },
                '2': {
                    Dewasa: 963000,
                    Anak: 738000,
                    Bayi: 142000
                },
                'EKO': {
                    Dewasa: 405000,
                    Anak: 339000,
                    Bayi: 85000
                }
            },
            // Fak-Fak
            '835-2-976-1': {
                '1': {
                    Dewasa: 1459000,
                    Anak: 1110000,
                    Bayi: 191000
                },
                '2': {
                    Dewasa: 1200000,
                    Anak: 915000,
                    Bayi: 165000
                },
                'EKO': {
                    Dewasa: 466000,
                    Anak: 365000,
                    Bayi: 92000
                }
            },
            // Kaimana
            '835-2-977-1': {
                '1': {
                    Dewasa: 1544000,
                    Anak: 1174000,
                    Bayi: 201000
                },
                '2': {
                    Dewasa: 1270000,
                    Anak: 968000,
                    Bayi: 174000
                },
                'EKO': {
                    Dewasa: 476000,
                    Anak: 373000,
                    Bayi: 95000
                }
            },
            // Timika
            '835-2-983-1': {
                '1': {
                    Dewasa: 1669000,
                    Anak: 1267000,
                    Bayi: 212000
                },
                '2': {
                    Dewasa: 1371000,
                    Anak: 1044000,
                    Bayi: 182000
                },
                'EKO': {
                    Dewasa: 509000,
                    Anak: 397000,
                    Bayi: 95000
                }
            },
            // Agats
            '835-2-948-1': {
                '1': {
                    Dewasa: 2239000,
                    Anak: 1695000,
                    Bayi: 269000
                },
                '2': {
                    Dewasa: 1835000,
                    Anak: 1392000,
                    Bayi: 229000
                },
                'EKO': {
                    Dewasa: 667000,
                    Anak: 516000,
                    Bayi: 111000
                }
            },
            // Merauke
            '835-2-979-1': {
                '1': {
                    Dewasa: 2304000,
                    Anak: 1743000,
                    Bayi: 276000
                },
                '2': {
                    Dewasa: 1887000,
                    Anak: 1431000,
                    Bayi: 234000
                },
                'EKO': {
                    Dewasa: 685000,
                    Anak: 529000,
                    Bayi: 113000
                }
            }
        }
    };

    return harga;
}])
