import axios from 'axios';

const container = document.getElementById('movie-container');
const basicImage = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=b942b8bf626a04f48b07153a95ee51a0';
let array = [];
let globalNumber = 1;
const buttons = document.querySelector('.buttons');

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

async function fetchMove(number = 1) {
  globalNumber = number;
  console.log(globalNumber);
  try {
    array = [];
    let response = await axios.get(`${url}&page=${number}`);
    response.data['results'].forEach(element => {
      let obj = {};
      obj.key = element['title'];
      obj.value = [
        basicImage + element['poster_path'],
        element['release_date'].substring(0, 4),
        changeValue(element['genre_ids']),
      ];

      array.push(obj);
    });
    array.forEach(element => {
      const card = document.createElement('div');
      card.classList.add('card');
      const details = document.createElement('div');
      details.classList.add('details');
      let img = document.createElement('img');
      let title = document.createElement('h1');
      let genre = document.createElement('p');
      let year = document.createElement('p');

      img.src = Object.values(element)[1][0];
      title.textContent = element.key;
      genre.textContent = Object.values(element)[1][2];
      year.textContent = Object.values(element)[1][1];

      card.appendChild(img);
      card.appendChild(title);
      details.appendChild(genre);
      details.appendChild(year);
      card.appendChild(details);

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}
fetchMove();

buttons.addEventListener('click', event => {
  const values = Array.from(buttons.children);
  const target = event.target.textContent;
  const number = parseInt(target);
  const firstChild = buttons.firstElementChild;
  const lastChild = buttons.lastElementChild;
  console.log(values[0]);
  container.innerHTML = '';

  if (event.target === firstChild) {
    const choosedNumber = parseInt(localStorage.getItem('globalNumber')) - 1;
    localStorage.setItem('globalNumber', choosedNumber);
    fetchMove(choosedNumber);
  } else if (event.target === lastChild) {
    const choosedNumber = parseInt(localStorage.getItem('globalNumber')) + 1;
    localStorage.setItem('globalNumber', choosedNumber);
    fetchMove(choosedNumber);
  } else {
    localStorage.setItem('globalNumber', number);
    fetchMove(number);
  }

  if (event.target === values[0] || event.target === values[2]) {
    if (event.target.textContent !== '2') {
      values.forEach(element => {
        if (element === values[0] || element === values[6]) {
        } else {
          element.textContent = parseInt(element.textContent);
        }
      });
    }
  } else if (event.target === values[1]) {
    if (event.target.textContent !== '1' || event.target.textContent !== '2') {
      values.forEach(element => {
        if (element === values[0] || element === values[6]) {
        } else {
          element.textContent = parseInt(element.textContent) - 2;
        }
      });
    }
  } else if (event.target === values[4] || event.target === values[6]) {
    if (event.target.textContent !== '19') {
      values.forEach(element => {
        if (element === values[0] || element === values[6]) {
        } else {
          element.textContent = parseInt(element.textContent) + 1;
        }
      });
    }
  } else {
    if (event.target.textContent !== '4') {
      if (event.target.textContent !== '20') {
        values.forEach(element => {
          if (element === values[0] || element === values[6]) {
          } else {
            element.textContent = parseInt(element.textContent) + 2;
          }
        });
      }
    }
  }
});
