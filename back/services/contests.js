const mysql = require('../libraries/mysql');

class ContestsService {

    constructor() {
        this.table = 'contests';
    }

    // Gets a contest by url
    getContestByUrl(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                const query = `SELECT * FROM ${this.table} WHERE url = ?`;
                connection.query(query, [url], async (err, results, fields) => {
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

module.exports = ContestsService;