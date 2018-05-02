$(document).ready(function() {

    // Initialize Firebase
        var config = {
        apiKey: "AIzaSyBfKzf6Wu3hngE26U0b8XQcDm01qs9Tq88",
        authDomain: "news-dump.firebaseapp.com",
        databaseURL: "https://news-dump.firebaseio.com",
        projectId: "news-dump",
        storageBucket: "news-dump.appspot.com",
        messagingSenderId: "518830334765"
    };
    firebase.initializeApp(config);
    
    //Variables for categories and the top headlines api url
    var category = ["business", "entertainment", "science", "health", "sports", "technology"]

    /**
     * Shuffles array in place.
     * @param {Array} arr items An array containing the items.
     */
        function shuffleArray(arr) {
            var j, x;
            for (var i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = arr[i];
                arr[i] = arr[j];
                arr[j] = x;
            }
            console.log(arr);
            topHeadlines();
            // headlinesCarousel();
            return arr;
        }

        //call shuffle array and display headlines on page load
        shuffleArray(category);

    $('#search-button').click(function(event) {
      event.preventDefault();
        //get the keyword term from the input search bar
        var term = $('#term').val().trim();
            //clear the called articles if exist
            $('#headlinesContainer').empty();
            //hide/move the search button
            $('#search-div').hide();
            //Variables for keyword and API url
            var queryURL = "https://newsapi.org/v2/everything?q=" + term + "&pageSize=99&sources=al-jazeera-english,bbc-news,cnn,fortune,fox-news,msnbc,rt,the-economist,the-new-york-times,the-wall-street-journal,the-washington-post,vice-news,time,the-huffington-post,reuters,reddit-r-all,buzzfeed" + "&apiKey=8f648fabfb73464184ecb3df91ad60f5"
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
    
                for(var i = 0; i < response.articles.length; i++) {
                    //make article variables
                    var articleSource = response.articles[i].source.name;
                    var articleTitle = response.articles[i].title;
                    var articleDescription = response.articles[i].description;
                    var articleURL = response.articles[i].url;
                    var articleDate = response.articles[i].publishedAt;
                    // make DOM variable containers
                    var newsDiv = $('<div class="m-4">');
                    var archiveButton = $('<button class="archive-button">').text("archive/rate");
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
                    newsDiv.append(archiveButton);
                    $('#headlinesContainer').append(newsDiv);
                }
                $('#term').val("");
            });
    // } 
      
    });
 
    //Create a function to grab 3 random top headlines
    function topHeadlines(){
        
        for(var i = 0; i < 3; i++){

        var queryURL = "https://newsapi.org/v2/top-headlines?category=" + category[i] + "&country=us&pageSize=1&apiKey=8f648fabfb73464184ecb3df91ad60f5"
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                for(var i = 0; i < response.articles.length; i++) {
                    console.log(response);
                    //make headline variables
                    var headlineSource = response.articles[i].source.name;
                    var headlineTitle = response.articles[i].title;
                    var headlineImage = response.articles[i].urlToImage;
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

// topHeadlines();

});

