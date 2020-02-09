const db = require('../libraries/mysql');
class ContestService {
  constructor(){
    this.table = 'contests'
    return this.table
  }
  createContest( idadmin, { name, image, url, start_date, end_date, description }) {
        console.log("test3");
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await db.connect();
                let query = `INSERT INTO ${this.table} (name, image, url, start_date, end_date, description, administrator_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
                connection.query(query, [name, image, url, start_date, end_date, description, idadmin], (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        console.log(results);
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
module.exports = ContestService;
