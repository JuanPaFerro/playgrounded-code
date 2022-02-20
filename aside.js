import { $, $$ } from "./utilities/dom-managment";

const aside = $("aside");
const views = $$(".view");
const buttons = $$("button", aside);

buttons.forEach((b) => {
  b.addEventListener("click", () => {
    const elementIdToShow = b.getAttribute("data-to");
    views.forEach((v) => {
       v.style.display = "none";
       console.log(v)
    });

    $(`#${elementIdToShow}`).style.display = "";
    console.log(views)
  });
});
