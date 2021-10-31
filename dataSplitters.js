// Each array in <dataSplitters> contains two strings: the first is the html before
// the text you want to grab, and the second is the html after. They are the "bookends"
// for the text to keep. Each dataSplitter will be used on every page of the urls from the urls.js file
const dataSplitters = [
    ['<h2>', ' <i'],
    ['"latin_name">(', ')'],
    ['Length:</strong> ', '</li>'],
    ['Weight:</strong> ', '</li>'],
    ['Lifespan:</strong> ', '</li>'],
    ['Habitat:</strong> ', '</li>'],
    ['Diet:</strong> ', '</li>'],
    ['Range:</strong> ', '</li>'],
];

module.exports = dataSplitters;