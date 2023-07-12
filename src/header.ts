import { createDOM } from "./utilities/stringToDOM";
import { format } from "date-fns";
import {
  getGamesDataBySearch,
  Game,
  ParentPlatforms,
} from "./utilities/fetchGetGames";
import Router from "../src/router";

const platformSlugIconMap: { [key: string]: string } = {
  linux: "./public/icon/linux.svg",
  pc: "./public/icon/windows.svg",
  ios: "./public/icon/ios-icon.svg",
  mac: "./public/icon/apple.svg",
  android: "./public/icon/android-icon.svg",
  xbox: "./public/icon/xbox-icon.svg",
  playstation: "./public/icon/pplaystation-icon.svg",
  nintendo: "./public/icon/nintendo-icon.svg",
};

export function renderParentPlaforms(parentPlaforms: ParentPlatforms) {
  return parentPlaforms
    .map((platforms) => {
      const platformSlug = platforms.platform.slug;
      return `<img loading="lazy" id="ps4-icon" src="${
        platformSlugIconMap[platformSlug] ?? "./public/icon/plus-icon.svg"
      }" alt="" />`;
    })
    .join("");
}

export function renderGenres(genres: Game["genres"]) {
  return genres.map((genre) => {
    return ` <a class="links" href="/games/${genre.slug}">${genre.name} </a>`;
  });
}

export function renderGameCardEl(game: Game) {
  const releaseDate = format(new Date(game.released), "d MMM yyyy");
  const genresTemplate = renderGenres(game.genres);
  const platformsTemplate = renderParentPlaforms(game.parent_platforms);

  return createDOM(`<div class="card__wrapper"  id="gameCard">
      <div class="game__image">
        <img loading="lazy" class="videoGamePicture" id="videoGamePicture" src="${
          game.background_image ?? "../images/justInCasejpg.jpg"
        }" alt="">
        <button class="play__background" id="iconPlay">
          <img loading="lazy" class="play-icon" src="../public/icon/play-icon.svg" alt="" />
        </button>
      </div>
      <div class="main__card__content">
      <div class="card__content">
        <div class="card__header">
          <div class="games_console">
            ${platformsTemplate}
          </div>
          <span class="game__buy">${parseInt(
            game.score ?? game.metacritic
          )}</span>
        </div>
        <div class="card__title">
        <a href="/games/${game.slug}">
          <h2 class="game__name">
            ${game.name}
          </h2>
          </a>
          <img loading="lazy" src="../public/icon/plus-icon.svg" alt="">
        </div>
        <div class="more__options__button">
          <button class="card__buttons">
          <img loading="lazy" class=""plus src="../public/icon/plus-icon.svg" alt="">
            <span class="game_number">${game.added}</span>
          </button>
          <button class="card__buttons" id="gift">
            <img loading="lazy" src="../public/icon/windows.svg" alt="" />
          </button>
          <button class="card__buttons" id="moreOptions">
            <img loading="lazy" src="../public/icon/windows.svg" alt="" />
          </button>
        </div>
        <div class="show__more__details__card">
          <button class="button__details__card">View More</button>
        </div>
        </div>
        <div class="extra__information__content" id="extraInformation">
          <div class="information__content">
            <div class="information__release">
                    <h4 class="title game__release">Release Date</h4>
                    <p class="game__release__date">${releaseDate}</p>
                  </div>
                  <hr class="hr__separation" />
                  <div class="information__release">
                    <h4 class="title game__genres">Genres</h4>
                    <div class="game__genres__links">
                    ${genresTemplate}
                    </div>
                  </div>
                  <hr class="hr__separation" />
                  <div class="information__release">
                    <h4 class="title game__chart">Chart</h4>
                    <a class="links" href="">#1 top 2023</a>
                  </div>
                </div>
                <button class="games__related">
                  Show more like this
                  <img loading="lazy" src="../public/icon/icon-arrowRight.svg" alt="" />
                </button>
                <button class="games__related" id="hideGame">Hide this game</button>
              </div>
    </div>
    </div>
    `);
}

