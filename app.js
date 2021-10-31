const fs = require('fs');
const path = require('path');
const urls = require('./getUrls.js');
const dataSplitters = require('./dataSplitters.js');
const getAllData = require('./getHttpData.js');

const newFilePath = path.resolve(__dirname, 'test.csv');

const handleError = (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('File written successfully!');
    }
};

const writeDataToFile = async (allData) => {
    const allDataToWrite = allData.reduce((allData, data) => {
        allData += '\n' + data;
        return allData;
    });

    fs.writeFile(newFilePath, allDataToWrite, handleError);
};

const run = async (urls, dataSplitters) => {
    try {
        const allData = await getAllData(urls, dataSplitters);
        await writeDataToFile(allData);
    } catch (e) {
        console.log(e.message);
    }
};

run(urls, dataSplitters);