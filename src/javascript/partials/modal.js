function createModalTemplate() {
  const existingModal = document.querySelector('.modal');
  if (existingModal) {
    existingModal.parentNode.removeChild(existingModal);
  }
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal');
  modalContainer.innerHTML = `
    <div class="modal-content">
      <span class="close">&nbsp;<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector 1" d="M8 8L22 22" stroke="black" stroke-width="2"/>
<path id="Vector 2" d="M8 22L22 8" stroke="black" stroke-width="2"/>
</svg>&nbsp;</span>
      <div id="movieDetails" class="movieDetailsWrapper"></div>
      <div class="modal-buttons">
        <button class="watched" id="addToWatchedBtn">Add to Watched</button>
        <button class="queue" id="addToQueueBtn">Add to Queue</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  const closeButton = modalContainer.querySelector('.close');
  closeButton.addEventListener('click', closeModal);
  modalContainer.addEventListener('click', event => {
    if (event.target === modalContainer) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  const addToWatchedBtn = modalContainer.querySelector('#addToWatchedBtn');
  const addToQueueBtn = modalContainer.querySelector('#addToQueueBtn');

  addToWatchedBtn.addEventListener('click', () =>
    addToLocalStorage('watchedMovies', selectedMovie),
  );
  addToQueueBtn.addEventListener('click', () => addToLocalStorage('queueMovies', selectedMovie));
}

function addToLocalStorage(key, movie) {
  let movies = JSON.parse(localStorage.getItem(key)) || [];
  movies.push(movie);
  localStorage.setItem(key, JSON.stringify(movies));
}
function openModal(selectedMovie) {
  const modalContainer = document.querySelector('.modal');
  const movieDetails = document.getElementById('movieDetails');

  movieDetails.innerHTML = '';

  const movieImage = document.createElement('img');
  movieImage.src = selectedMovie.image;
  movieImage.alt = selectedMovie.title;
  movieImage.classList.add('modal-movie-image');

  const title = document.createElement('h2');
  title.textContent = selectedMovie.title;
  title.classList.add('modal-movie-title');

  const additionalInfo = document.createElement('div');
  additionalInfo.classList.add('modal-additional-Info');

  const dataPairs = [
    { label: 'Vote/Votes', value: `${selectedMovie.voteAverage} / ${selectedMovie.voteCount}` },
    { label: 'Popularity', value: selectedMovie.popularity },
    { label: 'Original Title', value: selectedMovie.originalTitle },
    { label: 'Genre', value: selectedMovie.genre },
  ];

  dataPairs.forEach(pair => {
    const paragraph = document.createElement('p');
    paragraph.classList.add('modal-row-wrapper');
    paragraph.innerHTML = `<span class="modal-data-name-wrapper">${pair.label}</span>: <span class="modal-data-wrapper">${pair.value}</span>`;
    additionalInfo.appendChild(paragraph);
  });
  const aboutSection = document.createElement('div');
  aboutSection.classList.add('modal-overview');
  const aboutSectionTextHead = document.createElement('p');
  aboutSectionTextHead.classList.add('modal-overview-text-Head');
  aboutSectionTextHead.innerHTML = `About`;
  const aboutSectionText = document.createElement('p');
  aboutSectionText.classList.add('modal-overview-text');
  aboutSectionText.innerHTML = selectedMovie.overview;

  movieDetails.appendChild(movieImage);
  movieDetails.appendChild(title);
  movieDetails.appendChild(additionalInfo);
  aboutSection.appendChild(aboutSectionTextHead);
  aboutSection.appendChild(aboutSectionText);

  movieDetails.appendChild(aboutSection);

  modalContainer.style.display = 'block';

  modalContainer.classList.add('show');
  document.body.classList.add('modal-open');
  const addToWatchedBtn = document.getElementById('addToWatchedBtn');
  const addToQueueBtn = document.getElementById('addToQueueBtn');

  addToWatchedBtn.onclick = () => addToLocalStorage('watchedMovies', selectedMovie);
  addToQueueBtn.onclick = () => addToLocalStorage('queueMovies', selectedMovie);
}

function closeModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.style.display = 'none';
  document.body.classList.remove('modal-open');
}

export { createModalTemplate, openModal, closeModal };
