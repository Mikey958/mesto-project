import "../pages/index.css";

import {
  getUserInfo,
  getCardList,
  changeProfile,
  addCard,
  updateProfileAvatar,
} from "./api";

import { enableValidation } from "./validate.js";
import { createCard, getUserId } from "./card";
import { openModal, closeModal, closeOnClick } from "./modal.js";

import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

const cardList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
export const imagePopup = document.querySelector(".popup_type_image");
export const cardPopupImage = imagePopup.querySelector(".popup__image");
export const cardPopupName = imagePopup.querySelector(".popup__caption");

document.querySelector(".logo").src = logo;

const renderCards = () => {
  getCardList()
    .then((cards) => {
      cards.forEach((cardData) => {
        const card = createCard(cardData);
        cardList.append(card);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

renderCards();

const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);

const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

getUserInfo()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    getUserId(userData._id);
  })
  .catch((err) => console.log(err));

const editProfileBtn = document.querySelector(".profile__edit-button");
const editAvatarBtn = document.querySelector(".profile__image");

const openProfilePopup = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
};

const openAvatarPopup = () => {
  avatarInput.value = profileAvatar.style.backgroundImage;
  openModal(avatarPopup);
};

const toggleButtonState = (button, isLoading) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const button = profileForm.querySelector(".popup__button");
  toggleButtonState(button, true);

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  changeProfile(newName, newDescription)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;

      closeModal(profilePopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleButtonState(button, false);
    });
};

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const button = avatarForm.querySelector(".popup__button");
  toggleButtonState(button, true);

  const newAvatar = avatarInput.value;

  updateProfileAvatar(newAvatar)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;

      closeModal(avatarPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleButtonState(button, false);
    });
};

editProfileBtn.addEventListener("click", openProfilePopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);

editAvatarBtn.addEventListener("click", openAvatarPopup);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

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

  const button = cardForm.querySelector(".popup__button");
  toggleButtonState(button, true);

  const newCardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };

  addCard(newCardData.name, newCardData.link)
    .then((cardData) => {
      const newCard = createCard(cardData);
      cardList.prepend(newCard);

      closeModal(cardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleButtonState(button, false);
    });
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
