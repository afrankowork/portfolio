let omdbUrl = 'http://www.omdbapi.com/?apikey=6d1f6034&t=';
let movieChoice;
let movieUrl;
let movieInfo = document.getElementById('movieInfo');
let header = document.getElementById('header2');
let singleActive = true;
let keywordActive = false;
let recommendActive = false;
let movieID;
let tmdbKey = 'fed15d7f8eee394e3b689d6e4d35951a';

movieInfo.hidden = true;

let tmdbURL = 'https://api.themoviedb.org/3/search/movie?api_key=fed15d7f8eee394e3b689d6e4d35951a&query=';

let recommendations = document.getElementById('Recommendations')





let movieContainer = document.createElement('div')
movieContainer.setAttribute("id","movieContainer");


let searchBtn = document.getElementById('searchBtn');
let singleSearch = document.getElementById('singleSearch');
let keywordSearch = document.getElementById('keywordSearch');
let upcoming = document.getElementById('Upcoming')

searchBtn.addEventListener('click', buildUrl);
singleSearch.addEventListener('click', singleUrl);
keywordSearch.addEventListener('click', keywordUrl);
recommendations.addEventListener('click',recommendUrl);
upcoming.addEventListener('click', upcomingUrl);


function singleUrl() {
    omdbUrl = 'http://www.omdbapi.com/?apikey=6d1f6034&t=';
    movieInfo.innerHTML = '';
    movieInfo.hidden = true;
    singleActive = true;
    keywordActive = false;
    recommendActive = false;
}

function keywordUrl() {
    omdbUrl = 'http://www.omdbapi.com/?apikey=6d1f6034&s='
    movieInfo.innerHTML = '';
    movieInfo.hidden = true;
    singleActive = false;
    keywordActive = true;
    recommendActive = false;
}

function recommendUrl() {
    movieInfo.innerHTML = '';
    movieInfo.hidden = true;
    singleActive = false;
    keywordActive = false;
    recommendActive = true;
}

function upcomingUrl() {
    movieInfo.innerHTML = '';
    movieInfo.hidden = true;
    

}





function buildUrl() {
    movieChoice = document.querySelector('input').value;
    
    movieUrl = omdbUrl + movieChoice
    console.log(movieUrl);
    if(singleActive){grabMovies();}
    else if (keywordActive){
        grabMoreMovies();
    } else {
        grabRecommendations();
    }
}


function grabMovies() {
    
    fetch(movieUrl).then(function(result) {
        return result.json();
    }).then(function(json) {
        displayMovies(json);
    })

}

function grabMoreMovies() {
    
    fetch(movieUrl).then(function(result) {
        return result.json();
    }).then(function(json) {
        displayListMovies(json);
    })

}

function grabRecommendations () {
    movieChoice = document.querySelector('input').value;
    console.log(movieChoice);
    recommendUrl = tmdbURL + movieChoice;
    fetch(recommendUrl).then(function(results) {
        return results.json();
    }).then(function(id) {
        grabMovieRecomends(id);
    })
}
function grabUpcoming () {
    
    
    upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}&language=en-US&page=1`
    fetch(upcomingUrl).then(function(response))
}




function displayMovies(movieList) {
    console.log(movieList);
    movieInfo.innerHTML = '';
    
    

    let movieDetail = document.createElement('div')
    
    let moviePoster = document.createElement('img');
    let movieTitle = document.createElement('h4');
    let movieActors = document.createElement('p');
    let moviePlot = document.createElement('p');
    let movieRunTime = document.createElement('p');
    let movieAwards = document.createElement('p');
    let movieGenre = document.createElement('p');
    let movieDate = document.createElement('p');
    let movieDirector = document.createElement('p');
    let movieRating = document.createElement('p');


    moviePoster.setAttribute('src', movieList.Poster);
    movieDetail.setAttribute('id','movieDetail')
    movieTitle.innerText = ('Title: '+ movieList.Title);
    movieActors.innerText = ('Actors: ' + movieList.Actors);
    moviePlot.innerText = ('Plot: ' + movieList.Plot);
    movieRunTime.innerText = ('Runtime: ' + movieList.Runtime);
    movieAwards.innerText = ('Awards: ' + movieList.Awards);
    movieGenre.innerText = ('Genre(s): ' + movieList.Genre);
    movieDate.innerText = ('Release Date: ' + movieList.Released);
    movieDirector.innerText = ('Director: ' + movieList.Director);
    movieRating.innerText = ('IMDb Rating(1-10): ' + movieList.imdbRating);

    movieInfo.appendChild(moviePoster);
    movieInfo.appendChild(movieDetail);
    movieDetail.appendChild(movieTitle);
    movieDetail.appendChild(movieActors);
    movieDetail.appendChild(moviePlot);
    movieDetail.appendChild(movieRunTime);
    movieDetail.appendChild(movieGenre);
    movieDetail.appendChild(movieAwards);
    movieDetail.appendChild(movieDirector);
    movieDetail.appendChild(movieDate);
    movieDetail.appendChild(movieRating);
    
    movieInfo.hidden = false;

    

}

function displayListMovies(movies) {
    
    movieContainer.innerHTML = '';
    movieInfo.appendChild(movieContainer);
    

    for(let i=0;i<movies.Search.length;i++) {
        
        let movieCard = document.createElement('div');
        movieCard.setAttribute("class","card");
        movieCard.setAttribute("style","width: 15rem;");

        let moviePoster = document.createElement('img');
        moviePoster.setAttribute("class","card-img-top");
        moviePoster.setAttribute("src",movies.Search[i].Poster);

        let movieBody = document.createElement('div');
        movieBody.setAttribute("class","card-body");

        let movieTitle = document.createElement('h5');
        movieTitle.setAttribute("class","card-title");
        movieTitle.innerText = (movies.Search[i].Title);
        

        let movieYear = document.createElement('p');
        movieYear.setAttribute("class","card-text");
        movieYear.innerText = ('Year: ' + movies.Search[i].Year)

        let movieBtn = document.createElement('a');
        movieBtn.setAttribute("class","btn btn-primary");
        movieBtn.setAttribute("href","https://www.imdb.com/title/" + movies.Search[i].imdbID);
        movieBtn.innerText = ('IMDb Link')

        
        
        
        
        
        //movieContainer.appendChild(movieCard);
        movieContainer.appendChild(movieCard);
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieBody);
        movieBody.appendChild(movieTitle);
        movieBody.appendChild(movieYear);
        movieBody.appendChild(movieBtn);
        

        movieInfo.hidden = false;
    }

}

function grabMovieRecomends(movieInfo) {
    movieID = movieInfo.results[0].id;
    grabListOfRec();
}

function grabListOfRec() {
    recLink = `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${tmdbKey}&language=en-US&page=1`
    
    fetch(recLink).then(function(results) {
        return results.json();
    }).then(function(recommends) {
        displayRecommends(recommends);
    })
}

function displayRecommends(movies) {
    
    let link = 'https://image.tmdb.org/t/p/w500'

    movieContainer.innerHTML = '';
    movieInfo.appendChild(movieContainer);
    console.log(movies);
    for (let i=0;i<movies.results.length; i++) {
        let movieCard = document.createElement('div');
        movieCard.setAttribute("class","card");
        movieCard.setAttribute("style","width: 18rem;");

        let moviePoster = document.createElement('img');
        moviePoster.setAttribute("class","card-img-top");
        moviePoster.setAttribute("src", link + movies.results[i].poster_path);

       
        movieContainer.appendChild(movieCard);
        movieCard.appendChild(moviePoster);



    }
    movieInfo.hidden = false;
    
}