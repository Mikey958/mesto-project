import "../pages/index.css";

import { enableValidation } from "./validate.js";
import { initialCards } from "./cards.js";
import { createCard } from "./card";
import { openModal, closeModal, closeOnClick } from "./modal.js";

import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

const cohortId = "apf-cohort-202";
const token = "469454c5-e998-4a07-b92b-c8b398841337";

const cardList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
export const imagePopup = document.querySelector(".popup_type_image");
export const cardPopupImage = imagePopup.querySelector(".popup__image");
export const cardPopupName = imagePopup.querySelector(".popup__caption");

document.querySelector(".logo").src = logo;
document.querySelector(".profile__image").style.backgroundImage =
  `url("${avatar}")`;

const renderCards = () => {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardList.append(card);
  });
};

renderCards();

const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileBtn = document.querySelector(".profile__edit-button");

const openProfilePopup = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(profilePopup);
};

editProfileBtn.addEventListener("click", openProfilePopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);

const cardForm = cardPopup.querySelector(".popup__form");
const cardTitleInput = cardForm.querySelector(".popup__input_type_card-name");
const cardImageInput = cardForm.querySelector(".popup__input_type_url");

const createCardBtn = document.querySelector(".profile__add-button");

const openCardPopup = () => {
  cardTitleInput.value = "";
  cardImageInput.value = "";
  openModal(cardPopup);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };

  const newCard = createCard(newCardData);
  cardList.prepend(newCard);

  closeModal(cardPopup);
};

createCardBtn.addEventListener("click", openCardPopup);
cardForm.addEventListener("submit", handleCardFormSubmit);

closeOnClick(profilePopup);
closeOnClick(cardPopup);
closeOnClick(imagePopup);

const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closeModal(popup);
  });
});

enableValidation();
