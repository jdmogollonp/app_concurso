require('dotenv').config();
const nodeMailer = require('nodemailer');
const mysql = require('mysql');
const express = require('express');
const app = express();
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const proccesedFolder = process.env.PROCESSED_VIDEOS_PATH;
const port = process.env.PORT || 3002;
const cronTime = process.env.CRON_TIME || '*/2 * * * *';

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
        const newFileName = `${proccesedFolder}/${contestUrl}_${id}.mp4`;
        const command = `ffmpeg -i ${path.join('..', original_video)} -c:v h264 -c:a aac -strict -2 ${path.join('..', newFileName)}`;
        exec(command, async (error, stdout, stderr) => {
            if (fs.existsSync(path.join('..', newFileName))) {
                const connection = await connect();
                connection.query('UPDATE videos SET converted_video = ?, status = 1 WHERE id = ?', [newFileName, id], (err, results, fields) => {
                    if (err) {
                        console.log('------------ Error while updating video url ------------');
                        console.log(err);
                    } else {
                        console.log(`------------ Video with id ${id} updated. Sending email ------------`);
                        sendMail(email, name, last_name, contestUrl)
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
        connection.query('SELECT * FROM videos WHERE status = 0', (err, results, fields) => {
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

cron.schedule(cronTime, () => {
    taskExecution();
});

taskExecution();

const sendMail = (email, name, last_name, contestUrl) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: 'Smart Tools', // sender address
        to: email, // list of receivers
        subject: "SmartTools - !Tu video ha sido publicado!", // Subject line
        html:
            `<h3>¡Hola ${name} ${last_name}! 😃</h3>
    <p>Te queremos informar que tu video ha sido publicado en la página de nuestro concurso.</p>
    <p>Puedes ingresar al muro del concurso por medio de este <a href="${process.env.CONTEST_URL}${contestUrl}">enlace</a></p>
    `
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions);
};

app.listen(port, () => {
    console.log(`Cron is running on ${port}`);
});
