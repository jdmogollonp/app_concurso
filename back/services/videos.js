const mysql = require('../libraries/mysql');

class VideosService {

    constructor() {
        this.table = 'videos';
    }

    // Gets the video information
    getVideoInfo( videoId, idcontest) {
       return new Promise(async (resolve, reject) => {
           try {
               const connection = await mysql.connect();
               const query = `SELECT status, creation_date, message, original_video, converted_video, contestant_id FROM ${this.table} WHERE id = ? AND contest_id = ?`;
               connection.query(query, [videoId, idcontest], (err, results, fields) => {
                   if (err) {
                       console.log(err);
                       return reject(err);
                   } else {
                       resolve(results[0]);
                   }
               });
               connection.release();
           } catch (error) {
               console.log(error);
               reject(error);
           }
       });
    }
    // Gets all the videos from an contest
    getVideos(idcontest) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                const query = `SELECT id, status, creation_date, message, original_video, converted_video, contestant_id FROM ${this.table} WHERE contest_id = ? ORDER BY creation_date DESC`;
                connection.query(query, [idcontest], (err, results, fields) => {
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


    // Creates a new video
    createVideo(contestId, contestantId, originalVideo, message) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mysql.connect();
                let query = `INSERT INTO ${this.table} (contest_id, contestant_id, original_video, message) VALUES (?, ?, ?, ?);`;
                connection.query(query, [contestId, contestantId, originalVideo, message], (err, results, fields) => {
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


module.exports = VideosService;

