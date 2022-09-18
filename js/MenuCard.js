document.addEventListener('DOMContentLoaded', () => {
  class MenuCard {
    constructor(
      src,
      alt,
      title,
      decsription,
      price,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.decsription = decsription;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 38;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = ` 

        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.decsription}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
`;
      this.parent.append(element);
    }
  }

  new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item'
  ).render();
  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu .container',
    'menu__item'
  ).render();
  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    15,
    '.menu .container',
    'menu__item'
  ).render();

  //Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((item) => {
    postData(item);
  });
  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'multipart/form-data');
      request.setRequestHeader('Content-type', 'aplication/json');
      const formData = new FormData(form);

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      // request.send(formData);
      request.send(json);
      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.succes;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});
