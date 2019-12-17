//npm packages
let request = require("request");
let cheerio = require("cheerio");

let scrape = function(callBack){

    request("https://www.nytimes.com/", function(err, res, body){

        let $ = cheerio.load(body);
        
        let articles = [];

        $(".assetWrapper").each(function(i, element) {
            // In each article section, we grab the headline, URL, and summary
      
            // Grab the headline of the article
            var head = $(this)
              .find("h2")
              .text()
              .trim();
      
            // Grab the URL of the article
            var url = $(this)
              .find("a")
              .attr("href");
      
            // Grab the summary of the article
            var sum = $(this)
              .find("p")
              .text()
              .trim();
      
            // So long as our headline and sum and url aren't empty or undefined, do the following
            if (head && sum && url) {
              // This section uses regular expressions and the trim function to tidy our headlines and summaries
              // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
              var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
              var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
      
              // Initialize an object we will push to the articles array
              var dataToAdd = {
                headline: headNeat,
                summary: sumNeat,

              };
      
              // Push new article into articles array
              articles.push(dataToAdd);
            }
          });

        // $(".theme-summary").each(function(i, element){

        //     let header = $(this).children(".story-heading").text().trim();

        //     let summary = $(this).children(".summary").text().trim();

        //     if (header && summary){
        //         let neatHeader = header.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        //         let neatSummary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        //         let dataToAdd = {
        //             headline: neatHeader,
        //             summary: neatSummary
        //         };
        //     }
        //     articles.push(dataToAdd);
        // });
        callBack(articles);
    });
};

module.exports = scrape;