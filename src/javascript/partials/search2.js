import axios from 'axios';
import { array, changeValue, arrayMoves } from './home.js';
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  params: { include_adult: 'false', language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTQ5ZjM1MTU2YjdiYzY3YTNkMTY1NWQxMDQ5NDExYSIsInN1YiI6IjY2NDI1MDE5OTdiOTNlNDk1OTg2YmE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XjPqIT4Z3yZi0E_V-CScMwfs6f6w2Dx8qFPL-PNdQkw',
  },
};

async function searchMovies(query, page = 1) {
  try {
    options.params.query = query;
    options.params.page = page;

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas wyszukiwania filmów:', error);
    throw error;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.SearchForm');
  const searchInput = document.getElementById('search-input');
  const searchContainer = document.getElementById('movie-container');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();

    const query = searchInput.value;
    try {
      searchContainer.innerHTML = '';

      const searchData = await searchMovies(query);
      console.log(searchData);

      searchData.results.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');

        const details = document.createElement('div');
        details.classList.add('details');

        const img = document.createElement('img');
        const title = document.createElement('h1');
        const genre = document.createElement('p');
        const year = document.createElement('p');

        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        title.textContent = movie.title;
        year.textContent = movie.release_date.substring(0, 4);
        genre.textContent = changeValue(movie.genre_ids).join(', ');

        card.appendChild(img);
        card.appendChild(title);
        details.appendChild(genre);
        details.appendChild(year);
        card.appendChild(details);

        searchContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Błąd wyszukiwania:', error);
    }
  });
});
