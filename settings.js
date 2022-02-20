import { $$ } from "./utilities/dom-managment";
import { getState } from "./state";

const { updateSettings } = getState();

$$("#settings [data-for]").forEach((el) => {
  el.addEventListener("change", ({ target }) => {
    const { checked, value } = target;
    const settingKey = target.getAttribute("data-for");
    const isNumber = target.getAttribute("type") === "number";

    let settingValue = typeof checked === "boolean" ? checked : value;
    if (isNumber) settingValue = +value;

    updateSettings({
      key: settingKey,
      value: settingValue,
    });
  });
});
