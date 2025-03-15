import { openModal } from "./modal.js";
import { imagePopup, cardPopupImage, cardPopupName } from "./index.js";
import { deleteCard, getUserInfo, likeCard, unlikeCard } from "./api";

let userId = null;

export const getUserId = (id) => {
  userId = id;
};

export const createCard = (cardData) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  const likesCount = card.querySelector(".card__likes-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likesCount.textContent = cardData.likes.length;

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active",
    );

    const apiCall = isLiked ? unlikeCard(cardData._id) : likeCard(cardData._id);

    apiCall
      .then((card) => {
        likesCount.textContent = card.likes.length;
        likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      })
      .catch((err) => console.log(err));
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardData._id)
      .then(() => {
        card.remove();
      })
      .catch((error) => {
        console.error(error);
      });
  });

  cardImage.addEventListener("click", () => {
    openModal(imagePopup);
    cardPopupImage.src = cardData.link;
    cardPopupImage.alt = cardData.name;
    cardPopupName.textContent = cardData.name;
  });

  return card;
};
