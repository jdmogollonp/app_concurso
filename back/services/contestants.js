const mysql = require('../libraries/mysql');

class ContestantsService {

    constructor() {
        this.table = 'contestants';
    }

    // Creates or updates a contestant
    createContestant(email, name, lastName) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                const query = `INSERT INTO ${this.table} (email, name, last_name) VALUES(?, ?, ?)`;
                connection.query(query, [email, name, lastName], async (err, results, fields) => {
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

    // Gets a contestant by email
    getContestantByEmail(email) {
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
}

module.exports = ContestantsService;