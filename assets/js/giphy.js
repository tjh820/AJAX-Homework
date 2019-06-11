$(document).ready(function () {
    //global variables
    //=========================================
    var savedSearchs = [];
    var $input = $("#input")
    var $submit = $("#submit")

    $submit.on("click", function (event) {
        event.preventDefault();
        var inputVal = $input.val();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            inputVal + "&api_key=0o2GimvDuMMpGxnlNCWqivEmQBtKaqH2&limit=10";
        savedSearchs.push(inputVal);
        var buttn = $("<button>");
        buttn.attr("val", inputVal).addClass("userSearch");
        buttn.text(inputVal)
        $(".container").prepend(buttn);

        makeSearch(queryURL);


  

    });
    function makeSearch(queryURL) {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating:" + rating);

                var picture = $("<img>").addClass("gif")
                picture.attr("data-state", "still");
                picture.attr("data-still", results[i].images.fixed_height_still.url)
                picture.attr("src", results[i].images.fixed_height.url);
                picture.attr("data-animate", results[i].images.fixed_height.url);
                gifDiv.prepend(p);
                gifDiv.prepend(picture);

                $(".results").prepend(gifDiv);


            }

        });
    }
    $("body").on("click",".userSearch", function () {
       var buttnVal = $(this).attr("val");
       console.log($(this));
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       buttnVal + "&api_key=0o2GimvDuMMpGxnlNCWqivEmQBtKaqH2&limit=10";
        makeSearch(queryURL);

    })

    $("body").on("click", ".gif", function() {

        var state = $(this).attr("data-state");
  
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });







    //get input value when the user presses submit
    //put input on page
    //store that input and make it recallable
    //make gifs do start and stoppy things johnny said???
    //make a get request to the giphy api with the input value 
    //REMEMBER walk milo& go 2 grocery store at *******!!!!!!8:00!!**********

}); //end of code