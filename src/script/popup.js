const popup = document.querySelector('.popup');

function openPopup() {
  popup.classList.add('popup--show');
}

function closePopup() {
  popup.classList.remove('popup--show');
}

popup.addEventListener('click', function (e) {
  if (e.target === this) closePopup();
});
