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

        // Checks to make sure the line of data has at least one value. If it does,
        // the csvLine is created and pushed onto allData.
        if (individualValues.some((element) => element !== '')) {
            const csvLine = individualValues.join();
            allData.push(csvLine);
        }
    });
};

const getDataFromPage = (url, dataSplitters) => {
    const request = http.request(url, (res) => getDataFromRequest(res, dataSplitters));
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};

/**
 * Scrapes data from the provide page urls using the dataSplitters, and returns them as comma separated values in separate lines
 * @param {String[]} urls - An array of the urls of the pages to scrape 
 * @param {Array.<String[]>} dataSplitters - Array of data splitters.
 * Each data splitter is an array that contains two strings: the html before the desired text to capture,
 * and the html after the desired text to capture. Example dataSplitters argument:
 * [ ['&lt;a&gt;', '&lt;/a&gt;'], ['&lt;p&gt;', '&lt;/p&gt;'] ]
 * @returns {Promise} Promise object that represents the comma separated data scraped from the provided urls in separate lines
 */
function getAllData (urls, dataSplitters) {
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
