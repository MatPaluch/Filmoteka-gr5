import axios from 'axios';
import { createModalTemplate, openModal } from './modal.js';
const backToHomeButton = document.querySelector('.LogoWrapper');
backToHomeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});
const container = document.getElementById('movie-container');
const basicImage = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=b942b8bf626a04f48b07153a95ee51a0';
const array = [];

const arrayMoves = [
  { 28: 'Action' },
  { 12: 'Adventure' },
  { 16: 'Animation' },
  { 35: 'Comedy' },
  { 80: 'Crime' },
  { 99: 'Documentary' },
  { 18: 'Drama' },
  { 10751: 'Family' },
  { 14: 'Fantasy' },
  { 36: 'History' },
  { 27: 'Horror' },
  { 10402: 'Music' },
  { 9648: 'Mystery' },
  { 10749: 'Romance' },
  { 878: 'Science Fiction' },
  { 10770: 'TV Movie' },
  { 53: 'Thriller' },
  { 10752: 'War' },
  { 37: 'Western' },
];

function changeValue(array) {
  const keys = [];
  const values = [];
  const response = [];

  arrayMoves.map(element => {
    keys.push(Object.keys(element)[0]);
    values.push(Object.values(element)[0]);
  });

  array.map(element => {
    const value = keys.indexOf(element.toString());
    response.push(values[value]);
  });
  return response;
}

async function fetchMove() {
  try {
    const response = await axios.get(url);
    response.data['results'].forEach(element => {
      const obj = {};
      obj.key = element['title'];
      obj.value = [
        basicImage + element['poster_path'],
        element['release_date'].substring(0, 4),
        changeValue(element['genre_ids']),
        element['original_title'],
        element['overview'],
        element['popularity'],
        element['vote_average'],
        element['vote_count'],
      ];

      array.push(obj);
    });
    return array;
  } catch (error) {
    console.error('Wystąpił błąd:', error);
    return [];
  }
}
fetchMove().then(result => {
  console.log(result);
  result.forEach(element => {
    const card = document.createElement('div');
    card.classList.add('card');
    const details = document.createElement('div');
    details.classList.add('details');
    const img = document.createElement('img');
    const title = document.createElement('h1');
    const genre = document.createElement('p');
    const year = document.createElement('p');

    img.src = Object.values(element)[1][0];
    title.textContent = element.key;
    genre.textContent = Object.values(element)[1][2].slice(0, 3).join(', ');
    year.textContent = Object.values(element)[1][1];

    card.appendChild(img);
    card.appendChild(title);
    details.appendChild(genre);
    details.appendChild(year);
    card.appendChild(details);

    container.appendChild(card);

    card.addEventListener('click', () => {
      const selectedMovie = {
        title: element.key,
        image: Object.values(element)[1][0],
        genre: Object.values(element)[1][2].join(', '),
        year: Object.values(element)[1][1],
        originalTitle: Object.values(element)[1][3],
        overview: Object.values(element)[1][4],
        popularity: Object.values(element)[1][5],
        voteAverage: Object.values(element)[1][6],
        voteCount: Object.values(element)[1][7],
      };
      createModalTemplate();
      openModal(selectedMovie);
    });
  });
});
