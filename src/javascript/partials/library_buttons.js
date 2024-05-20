
document.addEventListener('DOMContentLoaded', () => {
  const watchedButton = document.querySelector('[data-watched]');
  const queueButton = document.querySelector('[data-queue]');
  const watchedContainer = document.getElementById('watched-movies-container');
  const queueContainer = document.getElementById('queue-container');

  function renderMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      const img = document.createElement('img');
      const title = document.createElement('h1');
      const genre = document.createElement('p');
      const year = document.createElement('p');

      img.src = movie.image;
      title.textContent = movie.title;
      genre.textContent = movie.genre;
      year.textContent = movie.year;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(genre);
      card.appendChild(year);
      container.appendChild(card);
    });
  }

  function displayMovies(key, container) {
    const movies = JSON.parse(localStorage.getItem(key)) || [];
    renderMovies(movies, container);
  }

  watchedButton.addEventListener('click', e => {
    if (!watchedButton.classList.contains('SelectedButton')) {
      e.target.classList.add('SelectedButton');
      queueButton.classList.remove('SelectedButton');
      displayMovies('watchedMovies', watchedContainer);
      queueContainer.innerHTML = '';
    }
  });

  queueButton.addEventListener('click', e => {
    if (!queueButton.classList.contains('SelectedButton')) {
      e.target.classList.add('SelectedButton');
      watchedButton.classList.remove('SelectedButton');
      displayMovies('queueMovies', queueContainer);
      watchedContainer.innerHTML = '';
    }
  });

  const backToHomeButton = document.querySelector('.LogoWraper');
  backToHomeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  displayMovies('watchedMovies', watchedContainer);
});
