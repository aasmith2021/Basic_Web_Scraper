const http = require('http');

let allData = [];

const getDataFromRequest = (res, dataSplitters) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const individualValues = [];
        for (const splitterPair of dataSplitters) {
            if (data.includes(splitterPair[0]) && data.split(splitterPair[0])[1].includes(splitterPair[1])) {
                individualValues.push(data.split(splitterPair[0])[1].split(splitterPair[1])[0]);
            } else {
                individualValues.push('');
            }
        }

        console.log(individualValues);

        // Checks to make sure the line of data has at least one value. If it does,
        // the csvLine is created and pushed onto allData
        if (individualValues.some((element) => element !== '')) {
            const csvLine = individualValues.join();
            allData.push(csvLine);
        }

        // let name = '';
        // let latinName = '';
        // if (data.includes('<h2>') && data.split('<h2>')[1].includes(' <i')) {
        //     name = data.split('<h2>')[1].split(' <i')[0];
        // }

        // if (data.includes('"latin_name">(') && data.split('"latin_name">(')[1].includes(')')) {
        //     latinName = data.split('"latin_name">(')[1].split(')')[0];
        // }

        // if (name || latinName) {
        //     csvLinePieces.push(name);
        //     csvLinePieces.push(latinName);
        //     const csvString = csvLinePieces.join();
        //     allData.push(csvString);
        // }
    });
};

const getDataFromPage = (url, dataSplitters) => {
    const request = http.request(url, (res) => getDataFromRequest(res, dataSplitters));
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};

const getAllData = (urls, dataSplitters) => {
    for (const i in urls) {
        setTimeout(() => getDataFromPage(urls[i], dataSplitters), (i * 200));
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Checks to make sure allData contains content and that none of its elements are empty lines
            if (allData.length > 0 && allData.reduce(
                (previousValue, currentElement) => {
                    if (previousValue && currentElement) {
                        return previousValue;
                    } else {
                        return false;
                    }
                }, true)
            ) {
                console.log(allData);
                resolve(allData);
            } else {
                console.log(allData);
                reject('There was an error getting the data.');
            }
        }, (200 * urls.length) + 1000);
    })
};

module.exports = getAllData;
