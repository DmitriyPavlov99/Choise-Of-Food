window.addEventListener("DOMContentLoaded", () => {
  // :::Табы:::
  // Доступ к табам с стилями питания
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  //Консоль логи:

  //Функция на скрытие всех табов с картинками и всех классов active
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    //Удаление всех классов active
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  //Функция на показ соответствующего таба
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();
  //Ивент на клик таба
  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
 
});
