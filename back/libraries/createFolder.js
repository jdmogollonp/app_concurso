const fs = require('fs');

const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`Folder created: ${folder}`);
    }
};

module.exports = createFolder;