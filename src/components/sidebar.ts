const sidebarButtonEls = document.querySelectorAll<HTMLElement>(
  ".sidebar__button__hide"
);
// const sidebarIconArrowEls = document.querySelectorAll<HTMLElement>(
//   ".sidebar__icon__button"
// );
// const sidebarChangeShowEls = document.querySelectorAll<HTMLElement>(
//   ".sidebar_changeShow"
// );
// const sidebarHideEls = document.querySelectorAll<HTMLElement>(
//   ".sidebar__textHide"
// );
sidebarButtonEls.forEach((button) => {
  const firstElementChild = button.firstElementChild as HTMLElement;
  const secondElementChild =
    firstElementChild.nextElementSibling as HTMLElement;
  button.addEventListener("click", () => {
    button.previousElementSibling!.classList.toggle("block");
    firstElementChild.classList.toggle("rotate");
    button.lastElementChild!.classList.toggle("block");
    secondElementChild.classList.toggle("none");
  });
});
