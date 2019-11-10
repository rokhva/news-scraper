$(document).ready(function() {
  let articleContainer = $(".article-container");
  $(document).on("click", "btn.save".handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  function renderEmpty() {
    let emptyAlert = $(
      [
        "<div class= 'alert alert-warning text-center'>",
        "<div>",
        "<div class = 'panel panel-default'>",
        "<div class = 'panel-heading text-center'>",
        "<h3>What would you like to do?</h3>",
        "<div/>",
        "<div class = 'panel-body text-center'</div>",
        "<h4><a class ='scrape-new'>Try scraping new articles</a></h4>",
        "<h4><a href ='/saved'>Go to saved articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    articleContainer.append(emptyAlert);
  }

  function renderArticles(articles) {
    let articlePanels = [];

    articles.forEach(article => {
      articlePanels.push(article);
    });
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    let panel = $(
      [
        "<div class= 'panel panel-default'>",
        "<div class= 'panel-heading'>",
        "<h3>",
        article.headline,
        "<a class= 'btn btn-success save'>",
        "Save Article",
        "<a/>",
        "</h3>",
        "</div>",
        "<div class= 'panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );

    panel.data("_id", article._id);
    return panel;
  }

  function handleArticleSave(){
      let articleToSave = $(this).parents(".panel").data();
      articleToSave.saved = true;

      $.ajax({
          method: "PATCH",
          url: "/api/headlines",
          data: articleToSave
      })
      .then(function(data){
          if(data.ok){
              initPage();
          }
      });
  }

  function handleArticleScrape(){

    $.get("/api/fetch")
    .then(function(data){
        initPage();
        bootbox.alert("<h3 class = 'text-center m-top-80'>" + data.message + "</h3>");
    });
  }
});
