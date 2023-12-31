import {
  getAllGamesGenres,
  descriptionGameGenreType,
  getFiltersDescription,
  ParentPlatforms,
  Game,
} from "./utilities/fetchGetGames";
import { createDOM } from "./utilities/stringToDOM";
import { format } from "date-fns";

type genresType = {
  id: number;
  name: string;
  slug: string;
}[];

let platformSlugIconMap: { [key: string]: string } = {
  linux: "../icon/linux.svg",
  pc: "../icon/windows.svg",
  ios: "../icon/ios-icon.svg",
  mac: "../icon/apple.svg",
  android: "../icon/android-icon.svg",
  xbox: "../icon/xbox-icon.svg",
  playstation: "../icon/pplaystation-icon.svg",
  nintendo: "../icon/nintendo-icon.svg",
};

async function getGamesData(): Promise<void> {
  try {
    const [dataGamesbyGenre, allfilterDescription] = await Promise.all([
      getAllGamesGenres(),
      getFiltersDescription(),
    ]);

    if (!dataGamesbyGenre) return;
    if (!allfilterDescription) return;
    // const data = allGamesResponse.results;
    getEachGamereder(dataGamesbyGenre?.results, allfilterDescription);
  } catch {}
}

function getDescriptcionOfGenre(genreDescription: descriptionGameGenreType) {
  const splitDescription = genreDescription.description.split(" ");
  const descriptionGenreStart = splitDescription.slice(0, 118).join(" ");
  const descriptionGenreEnd = splitDescription.slice(0).join(" ");

  return createDOM(`<div id="contentWrapperMain">
  <div class="main__header__content">
    <div class="action__head__wrapp">
      <h1 class="acttion__title">${genreDescription.name} Games</h1>
      <div class="interaction__butons">
        <button class="button__follow">Follow</button>
        <button class="button__follow icon">
          <img loading="lazy"  src="../icon/share-icon.svg" alt="" />
        </button>
      </div>
    </div>
    <div class="genred__description" id="halfDescription">
    ${descriptionGenreStart}
    <span class="descriptionDots">...</span>
    <button class="read__more__buton" id="largeTextButton">Read more</button>
    </div>
    <div class="genred__description__end" id="entireDescription">
    ${descriptionGenreEnd}
    <button class="read__more__buton" id="shortTextButton">Read less</button>
    </div>
    
    <div class="related__tags">
      <h3 class="related__tags__title">Related tags:</h3>
      <div class="related__tags__buttons">
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">Singleplayer</button>
        <button class="relate__tag">close</button>
      </div>
    </div>
    <div class="order__games">
      <div class="order__games__buttons">
        <div class="order__action__games">
          <button
            class="button__action__filter"
            id="action__button__filter"
          >
            Order by:
            <span class="categories" id="action__categories"
              >Popularity</span
            >
            <img loading="lazy" src="../icon/dropDown-icon.svg" alt="" />
          </button>
          <div
            class="display__action__order"
            id="display__action__order"
          >
            <ul>
              <li
                class="categories__action__games is-selected"
                id="dateAdded"
              >
                Date added
                <img loading="lazy"
                  class="check-icon"
                  src="../icon/check-icon.svg"
                  alt=""
                />
              </li>
              <li
                class="categories__action__games is-selected"
                id="Name"
              >
                Name
                <img loading="lazy"
                  class="check-icon"
                  src="../icon/check-icon.svg"
                  alt=""
                />
              </li>
              <li
                class="categories__action__games is-selected"
                id="releaseDate"
              >
                Release date
                <img loading="lazy"
                  class="check-icon"
                  src="../icon/check-icon.svg"
                  alt=""
                />
              </li>
              <li
                class="categories__action__games is-selected"
                id="Popularity"
              >
                Popularity
                <img loading="lazy"
                  class="check-icon"
                  id="popularityOption"
                  src="../icon/check-icon.svg"
                  alt=""
                />
              </li>
              <li
                class="categories__action__games is-selected"
                id="averageRating"
              >
                Average rating
                <img loading="lazy"
                  class="check-icon"
                  src="../icon/check-icon.svg"
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
        <button class="button__filter" id="button__filter">
          Release Date
          <img loading="lazy" src="../icon/dropDown-icon.svg" alt="" />
        </button>
        <button class="button__filter" id="button__filter">
          Platforms
          <img loading="lazy" src="../icon/dropDown-icon.svg" alt="" />
        </button>
      </div>
      <div class="discover__layouts">
        <p class="display__Options">Display options:</p>
        <button class="layout__grid" id="layoutGrid">
          <img loading="lazy"
            class="display__icons"
            src="../icon/grid-icon.svg"
            alt=""
          />
        </button>
        <button class="layout__grid" id="layoutGridList">
          <img loading="lazy"
            class="display__icons"
            src="../icon/list-icon.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    </div>
    <div class="gamesfilter">
            <div class="gamefilterCards" id="gamefilterCards"></div>
          </div>
  </div>`);
}

