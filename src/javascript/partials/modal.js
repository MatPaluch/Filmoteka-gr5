function createModalTemplate(modalHtml) {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml.trim();
  document.body.appendChild(modalContainer);

  function openModal() {
    modalContainer.style.display = 'block';
  }

  function closeModal() {
    modalContainer.style.display = 'none';
  }

  function handleCardClick(event) {
    const titleElement = event.currentTarget.querySelector('h1');
    const genreElement = event.currentTarget.querySelector('p.genre');
    const yearElement = event.currentTarget.querySelector('p.year');

    if (titleElement && genreElement && yearElement) {
      const title = titleElement.textContent;
      const genre = genreElement.textContent;
      const year = yearElement.textContent;

      const modalTitle = modalContainer.querySelector('.modal-body h2');
      const modalContent = modalContainer.querySelector('.modal-body p');

      modalTitle.textContent = title;
      modalContent.textContent = `Genre: ${genre}, Year: ${year}`;
      openModal();
    }
  }

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', handleCardClick);
  });

  const closeButton = modalContainer.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
}

setTimeout(() => {
  fetch('modal.html')
    .then(response => response.text())
    .then(html => {
      createModalTemplate(html);
    })
    .catch(error => console.error('Wystąpił błąd:', error));
}, 2000);
