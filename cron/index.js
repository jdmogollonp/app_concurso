require('dotenv').config();
const nodeMailer = require('nodemailer');
const mysql = require('mysql');
const express = require('express');
const app = express();
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;
const proccesedFolder = process.env.PROCESSED_VIDEOS_PATH;
const port = process.env.PORT || 3002;
const cronTime = process.env.CRON_TIME || '* */5 * * * *';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    timezone: 'UTC+0'
});

const connect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                return reject(error)
            }
            resolve(connection);
        });
    });
}

// ffmpeg input.avi -c:v h264 -c:a aac output.mp4

const executeTask = ({ id, original_video, email, name, last_name }) => {
    if (fs.existsSync(path.join('..', original_video))) {
        const contestUrl = original_video.split('/')[4].split('_')[0];
        const newFileName = `${proccesedFolder}/${contestUrl}_${new Date().getTime()}.mp4`;
        const command = `ffmpeg -i ${path.join('..', original_video)} -c:v h264 -c:a aac ${path.join('..', newFileName)}`;
        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.log(`------------ Command error ------------`);
                console.log(error.message);
                return;
            }

            if (fs.existsSync(path.join('..', newFileName))) {
                const connection = await connect();
                connection.query('UPDATE videos SET converted_video = ?, status = 1', [newFileName], (err, results, fields) => {
                    if (err) {
                        console.log('Error while updating video url');
                        console.log(err);
                    } else {
                        console.log(`Video with id ${id} updated`);
                    }
                });
                connection.release();
            } else {
                console.log(`------------ Error: Processed video not saved for "${original_video}" ------------`);
            }
        });
    } else {
        console.log(`------------ Error: Video "${original_video}" is not present ------------`);
    }
};


const taskExecution = async () => {
    console.log('------------  Running Cron Job on ' + new Date() + '  ------------');
    try {
        const connection = await connect();
        connection.query('SELECT * FROM videos v JOIN contestants c ON v.contestant_id = c.id WHERE status = 0', (err, results, fields) => {
            if (err) {
                console.log('Error while getting data');
                console.log(err);
            } else {
                console.log('------------  Videos to process: ' + results.length + '  ------------');

                results.forEach(video => {
                    executeTask(video);
                });
            }
        });
        connection.release();
    } catch (error) {
        console.log('Error while running Cron');
        console.log(error);
    }
};

const job = new CronJob(cronTime, () => {
    taskExecution();
});

taskExecution();
job.start();

app.listen(port, () => {
    console.log(`Cron is running on ${port}`);
});

