import { $$ } from "./utilities/dom-managment";
import { getState } from "./state";

const settings = $$("#settings [data-for]");
const { updateSettings, ...restOfSettings } = getState();

settings.forEach((el) => {
  const settingKey = el.getAttribute("data-for");
  const actualSettingValue = restOfSettings[settingKey];
  const isSelect = el.nodeName === "SELECT";
  const isCheckbox = el.nodeName === "INPUT" && el.type === "checkbox";
  if (isSelect) {
    const optionToSelect = el.querySelector(
      `option[value="${actualSettingValue}"]`
    );
    optionToSelect && optionToSelect.setAttribute("selected", "");
  } else if (isCheckbox) {
    el.checked = actualSettingValue;
  } else {
    el.value = actualSettingValue;
  }

  el.addEventListener("change", ({ target }) => {
    const { checked, value } = target;
    const isNumber = target.getAttribute("type") === "number";

    let settingValue = typeof checked === "boolean" ? checked : value;
    if (isNumber) settingValue = +value;

    updateSettings({
      key: settingKey,
      value: settingValue,
    });
  });
});
