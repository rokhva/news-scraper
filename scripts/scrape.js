//npm packages
let request = require("request");
let cheerio = require("cheerio");

let scrape = function(callBack){

    request("https://www.nytimes.com/", function(err, res, body){

        let $ = cheerio.load(body);
        
        let articles = [];

        $(".theme-summary").each(function(i, element){

            let header = $(this).children(".story-heading").text().trim();

            let summary = $(this).children(".summary").text().trim();

            if (header && summary){
                let neatHeader = header.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                let neatSummary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                let dataToAdd = {
                    headline: neatHeader,
                    summary: neatSummary
                };
            }
            articles.push(dataToAdd);
        });
        callBack(articles);
    });
};

module.exports = scrape;