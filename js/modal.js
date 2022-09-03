window.addEventListener("DOMContentLoaded", () => {
  const buttonModal = document.querySelectorAll("[data-modal]");
  const modalWindow = document.querySelector(".modal");
  console.log(buttonModal);

  function openModal() {
    modalWindow.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }
  buttonModal.forEach((item) => {
    item.addEventListener("click", openModal);
  });
  function closeModal() {
    modalWindow.style.display = "none";
    document.body.style.overflow = "";
  }
  const buttonCloseModal = document.querySelector("[data-close]");
  buttonCloseModal.addEventListener("click", closeModal);
  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      modalWindow.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  let modalTimerId = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
});
