$(document).ready(function() {
    
    //create a variable for the news sources array
    var newsSources = [];

    //Variables for categories and the top headlines api url
    var category = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

    function shuffleArray() {
        for(var i = category.length -1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var test = category[i];
            category[i] = category[j];
            category[j] = test;
            console.log(test);
        }
    }

    $('#search-button').click(function(event) {
      event.preventDefault();

    //   function dumpNews() {

        //get the keyword term from the input search bar
        var term = $('#term').val().trim();
            //clear the called articles if exist
            $('#headlinesContainer').empty();
            //Variables for keyword and API url
            var queryURL = "https://newsapi.org/v2/everything?q=" + term + "&pageSize=50&sources=al-jazeera-english,bbc-news,cnn,fortune,fox-news,msnbc,rt,the-economist,the-new-york-times,the-wall-street-journal,the-washington-post,vice-news,time,the-huffington-post,reuters,reddit-r-all,buzzfeed" + "&apiKey=8f648fabfb73464184ecb3df91ad60f5"
            console.log(queryURL);
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
                }
                $('#term').val("");
            });
    // } 
      
    });
 
    //Create a function to grab 3 random top head\
    function topHeadlines(){
        
        for(var i = 0; i < 3; i++){
        
        //Variables for categories and the top headlines api url
        // var category = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

        shuffleArray();

        var queryURL = "https://newsapi.org/v2/top-headlines?category=" + category[i] + "&country=us&pageSize=1&apiKey=8f648fabfb73464184ecb3df91ad60f5"
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                for(var i = 0; i < response.articles.length; i++) {
                    //make headline variables
                    var headlineSource = response.articles[i].source.name;
                    var headlineTitle = response.articles[i].title;
                    var headlineImage = response.articles[i].urlToImage;
                    console.log(headlineImage);
                    var headlineURL = response.articles[i].url;
                    // make DOM variable containers
                    var headlinesDiv = $('<div class="col-4">');
                    //create variable to write to html
                    var source = $('<h6>').text(headlineSource);
                    var URLtag = $('<a>').attr({
                        "href": headlineURL,
                        "target": "_blank"
                    });
                    var title = $('<h5>').text(headlineTitle);
                    var image = $('<img class="img-fluid">').attr("src", headlineImage);
                    URLtag.append(title);
                    URLtag.append(image);
                    //append to the DOM
                    headlinesDiv.append(source);
                    headlinesDiv.append(URLtag);
                    $('#top-headlines').append(headlinesDiv);
                }
        });
    }
}

topHeadlines();
// shuffleArray();

// dumpNews();

});

