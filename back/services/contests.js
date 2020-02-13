const mysql = require('../libraries/mysql');

class ContestsService {

    constructor() {
        this.table = 'contests';
    }

    // Gets a contest by url
    getIdContestByUrl(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                const query = `SELECT id FROM ${this.table} WHERE url = ?`;
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

    // Cretates new contest by the admin
    createContest( idadmin, { name, image, url, start_date, end_date, description }) { return new Promise(async (resolve, reject) => {
          try {
              const connection = await mysql.connect();
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
      });}
    // Updates an contest by the admin
    updateContests(idadmin, idcontest, { name, image, url, start_date, end_date, description }) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                let query = `UPDATE ${this.table} SET name = ?, image = ?, url = ?, start_date = ?, end_date = ?,  description = ? WHERE id = ? AND administrator_id = ?;`;
                connection.query(query, [name, image, url, start_date, end_date, description, idcontest, idadmin], (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        if (results.affectedRows) {
                            resolve(results.affectedRows);
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

    // Gets all contest
    getContests() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                const query = `SELECT * FROM ${this.table}`;
                connection.query(query, [], async (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        resolve(results);
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


