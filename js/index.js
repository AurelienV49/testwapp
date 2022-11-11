/* 
chrome://site-engagement/

py -V
python3 -m http.server
python3 -m http.server 7800

1 - manifest.json
    standalone == fait disparaître la barre de l'url

2 - emulateur : android pie (adresse du projet : 10.0.2.2:8000)

3- check lighthouse pour controler si PWA

4 - HTTPS sur mobile
    Dans Chrome, aller sur le lien : Chrome://inspect/#devices
    url mobile aller sur : http//localhost:8000
    il faut un GooglePlay account

5 - Service worker : 50:54
    // Afficher automatiquement la bannière "Add to home screen"
    https://developers.google.com/web/fundamentals/app-install-banners/native
    
 */

const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const result = document.getElementById('result');

//let search = "";
let movies = [];

const fetchMovies = async(_search) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=70046ddc646dc61bb49877aefaa7b966&query=${_search}`;
    movies = await fetch(url).then((res) => res.json());
    console.log(movies);

};

const movieDisplay = async(search) => {
    await fetchMovies(search);

    movies.results.length = 12;

    result.innerHTML = movies.results.map((movie) =>
        `
        <li>
            <h2>${movie.original_title}</h2>
                <div class="card-content">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                    <div class="info">   
                        <p>${movie.overview}</p>
                        <p>Popularité : ${movie.popularity} ⚜⭐🌟 </p>
                    </div>
                </div>
        </li>
        `
    ).join('')
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var search = searchInput.value;
    movieDisplay(search);
});