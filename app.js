const fs = require('fs');
const path = require('path');
const getAllData = require('./getHttpData.js');

const newFilePath = path.resolve(__dirname, 'test.csv');

const urls = [
    'http://cincinnatizoo.org/animals/'
];

// const urls = [
//     'http://cincinnatizoo.org/animals/african-painted-dog/',
//     'http://cincinnatizoo.org/animals/aardvark-2/',
//     'http://cincinnatizoo.org/animals/aardwolf/',
// ];

// const dataSplitters = [
//     ['<h2>', ' <i'],
//     ['"latin_name">(', ')'],
// ];

const dataSplitters = [
    ['<a  class="entry-title-link" rel="bookmark" href="', '"><span>']
];

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

const run = async (urls, dataSplitters) => {
    getAllData(urls, dataSplitters)
        .then((allData) => {
            writeDataToFile(allData);
        })
        .catch((error) => {
            console.log(error);
        });
};

run(urls, dataSplitters);