let scrape = require("../scripts/scrape");

let headlinesController = require("../controllers/headlines");
let notesController = require("../controllers/notes");

module.exports = router => {
  //renders homepage
  router.get("/", (req, res) => {
    res.render("home");
  });

  //renders saved articles
  router.get("/saved", (req, res) => {
    res.render("saved");
  });

  router.get("/api/fetch", function(req, res) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "Nope no new news"
        });
      } else {
        res.json({
          message: `"Added ${docs.insertedCount} new articles"`
        });
      }
    });
  });

  router.get("/api/headlines", function(req, res){
      let query = {};

      if(req.query.saved){
          query = req.query;
      }
      else{
          headlinesController.get(query, function(data){
              res.json(data);
          });
      }
  });

  router.delete("/api/headlines/:id", function(req, res){
      let query = {};
      query._id = req.params.id;
      headlinesController.delete(query, function(err, data){
          res.json(data);
      });
  });

  router.patch("/api/headlines", function(req, res){
      headlinesController.update(req.body, function(err, data){
          res.json(data);
      });
  });

  router.get("/api/notes/:headline_id?", function(req, res){
      let query = {};

      if(req.params.headline_id){
          query._id = req.params.headline_id;
      } else{
          notesController.get(query, function(err, data){
              res.json(data);
          })
      }
  });

  router.delete("api/notes/:id", function(req, res){
      let query = {};
      query._id = req.params.id;
      notesController.delete(query, function(err, data){
          res.json(data);
      });
  });

  router.post("/api/notes", function(req, res){
      notesController.save(req.body, function(data){
          res.json(data);
      });
  });
};
