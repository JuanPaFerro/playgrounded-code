import { $, $$ } from "./utilities/dom-managment";

const aside = $("aside");
const views = $$(".view");
const buttons = $$("button", aside);

buttons.forEach((b) => {
  b.addEventListener("click", ({ currentTarget }) => {
    $(".is-active").classList.remove("is-active");  
    currentTarget.classList.add("is-active");
    const elementIdToShow = b.getAttribute("data-to");
    views.forEach((v) => {
      v.style.display = "none";
    });

    $(`#${elementIdToShow}`).style.display = "";
  });
});
