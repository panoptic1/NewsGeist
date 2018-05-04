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
 
    //function to grab 3 random top headlines from all possible sources
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
                var headlinesDiv = $('<div class="col-md-4 col-sm-12">');
                //create variable to write to html
                var source = $('<h5 class="source">').text(headlineSource);
                var URLtag = $('<a>').attr({
                    "href": headlineURL,
                    "target": "_blank"
                });
                var title = $('<h4 class="title title-link">').text(headlineTitle);
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

    // listener for user input on the search bar
    $("#form").submit(function (event) {
        event.preventDefault();
        var data = $("#input-text").val().trim();
        dumpNews(data);
        $('#input-text').val("");
        $('#top-headlines').empty();
        $('.alert').hide();
    })

    // function to call the news and giphy apis after the search term is entered by user
    function dumpNews(searchTerm) {

        //Variables for keyword and API url
        var queryURL = "https://newsapi.org/v2/everything?q=" + searchTerm + "&pageSize=20&sources=al-jazeera-english,bbc-news,cnn,fortune,fox-news,msnbc,rt,the-economist,the-new-york-times,the-wall-street-journal,the-washington-post,vice-news,time,the-huffington-post,reuters,wired,the-american-conservative,the-hill,new-scientist,national-review&apiKey=8f648fabfb73464184ecb3df91ad60f5"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (newsResponse) {

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=BzhlAMzGGojL38kIs2BSyIbzcdZ8fHuo&limit=20";

            $.get(queryURL).then(function (giphyResponse) {

                $("#headlinesContainer").empty();

                for (var i = 0; i < 20; i++) {
                    //make article variables

                    var image = $("<img>");
                    image.attr("src", giphyResponse.data[i].images.fixed_height_small.url);
                    var colDivImage = $("<div>");
                    colDivImage.addClass("col-3 pt-3");
                    colDivImage.addClass("giphy-image");
                    colDivImage.append(image);

                    var articleSource = newsResponse.articles[i].source.name;

                    newsSources.push(articleSource);

                    var articleTitle = newsResponse.articles[i].title;
                    var articleDescription = newsResponse.articles[i].description;
                    var articleURL = newsResponse.articles[i].url;
                    var articleDate = newsResponse.articles[i].publishedAt;
                    var articleDateConverted = moment(articleDate).format("MMMM Do YYYY");
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
                        "data-source": articleSource,
                        "data-date": articleDateConverted
                    });

                    var rowDiv = $("<div>");
                    rowDiv.append(colDivImage);
                    rowDiv.addClass("row appendedRow")
                    var colDiv = $("<div>")
                    colDiv.addClass("col-9 py-2")
                    var newsDiv = $('<div class="m-2">');

                    //create variable to write to html
                    var source = $('<h6 class="source">').text(articleSource);
                    var title = $('<h5 class="title title-link">').text(articleTitle);
                    var summary = $('<p class="summary">').text(articleDescription);
                    var date = $('<span class="date">').text(" - " + articleDateConverted);

                    //append to the DOM
                    URLtag.append(title);
                    newsDiv.append(source);
                    newsDiv.append(URLtag);
                    newsDiv.append(summary);
                    source.append(date);
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
        var buttonDataDate = $(this).attr('data-date');

        // listener for the modal archive form
        $('#modal-form-button').on('click', function(evt) {
            evt.preventDefault();
    
            var rating = $('input[name="rating"]:checked').val();
            var selectComment = $('#select-user-comment').val();
    
            var archivedArticle = {
                url: buttonDataUrl,
                title: buttonDataTitle,
                source: buttonDataSource,
                date: buttonDataDate,
                rating: rating,
                comment: selectComment
            }
    

            database.ref().push(archivedArticle);

            $('.modal').modal('hide');
            $('.alert').show();
            $("html, body").animate({ scrollTop: 0 }, "slow");

        });
    });

    //listener for top of page ARCHIVE PAGE -- TO DO --
    $('.top-of-page').on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    //listener to hide archive alert
    $('#alert-btn').on('click', function() {
        $('.alert').fadeOut("slow");
    });

    //get data from firebase and append to DOM
    database.ref().on('child_added', function(childSnapshot, prevChildkey) {
        
        var url = (childSnapshot.val()).url;

        //check if url exists in the DOM, if so don't append (user will not see it) - TO DO - add user auth
        if($("a[href='" + url + "']").length > 0) {
            return;
        }

        var title = (childSnapshot.val().title);
        var source = (childSnapshot.val().source);
        var date = (childSnapshot.val().date);
        var rating = (childSnapshot.val().rating);
        var comment = (childSnapshot.val().comment);

        var archDiv = $('<div class="mt-4 archive-div">');

        var urlTag = $('<a class="title-link">').attr({
            "href": url,
            "target": "_blank"
        });
        var sourceTag = $('<h5>').text(source);
        var titleTag = $('<h4 class="archive-title title-link">').text(title);
        var dateTag = $('<span>').text(" - " + date);

        var ratingsTag = $('<p class="mb-0">').text("Rating: " + rating);
        var commentTag = $('<p>').text("Category: " + comment);

        urlTag.append(titleTag);
        sourceTag.append(dateTag);
        archDiv.append(sourceTag);
        archDiv.append(urlTag);
        archDiv.append(ratingsTag);
        archDiv.append(commentTag);

        // var newsArchiveDiv = $('#news-archive');

        //append the varying category/comment articles to different divs
        if(comment === "excellent journalism") {
            $('#category-excellent-journal').append(archDiv);
        }
        if(comment === "comedy") {
            $('#category-comedy').append(archDiv);
        }
        if(comment === "curious and thought provoking") {
            $('#category-thought-provoking').append(archDiv);
        }
        if(comment === "head-scratcher") {
            $('#category-head-scratcher').append(archDiv);
        }
        if(comment === "inspirational") {
            $('#category-inspirational').append(archDiv);
        }
        if(comment === "persuasive") {
            $('#category-persuasive').append(archDiv);
        }
        if(comment === "needs fact checking") {
            $('#category-fact-checking').append(archDiv);
        }
        if(comment === "depressing") {
            $('#category-depressing').append(archDiv);
        }
        if(comment === "rage-inducing") {
            $('#category-rage-inducing').append(archDiv);
        }
        if(comment === "borderline propaganda") {
            $('#category-borderline-propaganda').append(archDiv);
        }

        //USE THIS TO SHOW ALL ARCHIVED ARTICLES -- BEFORE MAKING BUTTON LINKS
        // newsArchiveDiv.append(archDiv);
    });

    $('#comedy').on('click', function() {
        $('#category-comedy').show();
    });

    //initialize the scroll to top tooltip for bootstrap
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

});