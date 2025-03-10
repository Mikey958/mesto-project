import { initialCards } from "./cards.js"

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// @todo: Темплейт карточки

const createCard = (cardData) => {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return card;
}

const renderCards = () => {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardList.append(card)
  })
}

renderCards()

// @todo: DOM узлы

const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
}

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
}

const closeButtons  = document.querySelectorAll('.popup__close');

closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
})

const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editProfileBtn = document.querySelector('.profile__edit-button');

const openProfilePopup = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openModal(profilePopup);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const newName =  nameInput.value;
  const newDescription = descriptionInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  closeModal(profilePopup);
}

editProfileBtn.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
