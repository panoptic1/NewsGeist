$(document).ready(function() {

    var sources = [
        "the-new-york-times",
        "al-jazeera-english",
        "reuters"
    ]
    
    var results = [];
    
    var newQueryURL = [];
    
    //create a variable for the news sources array
    var newsSources = [];


    $('#search-button').click(function(event) {
      event.preventDefault();

    //   function dumpNews() {

        var term = $('#term').val().trim();
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
                    var title = $('<h5>').text(articleTitle);
                    var summary = $('<p>').text(articleDescription);
    
                    //append to the DOM
                    newsDiv.append(source);
                    newsDiv.append(title);
                    newsDiv.append(summary);
                    $('#headlinesContainer').append(newsDiv);
                }
                $('#term').val("");
            });
    // } 
      
    });
 





function callNewsAPI(URL) {
    for(var j = 0; j < URL.length; j++) {
        $.ajax({
            url: URL[j],
            method: "GET"
        }).then(function(response){
            // console.log(response);
            results.push(response);
            console.log(JSON.parse(JSON.stringify(results)));
            // console.log(results[0].articles[0].source);
        })
    }
    // console.log(results);
    console.log(JSON.parse(JSON.stringify(results)));
}



// dumpNews();

});

