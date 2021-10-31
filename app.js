const fs = require('fs');
const path = require('path');
const getAllData = require('./getHttpData.js');

const newFilePath = path.resolve(__dirname, 'test.csv');

const handleError = (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('File written successfully!');
    }
};

const writeDataToFile = (allData) => {
    const allDataToWrite = allData.reduce((allData, data) => {
        allData += '\n' + data;
        return allData;
    });

    fs.writeFile(newFilePath, allDataToWrite, handleError);
};

const run = async () => {
    getAllData()
        .then((allData) => {
            writeDataToFile(allData);
        })
        .catch((error) => {
            console.log(error);
        });
};

run();