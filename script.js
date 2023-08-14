const displayMovies = (movies, elementId, includeSummary = false) => {
  const container = document.getElementById(elementId);
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    movieDiv.innerHTML = `
      <img src="${movie.image_url}" alt="${movie.title}">
      <div class="${includeSummary ? 'text-block' : ''}">
        <h3>${movie.title}</h3>
        ${includeSummary ? 
          `<p class="summary">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.</p><button>Click Me</button>` : 
          `<p>IMDb Score: ${movie.imdb_score}</p>`}
      </div>
    `;
    container.appendChild(movieDiv);
  });
};


const fetchTopOverallMovie = async () => {
  const url = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`;
  const response = await fetch(url);
  const data = await response.json();
  const topMovie = data.results[0]; // Le film le mieux noté
  displayMovies([topMovie], 'top-movie-overall', true);
};

const fetchTopMoviesByGenre = async (genre, elementId) => {
  let url = `http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`;
  const allMovies = [];

  while (allMovies.length < 15) {
    const response = await fetch(url);
    const data = await response.json();
    allMovies.push(...data.results);
    if (data.next) url = data.next;
    else break;
  }

  const topMovies = allMovies.slice(0, 15);
  displayMovies(topMovies, elementId);
};

const fetchTop7OverallMovies = async () => {
  let url = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`;
  const top7Movies = [];
  
  while (top7Movies.length < 15) {
    const response = await fetch(url);
    const data = await response.json();
    top7Movies.push(...data.results);
    if (data.next) url = data.next;
    else break;
  }
  
  const topMovies2 = top7Movies.slice(0, 15);

  displayMovies(top7Movies2, 'top-7-movies-overall');
};





fetchTopOverallMovie();
fetchTop7OverallMovies();
fetchTopMoviesByGenre('Action', 'action-movie-container');
fetchTopMoviesByGenre('Adventure', 'adventure-movie-container');
fetchTopMoviesByGenre('Animation', 'animation-movie-container');
