let scrape = require ("../scripts/scrape");
let makeDate = require("../scripts/date");

let Headline = require("../models/Headline");

module.exports = {
    fetch: function(callback){
        scrape(function(data){
            let articles = data;
            
            // for( let i=0; i < articles.length; i++){
            //     articles[i].date = makeDate();
            //     articles[i].saved = false;
            // }

            articles.forEach(element => {
                element.date = makeDate();
                element.saved = false;
            })

            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cd(err, docs);
            });

        });
    },
    
}