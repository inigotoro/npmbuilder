let fs = require('fs');
let Operations = require('./Operations');

exports.run = () => {
    readConfig().then((data) => {
            if (data && data.include) {
                data.include.forEach((folderPath) => {
                    if (fs.existsSync(folderPath)) {
                        crawlDirectory(folderPath);
                    } else {
                        console.error(`Error reading included folder. Path: ${folderPath} doesn't exist`);
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function crawlDirectory(path) {
    const files = fs.readdirSync(path);

    files.forEach((folderName) => {
        const operations = new Operations(path, folderName);
        operations
            .doRollup().then(() => {
                operations.doClosure()
                    .doLess()
                    .doBundle()
                    .doCleanup();
            });
    });
}

function readConfig() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync('npmbuilder.json')) {
            fs.readFile('npmbuilder.json', 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(data));
            });
        } else {
            resolve({
                "include": ["./components"],
                "exclude": []
            });
        }
    });
}