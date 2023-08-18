const showModal = (movie) => {
  const modal = document.getElementById('myModal');
  document.getElementById('modal-image').src = movie.image_url;
  document.getElementById('modal-image').alt = movie.title;
  document.getElementById('modal-title').innerText = `Titre: ${movie.title}`;
  document.getElementById('modal-genres').innerText = movie.genres.join(', ');
  document.getElementById('modal-year').innerText = `Date de sortie : ${movie.year}`;
  document.getElementById('modal-imdb').innerText = `IMDb Score : ${movie.imdb_score}`;
  document.getElementById('modal-votes').innerText = `Votes : ${movie.votes}`;
  document.getElementById('modal-directors').innerText = `Directors: ${movie.directors.join(', ')}`;
  document.getElementById('modal-actors').innerText = `Acteurs: ${movie.actors.join(', ')}`;
  document.getElementById('modal-writers').innerText = `Scénario: ${movie.writers.join(', ')}`;
  modal.style.display = "block";
};

const displayMovies = (movies, elementId, includeSummary = false) => {
  const container = document.getElementById(elementId);
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    movieDiv.innerHTML = `
      <img src="${movie.image_url}" alt="${movie.title}">
      <div class="${includeSummary ? 'text-block' : ''}">
      ${elementId === 'top-movie-overall' ? `<h3>${movie.title}</h3>` : ''}
        
        ${includeSummary ? 
          `<p id="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><button>Play</button>` : 
          `<p>IMDb Score: ${movie.imdb_score}</p>`}
      </div>
    `;
    movieDiv.querySelector('img').addEventListener('click', () => showModal(movie));
    if (includeSummary) {
      movieDiv.querySelector('button').addEventListener('click', () => showModal(movie));
    }
    container.appendChild(movieDiv);
  });
};

const fetchTopOverallMovie = async () => {
  const url = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`;
  const response = await fetch(url);
  const data = await response.json();
  const topMovie = data.results[0];
  displayMovies([topMovie], 'top-movie-overall', true);
};

const fetchTopMoviesByGenre = async (genre, elementId) => {
  let url = `http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`;
  const allMovies = [];
  while (allMovies.length < 7) {
    const response = await fetch(url);
    const data = await response.json();
    allMovies.push(...data.results);
    if (data.next) url = data.next;
    else break;
  }
  const topMovies = allMovies.slice(0, 7);
  displayMovies(topMovies, elementId);
};

const fetchTop7OverallMovies = async () => {
  let url = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`;
  const top7Movies = [];
  while (top7Movies.length < 7) {
    const response = await fetch(url);
    const data = await response.json();
    top7Movies.push(...data.results);
    if (data.next) url = data.next;
    else break;
  }
  const topMovies2 = top7Movies.slice(0, 7);
  displayMovies(topMovies2, 'top-7-movies-overall');
};

document.getElementById('modal-close-button').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'none';
});


function scrollToLeft(elementId) {
  var element = document.getElementById(elementId);
  element.scrollLeft -= 20; // adjust the scroll amount
}

function scrollToRight(elementId) {
  const container = document.getElementById(elementId);
  container.scrollLeft += 20; //  adjust the scroll amount
}



fetchTopOverallMovie();
fetchTop7OverallMovies();
fetchTopMoviesByGenre('Sci-Fi', 'sci-fi-movie-container');
fetchTopMoviesByGenre('Fantasy', 'fantasy-movie-container');
fetchTopMoviesByGenre('Family', 'family-movie-container');
console.log("Hello World");




