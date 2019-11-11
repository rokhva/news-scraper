$(document).ready(function(){

    let articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage(){
        articleContainer.empty();
        $.get("/api/headlines?saved=true").then(function(data){
            if(data && data.length){
                renderArticles(data);
            }else{
                renderEmpty();
            }
        });
    }

    function renderEmpty(){
        let emptyAlert = $(
            [
              "<div class= 'alert alert-warning text-center'>",
              "<div>",
              "<div class = 'panel panel-default'>",
              "<div class = 'panel-heading text-center'>",
              "<h3>Would you like to browse available articles?</h3>",
              "<div/>",
              "<div class = 'panel-body text-center'</div>",
              "<h4><a href ='/'>Browse Articles</a></h4>",
              "</div>",
              "</div>"
            ].join("")
          );
          articleContainer.append(emptyAlert);
    }

    function renderArticles(articles){
        let articlePanels = [];

        for(let i=0; i<articles.length; i++){
            articlePanels.push(createPanel(articles[i]));
        }
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

      function handleArticleDelete(){
          let articleToDelete = $(this).parents(".panel").data();

          $.ajax({
              method: "DELETE",
              url: "/api/headlines/" +articleToDelete._id
          }).then(function(data){
              if(data.ok){
                  initPage();
              }
          })
      }
})