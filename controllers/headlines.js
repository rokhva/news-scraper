let scrape = require ("../scripts/scrape");
let makeDate = require("../scripts/date");

let Headline = require("../models/headline");

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
                callback(err, docs);
            });

        });
    },
    delete: function(query, cb){
        Headline.remove(query, cb);
    },
    get: function(query, callback){
        Headline.find(query)
        .sort({
            _id:-1
        })
        .exec(function(err, doc){
            callback(doc);
        })
    },
    update: function(query, callback){
        Headline.update({_id: query.id}, {
            $set: query
        }, {}, callback);
    }
    
}