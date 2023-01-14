import API_KEY from "./apikey.js";

const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;


const main = document.getElementById('main');
const form = document.getElementById('form-id');
const searchInput = document.getElementsByClassName("input-search");

async function getMovies(url) {
    const results = await fetch(url);
    const data = await results.json()
    showMovies(data.results)
}

function showMovies(movies) {

    main.innerHTML = '';

    if (!movies) {
        main.innerText = 'Sorry, your search retured 0 results!'
    } else {

        movies.forEach((movie) => {

            const {
                title,
                poster_path,
                vote_average,
                vote_count,
                overview
            } = movie;

            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            const poster = poster_path ? IMG_PATH + poster_path : "./resources/not_found.jpg";

            movieDiv.innerHTML = `
            <img src="${poster}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByScore(vote_average)}">
                    ${vote_average} / ${vote_count} votes
                </span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`;

            main.appendChild(movieDiv);
        })
    }
}

function getClassByScore(score) {
    if (score >= 8) {
        return 'green';
    } else if (score >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }

    e.preventDefault();

})
