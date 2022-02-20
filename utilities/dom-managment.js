export const $ = (selector, context = document) =>
  context.querySelector(selector);

export const $$ = (selector, context = document) =>
  context.querySelectorAll(selector);

const isSelect = (el) => el.nodeName === "SELECT";
const isCheckbox = (el) => el.nodeName === "INPUT" && el.type === "checkbox";

const updateSelectValue = (el, value) => {
  const optionToSelect = el.querySelector(`option[value="${value}"]`);
  optionToSelect && optionToSelect.setAttribute("selected", "");
};

export const setFormControlValue = (el, value) => {
  isSelect(el)
    ? updateSelectValue(el, value)
    : isCheckbox(el)
    ? (el.checked = value)
    : (el.value = value);
};
