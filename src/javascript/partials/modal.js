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
function openModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.style.display = 'block';
}

function closeModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.style.display = 'none';
}

export { createModalTemplate, openModal, closeModal };