async function getDataFromSearch(searchValue: string) {
  const allGamesSearched = await getGamesDataBySearch(searchValue);
  if (!allGamesSearched) return;
  const games = allGamesSearched.results;
  const cardsEl = document.querySelector(".cards") as HTMLElement;

  const numberOfGames = document.querySelector(
    ".games__founded"
  ) as HTMLElement;
  numberOfGames.textContent = games ? `${games.length} juegos` : "...";
  renderGames(games, cardsEl);
}

export function renderGames(games: Game[], containerEl: HTMLElement) {
  containerEl.innerHTML = "";

  games.forEach((game) => {
    const gameCardEl = renderGameCardEl(game);
    generateVideoHover(gameCardEl);
    containerEl.append(gameCardEl);
  });
}

function generateVideoHover(gameCardEl: HTMLElement) {
  const img = gameCardEl.querySelector(".videoGamePicture") as HTMLMediaElement;
  const extrainfo = gameCardEl.querySelector(
    ".extra__information__content"
  ) as HTMLElement;
  const gift = gameCardEl.querySelector("#gift") as HTMLElement;
  const showOptions = gameCardEl.querySelector("#moreOptions") as HTMLElement;

  const deleteGame = gameCardEl.querySelector("#hideGame") as HTMLElement;
  deleteGame.addEventListener("click", () => {
    gameCardEl.remove();
  });
  const videoContainer = gameCardEl.querySelector(".game__image");
  const video = document.createElement("video");
  video.src =
    "https://media.rawg.io/media/stories-640/c10/c10ef05b12482e4d2c647c4e26138d5b.mp4";
  video.height = 216;
  video.loop = true;
  video.muted = true;
  video.autoplay = true;
  gameCardEl.addEventListener("mouseover", () => {
    img.style.display = "none";
    extrainfo.style.display = "flex";
    gift.style.display = "flex";
    showOptions.style.display = "flex";
    videoContainer?.append(video);
    video.currentTime = 0;
    video.play();
  });
  gameCardEl.addEventListener("mouseleave", () => {
    img.style.display = "flex";
    extrainfo.style.display = "none";
    gift.style.display = "none";
    showOptions.style.display = "none";
    video.remove();
  });
}

let timeout: number | undefined;
const inputElement = document.querySelector(".input__search") as HTMLElement;
inputElement.addEventListener("input", handleInput);
function handleInput(event: Event) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;
    const searchValue = value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", searchValue);
    Router.go(searchValue !== "" ? `/?${params}` : "/");
    if (searchValue === "") return;
    getDataFromSearch(searchValue);
  }, 500);
}

const myLibrary = document.querySelector("#libraryHeader") as HTMLElement;
const libraryContainer = document.querySelector(
  "#list__wrapper"
) as HTMLElement;

myLibrary?.addEventListener("mouseover", () => {
  libraryContainer.style.display = "flex";
});
libraryContainer?.addEventListener("mouseleave", () => {
  libraryContainer.style.display = "none";
});

const addIcon = document.querySelector(".add__icon") as HTMLElement;
const addIconWrapper = document.querySelector(
  ".features__options"
) as HTMLElement;
addIcon?.addEventListener("mouseover", () => {
  addIconWrapper.style.display = "flex";
});
addIconWrapper?.addEventListener("mouseleave", () => {
  addIconWrapper.style.display = "none";
});

const dotsOptions = document.querySelector(".dost__icon") as HTMLElement;
const dostOptionsContainer = document.querySelector(
  ".final__setting"
) as HTMLElement;
dotsOptions?.addEventListener("mouseover", () => {
  dostOptionsContainer.style.display = "flex";
});
dostOptionsContainer?.addEventListener("mouseleave", () => {
  dostOptionsContainer.style.display = "none";
});
