function createModalTemplate() {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal');
  modalContainer.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div id="movieDetails"></div>
      <div class="modal-buttons">
        <button id="addToWatchedBtn">Add to Watched</button>
        <button id="addToQueueBtn">Add to Queue</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);

  const closeButton = modalContainer.querySelector('.close');
  closeButton.addEventListener('click', closeModal);
}

function openModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.style.display = 'block';
}

function closeModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.style.display = 'none';
}

export { createModalTemplate, openModal, closeModal };
