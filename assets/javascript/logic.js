// app jogic for project1
$('document').ready(function() {
    
   

   //Create an AJAX call which will initiate when the user clicks on ""
   $('#generate').on('click', function() {
        //Variables for keyword and API url
        var keyword = "summer"
        var queryURL = "https://newsapi.org/v2/everything?q=" + keyword + "&sources=al-jazeera-english,abc-news,fox-news,rt,reuters,the-new-york-times,the-economist,bbc-news,buzzfeed,bloomberg,vice-news,the-wall-street-journal&apiKey=8f648fabfb73464184ecb3df91ad60f5"
        $.ajax({
            query: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });
   })






});