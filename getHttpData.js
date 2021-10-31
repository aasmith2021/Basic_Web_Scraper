const http = require('http');
const urls = require('./urls');

let allData = [];

const getDataFromRequest = (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const csvLinePieces = [];
        let name = '';
        let latinName = '';
        if (data.includes('<h2>') && data.split('<h2>')[1].includes(' <i')) {
            name = data.split('<h2>')[1].split(' <i')[0];
        }

        if (data.includes('"latin_name">(') && data.split('"latin_name">(')[1].includes(')')) {
            latinName = data.split('"latin_name">(')[1].split(')')[0];
        }

        if (name || latinName) {
            csvLinePieces.push(name);
            csvLinePieces.push(latinName);
            const csvString = csvLinePieces.join();
            allData.push(csvString);
        }
    });
};

const getDataFromPage = (url) => {
    const request = http.request(url, getDataFromRequest);
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};

const getAllData = () => {
    for (const i in urls) {
        setTimeout(() => getDataFromPage(urls[i]), (i * 100));
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (allData.length > 0 && allData.reduce((previousValue, currentElement) => {
                if (previousValue && !currentElement) {
                    return false;
                } else {
                    return previousValue;
                }
            }, true)) {
                resolve(allData);
            } else {
                reject('There was an error getting the data.');
            }
        }, (100 * urls.length) + 1000);
    })
};

module.exports = getAllData;