function getEachGamereder(
  dataGamesbyGenre: Game[],
  allfilterDescription: descriptionGameGenreType
) {
  const headerWrapperContent = document.querySelector(
    "#actionGenre"
  ) as HTMLElement;
  const headerContenterFilter = getDescriptcionOfGenre(allfilterDescription);
  headerWrapperContent.append(headerContenterFilter);

  const halfDescription = headerContenterFilter.querySelector(
    "#halfDescription"
  ) as HTMLElement;
  const entireDescription = headerContenterFilter.querySelector(
    "#entireDescription"
  ) as HTMLElement;

  if (entireDescription.firstElementChild) {
    const element = entireDescription.firstElementChild as HTMLElement;
    element.style.display = "inline";
  }

  const readMoreButton = headerContenterFilter.querySelector(
    "#largeTextButton"
  ) as HTMLElement;
  readMoreButton.addEventListener("click", () => {
    halfDescription.style.display = "none";
    entireDescription.style.display = "block";
  });
  const readLessButton = headerContenterFilter.querySelector(
    "#shortTextButton"
  ) as HTMLElement;
  readLessButton.addEventListener("click", () => {
    halfDescription.style.display = "block";
    entireDescription.style.display = "none";
  });
  const actionButtonFilter = headerContenterFilter.querySelector(
    "#action__button__filter"
  ) as HTMLElement;
  const containerActionCategories = headerContenterFilter.querySelector(
    "#display__action__order"
  ) as HTMLElement;
  const listOfActionCategories = headerContenterFilter.querySelectorAll(
    ".categories__action__games"
  ) as NodeListOf<HTMLElement>;
  const actionCategorySelected = headerContenterFilter.querySelector(
    "#action__categories"
  ) as HTMLElement;

  actionButtonFilter.addEventListener("click", openActionCategories);

  function openActionCategories() {
    if (!containerActionCategories.classList.contains("is-open")) {
      containerActionCategories.classList.add("is-open");
      containerActionCategories.style.display = "flex";
    } else {
      containerActionCategories.classList.remove("is-open");
      containerActionCategories.style.display = "none";
    }
  }

  function getOptionCategories(genreOptions: NodeListOf<HTMLElement>) {
    genreOptions.forEach((category: HTMLElement) => {
      category.addEventListener("click", selectCategory);
      function selectCategory(event: Event) {
        Popularitycheck?.classList.remove("show");
        const target = event.target;
        if (target instanceof HTMLElement) {
          const firstChild = target.firstElementChild;

          const optionChoosen = firstChild as HTMLElement;
          // opcionSeleccionada = event.target.textContent;
          if (opcionSeleccionada !== null) {
            opcionSeleccionada.classList.remove("show");
          }
          opcionSeleccionada = optionChoosen;
          opcionSeleccionada.classList.add("show");

          actionCategorySelected.textContent = category.textContent;
          containerActionCategories.classList.remove("is-open");
          containerActionCategories.style.display = "none";
        }
      }
    });
  }

  const Popularitycheck = document.querySelector("#popularityOption");
  Popularitycheck?.classList.add("show");
  let opcionSeleccionada: HTMLElement | null = null;
  getOptionCategories(listOfActionCategories);

  function getPlatforms(game: ParentPlatforms) {
    return game
      .map((platforms) => {
        const platformSlug = platforms.platform.slug;
        return `<img loading="lazy" id="ps4-icon" src="${
          platformSlugIconMap[platformSlug] ?? "../icon/plus-icon.svg"
        }" alt="" />`;
      })
      .join("");
  }

  dataGamesbyGenre.forEach((game) => {
    const filterCards = document.querySelector(
      "#gamefilterCards"
    ) as HTMLElement;

    const newDate = format(new Date(game.released), "d MMM yyyy");

    function renderGenres(genres: genresType) {
      return genres.map((generos) => {
        return ` <a class="links" href=${generos.slug}>${generos.name} </a>`;
      });
    }

    function createCard(game: Game) {
      const generosGames = renderGenres(game.genres);
      const getGamesPlatform = getPlatforms(game.parent_platforms);
      return createDOM(`<div class="card__wrapper"  id="gameCard">
      <div class="game__image">
        <img loading="lazy" class="videoGamePicture" id="videoGamePicture" src="${game.background_image}" alt="">
        <button class="play__background" id="iconPlay">
          <img loading="lazy" class="play-icon" src="../icon/play-icon.svg" alt="" />
        </button>
      </div>
      <div class="main__card__content">
      <div class="card__content">
        <div class="card__header">
          <div class="games_console">
            ${getGamesPlatform}
          </div>
          <span class="game__buy">${game.metacritic}</span>
        </div>
        <div class="card__title">
        <a style="text-decoration:none" href="/games/${game.slug}">
        <h2 class="game__name">
          ${game.name}
        </h2>
        </a>
          <img loading="lazy" src="../icon/plus-icon.svg" alt="">
        </div>
        <div class="more__options__button">
          <button class="card__buttons">
          <img loading="lazy" class=""plus src="../icon/plus-icon.svg" alt="">
            <span class="game_number">${game.ratings_count}</span>
          </button>
          <button class="card__buttons" id="gift">
            <img loading="lazy" src="../icon/windows.svg" alt="" />
          </button>
          <button class="card__buttons" id="moreOptions">
            <img loading="lazy" src="../icon/windows.svg" alt="" />
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
                    <p class="game__release__date">${newDate}</p>
                  </div>
                  <hr class="hr__separation" />
                  <div class="information__release">
                    <h4 class="title game__genres">Genres</h4>
                    <div class="game__genres__links">
                    ${generosGames}
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
                  <img loading="lazy" src="../icon/icon-arrowRight.svg" alt="" />
                </button>
                <button class="games__related" id="hideGame">Hide this game</button>
              </div>
    </div>
    </div>
    `);
    }

    game.genres.map((gender) => {
      const actionGenre = gender.slug;

      if (window.location.pathname.includes(`/genres/${actionGenre}`)) {
        const cardContentFilter = createCard(game);
        filterCards.append(cardContentFilter);

        const img = cardContentFilter.querySelector(
          ".videoGamePicture"
        ) as HTMLElement;
        const extrainfo = cardContentFilter.querySelector(
          ".extra__information__content"
        ) as HTMLElement;
        const gift = cardContentFilter.querySelector("#gift") as HTMLElement;
        const showOptions = cardContentFilter.querySelector(
          "#moreOptions"
        ) as HTMLElement;

        const deleteGame = cardContentFilter.querySelector(
          "#hideGame"
        ) as HTMLElement;
        deleteGame.addEventListener("click", () => {
          cardContentFilter.remove();
        });

        const videoContainer = cardContentFilter.querySelector(".game__image");
        const video = document.createElement("video");
        video.src =
          "https://media.rawg.io/media/stories-640/6e7/6e7d3b3665e1a4321fdbbcf561dcbb0e.mp4";
        video.height = 216;
        video.loop = true;
        video.muted = true;
        video.autoplay = true;
        video.style.width = "100%";
        video.classList.add("video");

        cardContentFilter.addEventListener("mouseover", () => {
          img.style.display = "none";
          extrainfo.style.display = "flex";
          gift.style.display = "flex";
          showOptions.style.display = "flex";
          videoContainer?.append(video);
          video.currentTime = 0;
          video.play();
        });
        cardContentFilter.addEventListener("mouseleave", () => {
          img.style.display = "flex";
          extrainfo.style.display = "none";
          gift.style.display = "none";
          showOptions.style.display = "none";
          video.remove();
        });
      }
    });
  });
}

getGamesData();
