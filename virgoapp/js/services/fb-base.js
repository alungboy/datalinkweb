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
        if (!startDate || startDate.length !== 14) {
            sync = sync.orderByChild('StatusTgl').startAt(100000000000000).endAt(199999999999999);
        } else {
            sync = sync.orderByChild('StatusTgl').startAt(parseInt('1' + startDate)).endAt(199999999999999);
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
        if (!startDate || startDate.length !== 14) {
            sync = sync.orderByChild('StatusTgl').startAt(200000000000000).endAt(299999999999999);
        } else {
            sync = sync.orderByChild('StatusTgl').startAt(parseInt('2' + startDate)).endAt(299999999999999);
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
            date = moment().format('YYYYMMDD');

        }
        pageSize = parseInt(pageSize);
        if (!pageSize || pageSize < 50) {
            pageSize = 50;
        }

        var dStart = parseInt('2' + date + '000000');
        var dEnd = parseInt('2' + date + '999999');
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd).limitToLast(pageSize);

        return $firebase(sync).$asArray();
    }

    return get;
}])

.service("TiketPelniIssuedMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');


        if (date == null || date == '' || date.length !== 8) {
            var monthYear = moment().format('YYYYMM');
            var endDate = moment().endOf('month').format('DD');
        } else {
            var monthYear = moment(date, 'YYYYMMDD').format('YYYYMM');
            var endDate = moment(date, 'YYYYMMDD').endOf('month').format('DD');
        }


        var dStart = parseInt('2' + monthYear + '01' + '000000');
        var dEnd = parseInt('2' + monthYear + endDate + '999999');
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
            var monthYear = moment().format('YYYYMM');
            var endDate = moment().endOf('month').format('DD');
        } else {
            var monthYear = moment(date, 'YYYYMMDD').format('YYYYMM');
            var endDate = moment(date, 'YYYYMMDD').endOf('month').format('DD');
        }


        var dStart = parseInt('4' + monthYear + '01' + '000000');
        var dEnd = parseInt('4' + monthYear + endDate + '999999');
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd);
        return $firebase(sync).$asArray();
    }
    return get;
}])

.service("TiketPelniCancelMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');


        if (date == null || date == '' || date.length !== 8) {
            var monthYear = moment().format('YYYYMM');
            var endDate = moment().endOf('month').format('DD');
        } else {
            var monthYear = moment(date, 'YYYYMMDD').format('YYYYMM');
            var endDate = moment(date, 'YYYYMMDD').endOf('month').format('DD');
        }


        var dStart = parseInt('3' + monthYear + '01' + '000000');
        var dEnd = parseInt('3' + monthYear + endDate + '999999');
        sync = sync.orderByChild('StatusTgl').startAt(dStart).endAt(dEnd);
        return $firebase(sync).$asArray();
    }
    return get;
}])

.service("TiketPelniMissingMonthArr", ['Fbase', "$firebase", function(Fbase, $firebase) {
    var get = function(date) {
        var sync = Fbase.child('tiketpelni');


        if (date == null || date == '' || date.length !== 8) {
            var monthYear = moment().format('YYYYMM');
            var endDate = moment().endOf('month').format('DD');
        } else {
            var monthYear = moment(date, 'YYYYMMDD').format('YYYYMM');
            var endDate = moment(date, 'YYYYMMDD').endOf('month').format('DD');
        }


        var dStart = parseInt('5' + monthYear + '01' + '000000');
        var dEnd = parseInt('5' + monthYear + endDate + '999999');
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

.service("InvoicePelniSingleObj", ['Fbase', "$firebase", function(Fbase, $firebase) {

    var get = function(idInvoicePelni) {

        if (!idInvoicePelni || idInvoicePelni == '') {
            var obj = Fbase.child('invoicepelni').child('-Jfh4rsvTaCz9FOVhFvf');
        } else {
            var obj = Fbase.child('invoicepelni').child(idInvoicePelni);
        }
        return $firebase(obj).$asObject();
    };


    return get;
}])
