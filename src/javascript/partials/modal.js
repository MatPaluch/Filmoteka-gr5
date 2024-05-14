function createModalTemplate() {
  const existingModal = document.querySelector('.modal');
  if (existingModal) {
    existingModal.parentNode.removeChild(existingModal);
  }
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal');
  modalContainer.innerHTML = `
    <div class="modal-content">
      <span class="close">x</span>
      <div id="movieDetails"></div>
      <div class="modal-buttons">
        <button class="watched"id="addToWatchedBtn">Add to Watched</button>
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

  const originalTitle = document.createElement('p');
  originalTitle.textContent = `Original Title: ${selectedMovie.originalTitle}`;
  originalTitle.classList.add('modal-movie-original-title');

  const genre = document.createElement('p');
  genre.textContent = `Genre: ${selectedMovie.genre}`;
  genre.classList.add('modal-movie-genre');

  const about = document.createElement('p');
  about.textContent = `About: ${selectedMovie.about}`;
  about.classList.add('modal-movie-about');

  movieDetails.appendChild(movieImage);
  movieDetails.appendChild(title);
  movieDetails.appendChild(originalTitle);
  movieDetails.appendChild(genre);
  movieDetails.appendChild(about);
  modalContainer.style.display = 'block';

  modalContainer.classList.add('show');
}

function closeModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.style.display = 'none';
}

export { createModalTemplate, openModal, closeModal };
