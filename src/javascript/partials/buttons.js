import axios from 'axios';

const container = document.getElementById('movie-container');
const basicImage = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/movie/popular?api_key=b942b8bf626a04f48b07153a95ee51a0';
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
 
  const element0 = values[0];
  const element1 = values[2];
  const element2 = values[3];
  const element3 = values[4];
  const element4 = values[5];
  const element5 = values[6];
  const element6 = values[8];
  const elementVoid1 = values[1];
  const elementVoid20 = values[7];

  container.innerHTML = '';
//Przycisk <-
  if(event.target === element0){
    if(element1.textContent !== "1"){
      values.map((element)=>{
        if(element.textContent === ""){
          element.textContent = "";
        }
        else{
          element.textContent = parseInt(element.textContent) - 1;
        }
      })
    }
    fetchMove(globalNumber - 1); 
  }
  //przycisk 1
  else if(event.target === element1){
    fetchMove(parseInt(event.target.textContent)); 
    if(element1.textContent === "1"){
      return;
      }
      else if(element1.textContent === "2"){
        if(element.textContent === ""){
          element.textContent = "";
        }
        else{
          values.map((element)=>{
            element.textContent = parseInt(element.textContent) - 1;
          }) 
        }
      }
        else{
          values.map((element)=>{
            if(element.textContent === ""){
              element.textContent = "";
            }
            else{
              element.textContent = parseInt(element.textContent) - 2;
            }
            
          })
        }
  }
  //przycisk 2
  else if(event.target === element2){
    fetchMove(parseInt(event.target.textContent)); 
    if(element2.textContent === "2"){
      return
    }
    else{
      values.map((element)=>{
        if(element.textContent === ""){
          element.textContent = "";
        }
        else{
          element.textContent = parseInt(element.textContent) - 1;
        }
      }) 
    }
  }
  //przycisk 3
  else if(event.target === element3){
    fetchMove(parseInt(event.target.textContent)); 
    return;
  }
  //przycisk 4
  else if(event.target === element4){
    fetchMove(parseInt(event.target.textContent)); 
      values.map((element)=>{
        if(element.textContent === ""){
          element.textContent = "";
        }
        else{
          element.textContent = parseInt(element.textContent) + 1;
        }
      }) 
    
  }
  //przycisk 5
  else if(event.target === element5){
    fetchMove(parseInt(event.target.textContent)); 
    if(element5.textContent === "20"){
      return
    }
    else if(element5.textContent === "19"){
      values.map((element)=>{
        element.textContent = parseInt(element.textContent) + 1;
      }) 
      fetchMove(parseInt(event.target.textContent)); 
    }
    else{
      values.map((element)=>{
        if(element.textContent === ""){
          element.textContent = "";
        }
        else{
          element.textContent = parseInt(element.textContent) + 2;
        }
      }) 
    }
  }
  //przycisk ->
  else if(event.target === element6){
    if(element5.textContent !== "20"){
      values.map((element)=>{
        if(element.textContent === ""){
          element.textContent = "";
        }
        else{
          element.textContent = parseInt(element.textContent) + 1;
        }
      }) 
    }
    fetchMove(globalNumber+1); 
  }
  else if(event.target === elementVoid1){
    fetchMove(1);
  }
  else if(event.target === elementVoid20){
    fetchMove(20);
    element1.textContent = "16";
    element2.textContent = "17";
    element3.textContent = "18";
    element4.textContent = "19";
    element5.textContent = "20";
  }
  elementVoid1.textContent = "1";
  elementVoid20.textContent = "20";
});