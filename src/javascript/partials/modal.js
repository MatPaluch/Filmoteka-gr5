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
}
function openModal(selectedMovie) {
  const modalContainer = document.querySelector('.modal');
  const movieDetails = document.getElementById('movieDetails');

  movieDetails.innerHTML = '';

  const movieImage = document.createElement('img');
  movieImage.src = selectedMovie.image;
  movieImage.alt = selectedMovie.title;
  movieImage.classList.add('modal-movie-image');

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('modal-details-container');

  const title = document.createElement('h2');
  title.textContent = selectedMovie.title;
  title.classList.add('modal-movie-title');

  const additionalInfo = document.createElement('div');
  additionalInfo.classList.add('modal-additional-Info');

  const voteAverageSpan = document.createElement('span');
  voteAverageSpan.textContent = selectedMovie.voteAverage.toFixed(1);
  voteAverageSpan.classList.add('modal-vote-average');

  const voteCountSpan = document.createElement('span');
  voteCountSpan.textContent = selectedMovie.voteCount;
  voteCountSpan.classList.add('modal-vote-count');

  // const genre = selectedMovie.genre.length > 0 ? selectedMovie.genre[0] : '';
  const popularity = selectedMovie.popularity.toFixed(0);

  const dataPairs = [
    { label: 'Vote/Votes', value: `${voteAverageSpan.outerHTML} / ${voteCountSpan.outerHTML}` },
    { label: 'Popularity', value: popularity },
    { label: 'Original Title', value: selectedMovie.originalTitle },
    { label: 'Genre', value: selectedMovie.genre },
  ];

  dataPairs.forEach(pair => {
    const paragraph = document.createElement('p');
    paragraph.classList.add('modal-row-wrapper');
    paragraph.innerHTML = `<div class="modal-data-name-wrapper">${pair.label}</div><div class="modal-data-wrapper">${pair.value}</div>`;
    additionalInfo.appendChild(paragraph);
  });
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('modal-buttons');

  const watchedButton = document.createElement('button');
  watchedButton.classList.add('watched');
  watchedButton.id = 'addtToWatchedBtn';
  watchedButton.textContent = 'Add to Watched';

  const queueButton = document.createElement('button');
  queueButton.classList.add('queue');
  queueButton.id = 'addToQueueBtn';
  queueButton.textContent = 'Add to queue';

  buttonContainer.appendChild(watchedButton);
  buttonContainer.appendChild(queueButton);

  movieDetails.appendChild(movieImage);
  detailsContainer.appendChild(title);
  detailsContainer.appendChild(additionalInfo);
  movieDetails.appendChild(detailsContainer);

  if (selectedMovie.overview.trim() !== '') {
    const aboutSection = document.createElement('div');
    aboutSection.classList.add('modal-overview');

    const aboutSectionTextHead = document.createElement('p');
    aboutSectionTextHead.classList.add('modal-overview-text-Head');
    aboutSectionTextHead.innerHTML = `About`;

    const aboutSectionText = document.createElement('p');
    aboutSectionText.classList.add('modal-overview-text');
    aboutSectionText.innerHTML = selectedMovie.overview;

    aboutSection.appendChild(aboutSectionTextHead);
    aboutSection.appendChild(aboutSectionText);
    detailsContainer.appendChild(aboutSection);
    detailsContainer.appendChild(buttonContainer);
  }

  modalContainer.style.display = 'block';

  modalContainer.classList.add('show');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.style.display = 'none';
  document.body.classList.remove('modal-open');
}

export { createModalTemplate, openModal, closeModal };
