(function () {
    jQuery(init);

    function init() {
        var searchBtn = jQuery('#searchBtn');
        var titleFld = jQuery('#title');
        var titleDetails;
        var directorDetails;
        var plotDetails;
        var actorsDetails;
        var resultsUl;
        var posterDetails;

        searchBtn.click(searchMovie);

        function searchMovie() {
            //If you pass no arguments, .val is interpreted
            //as a function to read data from the HTML object
            //If it has an argument, it will set the default value
            //in the HTML object to provided value
            var titleText = titleFld.val();
            var url = "http://www.omdbapi.com/?apikey=852159f0&s=" + titleText;
            console.log(url);
            //You can pass the arguments into ajax individually,
            //but it's more common in JS (and specifically JQuery),
            //to pass in objects that hold the argument information
            jQuery.ajax({
                url: url,
                success: renderMovies,
                error: renderError
            });

        }

        function renderMovies(response) {
            //console.log(response);
            var movies = response.Search;
            var resultsUl = $('#results');
            resultsUl.empty();

            for (var m in movies) {
                var movie = movies[m];
                var title = movie.Title;
                var imdbID = movie.imdbID;
                var poster = movie.Poster;

                console.log([title, imdbID, poster]);

                //var liMovie = $('<li id="' + imdbID + '" class="list-group-item">');
                var liMovie = $('<li>');

                //You can programmatically add attributes to pieces of code that
                //represent HTML bits, rather than having to include them upon instantiation
                liMovie.attr('id', imdbID);
                liMovie.addClass('list-group-item');


                var posterImg = $('<img/>');
                //Attribute can be used for either reading or writing
                //if there's two arguments, it writes the second argument, the data,
                //to the first argument, the attribute
                posterImg.attr('width', '50px');
                posterImg.attcr('src', poster);

                li.append(posterImg);
                liMovie.append(title);
                liMovie.click(renderDetails);
                resultsUl.append(liMovie);

            }
        }

        function renderDetails(event) {
            var currentTarget = $(event.currentTarget);
            //The attribute can be used for reading too,
            //if only the attribute is provided
            var imdbId = currentTarget.attr(id);
            var url = "http://www.omdbapi.com/?apikey=852159f0&s=" + titleText;
            jQuery.ajax({
                url: url,
                success: renderMovies,
                error: renderError
            });
            //console.log(currentTarget);
        }

        function renderDetails(movie) {
            console.log(movie);
            titleDetails.html(movie.Title);
            directorDetails.html(movie.Director);
            plotDetails.html(movie.Plot);
            posterDetails.attr('src', movie.Poster);
            var actors = movie.Actors.split(',');
            actorsDetails.empty();
            for (var a in actors) {
                var liActor = $('<li>');
                liActor.addClass('list-group-item');
                liActor.html(actors[a]);
                actorDetails.append(liActor);
            }
        }

        function renderError(error) {
            console.error(error);
        }
    }

})();