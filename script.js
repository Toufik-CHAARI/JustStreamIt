const displayMovies = (movies, elementId) => {
  const container = document.getElementById(elementId);
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    movieDiv.innerHTML = `
      <img src="${movie.image_url}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>IMDb Score: ${movie.imdb_score}</p>
    `;
    container.appendChild(movieDiv);
  });
};

const fetchTopOverallMovie = async () => {
  const url = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`;
  const response = await fetch(url);
  const data = await response.json();
  const topMovie = data.results[0]; // Le film le mieux noté
  displayMovies([topMovie], 'top-movie-overall');
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

fetchTopOverallMovie();
fetchTopMoviesByGenre('Action', 'action-movie-container');
fetchTopMoviesByGenre('Adventure', 'adventure-movie-container');
fetchTopMoviesByGenre('Animation', 'animation-movie-container');
