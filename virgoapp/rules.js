{
    "rules": {
        ".read": false,
        ".write": false,
        "tiketpelni": {
            ".indexOn": ["CreatedAt", "CreatedBy", "NoTiket", "Status", "StatusTgl", "LastStokOpName", "RegCetak"],
            ".read": "auth.uid !== null && root.child('users').child(auth.uid).child('Accept').val() === true",
            ".write": "auth.uid !== null && root.child('users').child(auth.uid).child('Accept').val() === true && newData.exists()",
            "$noTiket": {
                "CreatedAt": {
                    ".validate": "newData.exists() && !data.exists() && newData.val() >= now"
                },
                "CreatedBy": {
                    ".validate": "newData.exists() && !data.exists() && newData.val() === auth.uid"
                },
                "NoTiket": {
                    ".validate": "newData.exists() && !data.exists() &&  newData.isNumber() && newData.val() == $noTiket && newData.val() >= 1000000001 && newData.val() <= 1999999999"
                },
                "Status": {
                    ".validate": "newData.exists() &&  newData.isNumber() && newData.val() >= 0 && newData.val() <= 4"
                },
                "StatusTgl": {
                    ".validate": "newData.exists() && newData.isString()"
                },
                "LastStokOpName": {
                    ".validate": "newData.exists() && newData.isString()"
                },
                "RegCetak": {
                    ".validate": "newData.exists() && !data.exists() && newData.isBoolean() && newData.val() === true"
                },
                "$other": {
                    ".validate": false
                }
            }

        },
        "users": {
            ".read": "auth.uid !== null && root.child('users').child(auth.uid).child('Accept').val() === true",
            "$userId": {
                ".write": "auth.uid !== null && $userId === auth.uid && newData.exists()",
                "Role": {
                    ".validate": false
                },
                "Accept": {
                    ".validate": false
                },
                "$other": {
                    ".validate": "newData.exists() && newData.isString()"
                }

            }

        },
        "$others": {
            ".read": false,
            ".write": false,
            ".validate": false
        }

    }
}
