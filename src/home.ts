import { getAllGames } from "../utilities/Fetch-Get-videoGames/fetchGetGames";
import { renderGenres, renderGameCardEl, renderGames } from "./header";

async function getGames(): Promise<void> {
  const allGamesResponse = await getAllGames();
  if (!allGamesResponse) return;
  const dataGames = allGamesResponse.results;
  getEachGameDetail(dataGames);
}

async function getEachGameDetail(dataGames) {
  const card = document.querySelector("#card__content__wrapper") as HTMLElement;
  dataGames.forEach((game: any) => {
    const gameCardEl = renderGameCardEl(game);
    card.append(gameCardEl);
    renderGenres(game.genres);
    renderGames(dataGames, card);
  });
}

const button = document.querySelector("#button__filter") as HTMLElement;
const content = document.querySelector("#display__order") as HTMLElement;
const listOfCategories = document.querySelectorAll(
  ".categories__games"
) as NodeListOf<HTMLElement>;
const categorySelected = document.querySelector("#categories") as HTMLElement;
button.addEventListener("click", openCategories);
function openCategories() {
  if (!content.classList.contains("is-open")) {
    content.classList.add("is-open");
    content.style.display = "flex";
  } else {
    content.classList.remove("is-open");
    content.style.display = "none";
  }
}

const check1 = document.querySelector(".check-icon");
check1?.classList.add("show");
let opcionSeleccionada: HTMLElement | null = null;
listOfCategories.forEach((category: HTMLElement) => {
  category.addEventListener("click", selectCategory);
  function selectCategory(event: Event) {
    check1?.classList.remove("show");
    const optionChoosen = event.target?.firstElementChild as HTMLElement;
    if (opcionSeleccionada !== null) {
      opcionSeleccionada.classList.remove("show");
    }
    opcionSeleccionada = optionChoosen;
    opcionSeleccionada.classList.add("show");

    categorySelected.textContent = category.textContent;
    content.classList.remove("is-open");
    content.style.display = "none";
  }
});
getGames();
