import { openModal } from "./modal.js";
import { imagePopup, cardPopupImage, cardPopupName } from "./index.js";

export const createCard = (cardData) => {
  const cardTemplate = document.querySelector("#card-template").content;
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
