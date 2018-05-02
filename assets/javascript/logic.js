var sources = [
    "the-new-york-times",
    "al-jazeera-english",
    "reuters"
]

var newsSources = [];

var results = [];

var newQueryURL = [];

function callNewsAPI(URL) {
    for (var j = 0; j < URL.length; j++) {
        $.ajax({
            url: URL[j],
            method: "GET"
        }).then(function (response) {
            //console.log(response);
            // results.push(response);
            // console.log(results);
            // console.log(results[0].articles[0].source);
        })
    }

}

$("#form").submit( function(event){
   event.preventDefault();
    var data = $("#input-text").val()
    console.log(data);
    dumpNews(data);
})



function dumpNews(searchTerm) {

   
    
    //Variables for keyword and API url
    var queryURL = "https://newsapi.org/v2/everything?q=" + searchTerm + "&pageSize=50&sources=al-jazeera-english,bbc-news,cnn,fortune,fox-news,msnbc,rt,the-economist,the-new-york-times,the-wall-street-journal,the-washington-post,vice-news,time,the-huffington-post,reuters,reddit-r-all,buzzfeed" + "&apiKey=8f648fabfb73464184ecb3df91ad60f5"
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (newsResponse) {
        
        
    
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=BzhlAMzGGojL38kIs2BSyIbzcdZ8fHuo&limit=100";

        $.get(queryURL).then(function (giphyResponse) {

            $("#headlinesContainer").empty();
               
            
                for (var i = 0; i < 100; i++) {
                    //make article variables
                    
                    var image = $("<img>");
                    image.attr("src", giphyResponse.data[i].images.fixed_height_small.url);
                    var colDivImage = $("<div>");
                    colDivImage.addClass("col-3");
                    colDivImage.addClass("giphy-image");
                    colDivImage.append(image);
                    
                    
                    
                    var articleSource = newsResponse.articles[i].source.name;
        
                    newsSources.push(articleSource);
                    //console.log(newsSources);
        
                    var articleTitle = newsResponse.articles[i].title;
                    var articleDescription = newsResponse.articles[i].description;
                    var articleURL = newsResponse.articles[i].url;
                    var articleDate = newsResponse.articles[i].publishedAt;
                    //make DOM variable containers
                    
                    var rowDiv = $("<div>");
                    rowDiv.append(colDivImage);
                    rowDiv.addClass("row appendedRow")
                    var colDiv = $("<div>")
                    colDiv.addClass("col-9")
                    var newsDiv = $('<div class="m-2">');
        
                    //create variable to write to html
                    var source = $('<h6>').text(articleSource);
                    var title = $('<h5>').text(articleTitle);
                    var summary = $('<p>').text(articleDescription);
        
                    //append to the DOM
                    newsDiv.append(source);
                    newsDiv.append(title);
                    newsDiv.append(summary);
                   // $('#headlinesContainer').append(newsDiv);
                    rowDiv.append(colDiv);
                    $("#headlinesContainer").append(rowDiv);
                    colDiv.append(newsDiv);
                
                  
                }  
            
            
           
        })  
      
      
     

        
            
        //console.log(response);   
                //console.log( response.data[0].images.fixed_height_small.url);


                // var headlineContainer = $(".headlinesContainer");

                // var rowDiv = $("<div>");
                // rowDiv.addClass("row row1");
                // headlineContainer.append(rowDiv);


                // var colDiv = $("<div>");
                // colDiv.addClass("col-3");
                // rowDiv.append(colDiv);

                //var gif = $("#headlineContainer");
    });
}



