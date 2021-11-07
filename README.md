# Basic_Web_Scraper
A basic web scraper that, given html tags found on a specific website, returns a .csv file of the data surrounded by the provided html tags.

### Usage:
1. Open the `app.js` file and enter the name of the new CSV file you would like to create (by default, the file is named `test.csv`)
2. Enter the URL of the page(s) you would like to scrape in the `urls.js` file
3. Enter the HTML tags that surround the text you would like to capture in the `dataSplitters.js` file
4. Run the application by executing the `node app.js` command, and the pages at the URLs you entered will be scraped
and the results will be saved in the CSV file you named in Step 1.

_Note: The HTML tags need to be entered as a 'pair' in an array that is contained in the `dataSplitters` array._

_Example:_
```JavaScript
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
```

