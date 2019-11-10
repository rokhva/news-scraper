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
});
