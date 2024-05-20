import { array } from './home.js';
import { createModalTemplate, openModal } from './modal.js';
import { showLoader, hideLoader } from './loader.js';

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

export { filterMovies };
function displayMovies(movies) {
  const container = document.getElementById('movie-container');

  container.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('card');
    const details = document.createElement('div');
    details.classList.add('details');
    const img = document.createElement('img');
    const title = document.createElement('h1');
    const genre = document.createElement('p');
    const year = document.createElement('p');

    img.src = movie.value[0];
    title.textContent = movie.key;
    genre.textContent = movie.value[2].slice(0, 3).join(', ');
    year.textContent = movie.value[1];

    card.appendChild(img);
    card.appendChild(title);
    details.appendChild(genre);
    details.appendChild(year);
    card.appendChild(details);

    container.appendChild(card);

    card.addEventListener('click', () => {
      showLoader();

      const selectedMovie = {
        title: movie.key,
        image: movie.value[0],
        genre: movie.value[2].join(', '),
        year: movie.value[1],
        originalTitle: movie.value[3],
        overview: movie.value[4],
        popularity: movie.value[5],
        voteAverage: movie.value[6],
        voteCount: movie.value[7],
      };
      setTimeout(() => {
        createModalTemplate();
        openModal(selectedMovie);
        hideLoader();
      }, 500);
    });
  });
}

export { displayMovies };
