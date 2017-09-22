var mysql = require('mysql');

function dbcomm() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodedacs2017'
    });

    connection.connect(function (err) {
        if (err) {
            console.log("Error connecting database ... nn");
        }
    });

    return connection;
}

module.exports = dbcomm;