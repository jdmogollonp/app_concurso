const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const createFolder = require('./libraries/createFolder');
const { port, host, allowedOrigin, processedVideosPath, originalVideosPath, production } = require('./config/index');
const path = require('path');

const originalVideos = path.join(__dirname, originalVideosPath);
createFolder(originalVideos);
app.use(originalVideosPath, express.static(originalVideos));

const processedVideos = path.join(__dirname, processedVideosPath);
createFolder(processedVideos);
app.use(processedVideosPath, express.static(processedVideos));

const authApi = require('./routes/auth');
const contestsApi = require('./routes/contests');

app.use(fileUpload());
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: allowedOrigin
}));

contestsApi(app);
authApi(app);

if (production) {
    app.use(express.static(__dirname + '/../public'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });
    console.log('Running in production mode');
}

app.listen(port, host, () => {
    console.log(`The server is running on http://localhost:${port}`);
});