document.addEventListener('DOMContentLoaded', () => {
  const watchedButton = document.querySelector('.ButtonsWrapper .Buttons:first-child');
  const queueButton = document.querySelector('.ButtonsWrapper .Buttons:last-child');
  const watchedSection = document.querySelector('.watched-movies-section');
  const queueSection = document.querySelector('.queue-section');

  watchedButton.addEventListener('click', () => {
    watchedSection.style.display = 'block';
    queueSection.style.display = 'none';
    displayMovies('watchedMovies');
  });

  queueButton.addEventListener('click', () => {
    watchedSection.style.display = 'none';
    queueSection.style.display = 'block';
    displayMovies('queueMovies');
  });

  function displayMovies(key) {
    const container =
      key === 'watchedMovies'
        ? document.getElementById('watched-movies-container')
        : document.getElementById('queue-container');
    container.innerHTML = '';

    const movies = JSON.parse(localStorage.getItem(key)) || [];

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.src = movie.image;

      const details = document.createElement('div');
      details.classList.add('details');

      const title = document.createElement('h1');
      title.textContent = movie.title;

      const genre = document.createElement('p');
      genre.textContent = movie.genre.join(', ');

      const year = document.createElement('p');
      year.textContent = movie.year;

      details.appendChild(title);
      details.appendChild(genre);
      details.appendChild(year);

      card.appendChild(img);
      card.appendChild(details);

      container.appendChild(card);
    });
  }

  watchedButton.click();
});
