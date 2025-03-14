export const openModal = (popup) => {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
};

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
};

const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

export const closeOnClick = (popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
};
