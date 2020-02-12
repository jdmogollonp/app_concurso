const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const createFolder = require('./libraries/createFolder');
const { port, host, allowedOrigin, processedVideosPath, originalVideosPath } = require('./config/index');
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

app.listen(port, host, () => {
    console.log(`The server is running on http://localhost:${port}`);
});