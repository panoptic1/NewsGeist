$(document).ready(function() {
    
    //Create a function to grab 3 random top head\
    function topHeadlines(){
        for(var i=0; i < 3; i++){
            
            //Variables for categories and the top headlines api url
            var category = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
            var queryURL = "https://newsapi.org/v2/top-headlines?category=" + category[i] + "&pageSize=1&apiKey=8f648fabfb73464184ecb3df91ad60f5"
            $.ajax({
                url: queryURL,
                method: "GET"
             }).then(function(response) {
                // console.log(response);
               // console.log(response.articles[0].source.name);
               // console.log(response.articles[0].author);
               console.log(response.articles[0].title);
               // console.log(response.articles[0].description);
               // console.log(response.articles[0].url);
               // console.log(response.articles[0].publishedAt);
   
               for(var i = 0; i < response.articles.length; i++) {
                   //make article variables
                   var articleSource = response.articles[i].source.name;
                   // if(newsSources.includes(articleSource) === false) {
                   //     newsSources.push(articleSource);
                   //     console.log(newsSources);
                   // }
                   var articleTitle = response.articles[i].title;
                   var articleDescription = response.articles[i].description;
                   var articleURL = response.articles[i].url;
                   var articleDate = response.articles[i].publishedAt;
                   // make DOM variable containers
                   var newsDiv = $('<div class="m-2">');
                   //create variable to write to html
                   var source = $('<h6>').text(articleSource);
                   var URLtag = $('<a>').attr({
                       "href": articleURL,
                       "target": "_blank"
                   });
                   var title = $('<h5>').text(articleTitle);
                   URLtag.append(title);
                   var summary = $('<p>').text(articleDescription);
                   //append to the DOM
                   newsDiv.append(source);
                   newsDiv.append(URLtag);
                   newsDiv.append(summary);
                   $('#headlinesContainer').append(newsDiv);
             });
        }
    }

    topHeadlines();

    $('#search-button').click(function() {
      var term = $('#term').val();
      alert(term);
    });
  });




function dumpNews() {
    var keyword = "obama"
    //Variables for key

    var queryURL = "https://newsapi.org/v2/everything?q=" + keyword + "&pageSize=50&sources=al-jazeera-english,bbc-news,cnn,fortune,fox-news,msnbc,rt,the-economist,the-new-york-times,the-wall-street-journal,the-washington-post,vice-news,time,the-huffington-post,reuters,reddit-r-all,buzzfeed" + "&apiKey=8f648fabfb73464184ecb3df91ad60f5"
       console.log(queryURL);
       $.ajax({
           url: queryURL,
           method: "GET"
        }).then(function(response) {
           console.log(response);
        });
    };

dumpNews();

