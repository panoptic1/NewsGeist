var sources = [
    "the-new-york-times",
    "al-jazeera-english",
    "reuters"
]

var results = [];

var newQueryURL = [];

function callNewsAPI(URL) {
    for(var j = 0; j < URL.length; j++) {
        $.ajax({
            url: URL[j],
            method: "GET"
        }).then(function(response){
            console.log(response);
            // results.push(response);
            // console.log(results);
            // console.log(results[0].articles[0].source);
        })
    }

}

function dumpNews() {

    var keyword = "obama"

    for(var i = 0; i < sources.length; i++) {
        //Variables for keyword and API url
        var queryURL = "https://newsapi.org/v2/everything?q=" + keyword + "&pageSize=1&sources=" + sources[i] + "&apiKey=8f648fabfb73464184ecb3df91ad60f5"
        console.log(queryURL);

        newQueryURL.push(queryURL);
        // console.log(newQueryURL);
        }
        callNewsAPI(newQueryURL);

}

dumpNews();

