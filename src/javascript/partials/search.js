import { array, displayMovies } from './home.js';

function filterMovies() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filteredMovies = array.filter(movie => {
    const titleMatch = movie.key.toLowerCase().includes(searchInput);
    const genreMatch = movie.value[2].some(genre => genre.toLowerCase().includes(searchInput));
    return titleMatch || genreMatch;
  });
  displayMovies(filteredMovies);
}

document.querySelector('.SearchForm').addEventListener('submit', event => {
  event.preventDefault();
  filterMovies();
});

document.getElementById('search-input').addEventListener('input', filterMovies);
