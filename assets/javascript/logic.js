$(document).ready(function () {
    var newsSources = [];
    //Variables for categories and the top headlines api url
    var category = ["business", "entertainment", "science", "health", "sports", "technology"]

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

    var database = firebase.database();
    
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
            //call the random headlines function on page load
            topHeadlines();
            return arr;
        }

        //call shuffle array and display headlines on page load
        shuffleArray(category);
 
    //Create a function to grab 3 random top headlines
    function topHeadlines(){

        for(var i = 0; i < 3; i++){

        var queryURL = "https://newsapi.org/v2/top-headlines?category=" + category[i] + "&country=us&pageSize=1&apiKey=8f648fabfb73464184ecb3df91ad60f5"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for(var i = 0; i < response.articles.length; i++) {
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

    $("#form").submit(function (event) {
        event.preventDefault();
        var data = $("#input-text").val();
        dumpNews(data);
        $('#input-text').val("");
        $('#top-headlines').empty();
    })

    function dumpNews(searchTerm) {

        //Variables for keyword and API url
        var queryURL = "https://newsapi.org/v2/everything?q=" + searchTerm + "&pageSize=20&sources=al-jazeera-english,bbc-news,cnn,fortune,fox-news,msnbc,rt,the-economist,the-new-york-times,the-wall-street-journal,the-washington-post,vice-news,time,the-huffington-post,reuters,wired,the-american-conservative,the-hill,new-scientist,national-review&apiKey=8f648fabfb73464184ecb3df91ad60f5"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (newsResponse) {

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=BzhlAMzGGojL38kIs2BSyIbzcdZ8fHuo&limit=20";

            $.get(queryURL).then(function (giphyResponse) {

                $("#headlinesContainer").empty();

                for (var i = 0; i < 20; i++) {
                    //make article variables

                    var image = $("<img>");
                    image.attr("src", giphyResponse.data[i].images.fixed_height_small.url);
                    var colDivImage = $("<div>");
                    colDivImage.addClass("col-3 pt-2");
                    colDivImage.addClass("giphy-image");
                    colDivImage.append(image);

                    var articleSource = newsResponse.articles[i].source.name;

                    newsSources.push(articleSource);

                    var articleTitle = newsResponse.articles[i].title;
                    var articleDescription = newsResponse.articles[i].description;
                    var articleURL = newsResponse.articles[i].url;
                    var articleDate = newsResponse.articles[i].publishedAt;
                    //make DOM variable containers
                    var URLtag = $('<a>').attr({
                        "href": articleURL,
                        "target": "_blank"
                    });
                    var archiveButton = $('<button class="archive-button">').text("archive/rate");
                    //add data attributes to each button
                    archiveButton.attr({
                        "data-url": articleURL,
                        "data-title": articleTitle,
                        "data-source": articleSource
                    });

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
                    URLtag.append(title);
                    newsDiv.append(source);
                    newsDiv.append(URLtag);
                    newsDiv.append(summary);
                    newsDiv.append(archiveButton);
                    // $('#headlinesContainer').append(newsDiv);
                    rowDiv.append(colDiv);
                    $("#headlinesContainer").append(rowDiv);
                    colDiv.append(newsDiv);

                }
            })
        });
    }

    //event listener for the archive buttons
    $('#headlinesContainer').on('click', '.archive-button', function() {

        $('.modal').modal('show');       

        var buttonDataUrl = $(this).attr('data-url');
        var buttonDataTitle = $(this).attr('data-title');
        var buttonDataSource = $(this).attr('data-source');

        // listener for the modal archive form
        $('#modal-form-button').on('click', function(evt) {
            evt.preventDefault();
    
            var rating = $('input[name="rating"]:checked').val();
            var selectComment = $('#select-user-comment').val();
    
            var archivedArticle = {
                url: buttonDataUrl,
                title: buttonDataTitle,
                source: buttonDataSource,
                rating: rating,
                comment: selectComment
            }
    
            database.ref().push(archivedArticle);

            $('.modal').modal('hide');
            $('.alert').show();
            $("html, body").animate({ scrollTop: 0 }, "slow");

        });
    });

    //listener to hide archive alert
    $('#alert-btn').on('click', function() {
        $('.alert').fadeOut("slow");
    });

    //get data from firebase and append to DOM
    database.ref().on('child_added', function(childSnapshot, prevChildkey) {
        
        var url = (childSnapshot.val()).url;
        var title = (childSnapshot.val().title);
        var source = (childSnapshot.val().source);
        var rating = (childSnapshot.val().rating);
        var comment = (childSnapshot.val().comment);

        var archDiv = $('<div>');

        var urlTag = $('<a>').attr({
            "href": url,
            "target": "_blank"
        });
        var sourceTag = $('<h5>').text(source);
        var titleTag = $('<h4>').text(title);

        var ratingsTag = $('<p>').text("Rating: " + rating);
        var commentTag = $('<p>').text("Category: " + comment);

        urlTag.append(title);

        archDiv.append(sourceTag);
        archDiv.append(urlTag);
        archDiv.append(ratingsTag);
        archDiv.append(commentTag);

        var newsArchiveDiv = $('#news-archive');

        newsArchiveDiv.append(archDiv);
    });

});
    
    

