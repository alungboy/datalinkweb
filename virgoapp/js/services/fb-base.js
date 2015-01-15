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

.service("TiketPelniBaikArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(startDate, pageSize, asc) {
        if (!pageSize) {
            pageSize = 10;
        }
        var sync = Fbase.child('tiketpelni');
        if (!startDate || startDate.length !== 15) {
            sync = sync.orderByChild('StatusTgl').startAt('000000000000000').endAt('09999999999999');
        } else {
            sync = sync.orderByChild('StatusTgl').startAt('0' + startDate).endAt('09999999999999');
        }

        if (!asc || asc == '' || asc == 0) {
            sync = sync.limitToLast(pageSize);
        } else {
            sync = sync.limitToFirst(pageSize);
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
        if (!startDate || startDate.length !== 15) {
            sync = sync.orderByChild('StatusTgl').startAt('100000000000000').endAt('19999999999999');
        } else {
            sync = sync.orderByChild('StatusTgl').startAt('1' + startDate).endAt('19999999999999');
        }

        if (!asc || asc == '' || asc == 0) {
            sync = sync.limitToLast(pageSize);
        } else {
            sync = sync.limitToFirst(pageSize);
        }

        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniIssuedDayArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');

        if (date == null || date == '' || date.length < 6) {
            date = moment().format('YYYYMMDD');

        }

        var dStart = '1' + date + '000000';
        var dEnd = '1' + date + '999999';
        console.log(dStart, dEnd);
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd).limitToFirst(500);
        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniIssuedMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');


        if (date == null || date == '' || date.length < 6) {
            var monthYear = moment().format('YYYYMM');
            var endDate = moment().endOf('month').format('DD');
        } else {
            var monthYear = moment(date, 'YYYYMMDD').format('YYYYMM');
            var endDate = moment(date, 'YYYYMMDD').endOf('month').format('DD');
        }


        var dStart = '1' + monthYear + '01' + '000000';
        var dEnd = '1' + monthYear + endDate + '999999';
        console.log(dStart, dEnd);
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd).limitToFirst(500);
        return $firebase(sync).$asArray();
    }
    return get;
}])

.service("TiketPelniPrintedArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(startDate, pageSize, asc) {
        if (!pageSize) {
            pageSize = 10;
        }
        var sync = Fbase.child('tiketpelni');
        if (!startDate || startDate.length !== 15) {
            sync = sync.orderByChild('StatusTgl').startAt('200000000000000').endAt('29999999999999');
        } else {
            sync = sync.orderByChild('StatusTgl').startAt('2' + startDate).endAt('29999999999999');
        }

        if (!asc || asc == '' || asc == 0) {
            sync = sync.limitToLast(pageSize);
        } else {
            sync = sync.limitToFirst(pageSize);
        }

        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniPrintDayArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');

        if (date == null || date == '' || date.length < 6) {
            date = moment().format('YYYYMMDD');
        }

        var dStart = '2' + date + '000000';
        var dEnd = '2' + date + '999999';

        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd);
        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniPrintMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');

        if (date == null || date == '' || date.length < 6) {
            var monthYear = moment().format('YYYYMM');
            var endDate = moment().endOf('month').format('DD');
        } else {
            var monthYear = moment(date, 'YYYYMMDD').format('YYYYMM');
            var endDate = moment(date, 'YYYYMMDD').endOf('month').format('DD');
        }

        var dStart = '2' + monthYear + '01' + '000000';
        var dEnd = '2' + monthYear + endDate + '999999';
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

.service("InvoicePelniSingleObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(idInvoicePelni) {

        var obj = $firebase(Fbase.child('invoicepelni').child(idInvoicePelni));

        return obj.$asObject();
    };

    return get;
}])
