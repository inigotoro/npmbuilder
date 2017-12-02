var fs = require('fs');

exports.run = () => {    
    readConfig().then((data) => {
        if (data && data.include) {
            data.include.forEach((folderPath) => {
                if (fs.existsSync(folderPath)) {
                    
                } else {
                    console.error(`Error reading included folder. Path: ${folderPath} doesn't exist`);
                }
            });
        }

        // const operations = new Operations(data);
        // operations
        //     .doRollup()
        //     .doClosure()
        //     .doLess()
        //     .doBundle();
    });
}

class Operations {
    constructor(path) {
        this.path = path;
    }

    doRollup() {
        console.log("Doing Rollup", this.path);

        return this;
    }

    doClosure() {
        console.log("Doing Closure", this.path);

        return this;
    }

    doLess() {
        console.log("Doing Less", this.path);

        return this;
    }

    doBundle() {
        console.log("Doing Bundle", this.path);
        
        return this;
    }
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