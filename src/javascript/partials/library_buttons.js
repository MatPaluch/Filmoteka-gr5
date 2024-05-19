const watchedButton = document.querySelector('[data-watched]');
const queueButton = document.querySelector('[data-queue]');

watchedButton.addEventListener('click', e => {
  if (!watchedButton.classList.contains('SelectedButton')) {
    console.log(e.target);
    e.target.classList.add('SelectedButton');
    queueButton.classList.remove('SelectedButton');
  }
});
queueButton.addEventListener('click', e => {
  if (!queueButton.classList.contains('SelectedButton')) {
    console.log(e.target);
    e.target.classList.add('SelectedButton');
    watchedButton.classList.remove('SelectedButton');
  }
});
const backToHomeButton = document.querySelector('.LogoWraper');
backToHomeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});
