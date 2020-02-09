const mysql = require('../libraries/mysql');

class AdministratosService {

    constructor() {
        this.table = 'administrators';
    }

    // Gets an administrator
    getAdministrator(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                const query = `SELECT * FROM ${this.table} WHERE email = ?`;
                connection.query(query, [email], async (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        resolve(results[0] ? results[0] : null);
                    }
                });
                connection.release();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    // Creates a new administrator
    createAdministrator(email, password, name, lastName) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                let query = `INSERT INTO ${this.table} (email, name, last_name, password) VALUES (?, ?, ?, ?);`;
                connection.query(query, [email, name, lastName, password], (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        if (results.insertId) {
                            resolve(results.insertId);
                        } else {
                            resolve(null);
                        }
                    }
                });
                connection.release();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
}

module.exports = AdministratosService;
