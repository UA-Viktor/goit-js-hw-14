export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Показать ещё';
    this.refs.spinner.classList.add('visually-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Загружаем...';
    this.refs.spinner.classList.remove('visually-hidden');
  }

  show() {
    this.refs.button.classList.remove('visually-hidden');
  }

  hide() {
    this.refs.button.classList.add('visually-hidden');
  }
}
