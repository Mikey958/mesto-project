import "../pages/index.css";
import addIcon from "../images/add-icon.svg";
import avatar from "../images/avatar.jpg";
import card_1 from "../images/card_1.jpg";
import card_2 from "../images/card_2.jpg";
import card_3 from "../images/card_3.jpg";
import close from "../images/close.svg";
import deleteIcon from "../images/delete-icon.svg";
import editIcon from "../images/edit-icon.svg";
import likeActive from "../images/like-active.svg";
import likeInactive from "../images/like-inactive.svg";
import logo from "../images/logo.svg";
import { initialCards } from "./cards.js";

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const cardPopupImage = imagePopup.querySelector(".popup__image");
const cardPopupName = imagePopup.querySelector(".popup__caption");

document.querySelector(".logo").src = logo;
document.querySelector(".profile__image").style.backgroundImage =
  `url("${avatar}")`;

const createCard = (cardData) => {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".places__item").remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(imagePopup);
    cardPopupImage.src = cardData.link;
    cardPopupImage.alt = cardData.name;
    cardPopupName.textContent = cardData.name;
  });

  return card;
};

const renderCards = () => {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardList.append(card);
  });
};

renderCards();

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

const openModal = (popup) => {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
};

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
};

const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closeModal(popup);
  });
});

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

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

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

  const newCardTitle = cardTitleInput.value;
  const newCardLink = cardImageInput.value;

  const newCardData = {
    name: newCardTitle,
    link: newCardLink,
  };

  const newCard = createCard(newCardData);

  cardList.prepend(newCard);

  closeModal(cardPopup);
};

createCardBtn.addEventListener("click", openCardPopup);
cardForm.addEventListener("submit", handleCardFormSubmit);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_active");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_active");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.classList.remove("popup__button_inactive");
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
