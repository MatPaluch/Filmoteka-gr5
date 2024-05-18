import axios from 'axios';

const serchInput = document.querySelector(".SearchForm");
const container = document.getElementById('movie-container');
const basicImage = 'https://image.tmdb.org/t/p/w500';
let array = [];


const url = 'https://api.themoviedb.org/3/search/movie?api_key=b942b8bf626a04f48b07153a95ee51a0';



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

serchInput.addEventListener("submit",((event)=>{
    event.preventDefault();
    container.innerHTML = "";
    fetchMove(serchInput.children[0].value);
    console.log(changeValue(event));
})
)



async function fetchMove(value) {
    try {
      array = [];
      let response = await axios.get(`${url}&query=${value}`);
      console.log(`${url}&query=${value}`);
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


  function changeValue(array) {
    const found = arrayMoves.find(element => Object.values(element)[0] === array);
    if (found) {
        return Object.keys(found)[0]; 
    } else {
        return;
    }
}