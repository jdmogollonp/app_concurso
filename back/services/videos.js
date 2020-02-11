const mysql = require('../libraries/mysql');

class VideosService {

    constructor() {
        this.table = 'videos';
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