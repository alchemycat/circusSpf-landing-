import { burger } from './functions/burger';
import { closeModal, openModal } from './functions/modal';
import { smoothScrolling } from './functions/smoothScrolling';
import { changeBG } from './functions/changeBG';
import './functions/inputmask.min';
import './functions/just-validate.min';

window.addEventListener('DOMContentLoaded', () => {
  changeBG();

  window.addEventListener('scroll', changeBG);

  smoothScrolling();

  burger();

  closeModal('.modal', ['#modal-order', '#modal-apply'], '.modal__close');

  openModal('.intro__button', '.modal', '#modal-apply');

  openModal(
    '.services__card button',
    '.modal',
    '#modal-order',
    '.services__caption',
    '.services__price'
  );
  openModal(
    '.advertising__card button',
    '.modal',
    '#modal-order',
    '.advertising__caption',
    '.advertising__price'
  );

  function createMask(inputsSelector, mask) {
    let inputs = document.querySelectorAll(inputsSelector);

    let im = new Inputmask(mask);
    im.mask(inputs);
  }

  createMask('[type="tel"]', '+7(999)999-99-99');

  function validateForms(selector, rules) {
    new window.JustValidate(selector, {
      rules: rules,
      messages: {
        name: 'Укажите имя',
        phone: 'Укажите телефон',
      },
      submitHandler: function (form) {
        const at = document.querySelector('.alert');
        const button = document
          .querySelector(selector)
          .querySelector('.button');

        if (at) {
          at.remove();
        }

        button.setAttribute('disabled', true);

        const alertText = document.createElement('div');
        alertText.classList.add('alert');

        const spinner = document.createElement('img');
        spinner.classList.add('spinner');
        spinner.src = './img/spinner.gif';
        form.appendChild(spinner);

        let formData = new FormData(form);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              spinner.remove();
              button.removeAttribute('disabled');
              alertText.innerText = 'Заявка успешно отправлена.';

              form.append(alertText);
            } else {
              button.removeAttribute('disabled');
              spinner.remove();
              alertText.innerText = 'Ошибка, попробуйте еще раз.';
              form.append(alertText);
            }
            form.reset();
          }
          setTimeout(() => {
            alertText.remove();
          }, 5000);
        };

        xhr.open('POST', '/mailer/smart.php', true);
        xhr.send(formData);
      },
    });
  }

  validateForms('#apply', {
    name: { required: true },
    phone: { required: true },
  });

  validateForms('#contacts', {
    name: { required: true },
    phone: { required: true },
  });

  validateForms('#order', {
    name: { required: true },
    phone: { required: true },
  });

  validateForms('#call', {
    name: { required: true },
    phone: { required: true },
  });
});
