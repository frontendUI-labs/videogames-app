import format from "date-fns/format";
import { createDOM } from "../utilities/stringToDOM";
import {
  GameDetails,
  DetailsOfCreators,
  AchievementsOfGames,
  PostOfGames,
  imgOfEachGame,
} from "../api/games";
import {
  getDetailsbyGameSlug,
  getDetailsCreatorsbyGameSlug,
  getFirstAchievementsOfGames,
  getFirstPostOfGames,
  imagesAllGames,
} from "../api/games";

async function getDetails(): Promise<void> {
  const detailGames = await getDetailsbyGameSlug();
  const creatorsGames = await getDetailsCreatorsbyGameSlug();
  const achievementsGames = await getFirstAchievementsOfGames();
  const postGames = await getFirstPostOfGames();
  const imagesGames = await imagesAllGames();
  if (
    !detailGames ||
    !creatorsGames ||
    !achievementsGames ||
    !postGames ||
    !imagesGames
  )
    return;
  getEachGameDetail(
    detailGames,
    creatorsGames,
    achievementsGames,
    postGames,
    imagesGames
  );
}

async function getEachGameDetail(
  detailGames: GameDetails,
  creatorsGames: DetailsOfCreators,
  achievementsGames: AchievementsOfGames,
  postGames: PostOfGames,
  imagesGames: imgOfEachGame
): Promise<void> {
  let platformSlugIconMap: { [key: string]: string } = {
    linux: "../icon/linux.svg",
    pc: "../icon/pc-icon.svg",
    ios: "../icon/ios-icon.svg",
    mac: "../icon/apple.svg",
    android: "../icon/android-icon.svg",
    xbox: "../icon/xbox-icon.svg",
    playstation: "../icon/ps4-icon.svg",
    nintendo: "../icon/nintendo-icon.svg",
  };
  const getGamesPlatformsIcons = detailGames.parent_platforms
    .map((platforms) => {
      const platformSlug = platforms.platform.slug;
      return `<img src="${
        platformSlugIconMap[platformSlug] ?? "../icon/plus-icon.svg"
      }" alt="" />`;
    })
    .join("");

  // const requirementsText =
  //   detailGames.platforms[3].requirements.minimum +
  //   detailGames.platforms[3].requirements.recommended;

  const detailsPlatforms = detailGames.platforms
    .map((platform) => platform.platform.name)
    .join(", ");

  const tagsOfEachGames = detailGames.tags.map((tag) => tag.name).join(", ");

  const gnresDetailsAllGames = detailGames.genres
    .map((genre) => genre.name)
    .join(", ");

  const developersContent = detailGames.developers
    .map((developer) => developer.name)
    .join(", ");

  const publishersOfEachGames = detailGames.publishers
    .map((publisher) => publisher.name)
    .join(", ");

  let getIconAndStoreMap: { [key: string]: string[] } = {
    "playstation-store": ["../icon/ps4-icon.svg", "PlayStation Store"],
    "epic-games": ["../icon/epicgame-icon.svg", "Epic Games"],
    steam: ["../icon/steam-icon.svg", "Steam"],
    xbox360: ["../icon/xbox-icon.svg", "Xbox360 Store"],
    "xbox-store": ["../icon/xbox-icon.svg", "Xbox Store"],
    nintendo: ["../icon/nintendo-icon.svg", "Nintendo Store"],
    default: ["../icon/nintendo-icon.svg", "Nintendo Store"],
    gog: ["../icon/gogstore-icon.svg", "GOG"],
  };
  const getStoresOfEachGame = detailGames.stores
    .map((store) => {
      const slug = store.store.slug;
      const [icon, name] =
        getIconAndStoreMap[slug] ?? getIconAndStoreMap.default;
      return `<button class="store__buttons">
      ${name}
      <img class="store__icon__button" src="${icon}" alt="">
      </button>`;
    })
    .join("");

  const infoOfEachCreators = creatorsGames.results
    .slice(0, 5)
    .map((result) => {
      const gamesCountForCreator = result.games_count;
      const slug = result.slug;
      const name = result.name;
      const image = result.image;
      const background = result.image_background;
      const creatorPosition =
        result.positions.length == 1
          ? `<p>${result.positions[0].name}</p>`
          : "";
      return `<div
        class="creators__cards"
        style="
          background-image: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.341),
              rgba(30, 29, 29, 0.858)
            ),
            url(${background});
        "
      >
        <div class="creators__cards__profile">
          <img
            class="creators__imgProfile"
            src="${image ?? "../icon/creators-icon.svg"}"
            alt=""
          />
          <a href="/creators/${slug}">${name}</a>
          ${creatorPosition}
        </div>
        <div>
          <div class="creators__cards__title">
            <span>Know for </span
            ><span>${gamesCountForCreator}</span>
          </div>
          <div>
            <div class="creators__cards__title">
              <p class="creators__cards__description">Grand Theft Auto IV</p>
              <p>11,690</p>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join("");

  const getAchievementsOfEachGame =
    achievementsGames.results.length > 0
      ? achievementsGames.results
          .slice(0, 5)
          .map((result) => {
            // const id = result.id;
            const name = result.name;
            const description = result.description;
            const image = result.image;
            const percent = result.percent;
            return `<div class="achievements__cards">
          <img
            class="achievements__cards__imgs"
            src="${image}"
            alt=""
          />
          <div class="achievements__cards__details">
            <span class="achievements__cards__percent">${percent}%</span>
            <p class="achievements__cards__title">${name}</p>
            <p class="achievements__cards__description">
              ${description}
            </p>
          </div>
        </div>`;
          })
          .join("")
      : "";

  const getPostOfEachGame = postGames.results
    .slice(0, 6)
    .map((result) => {
      const image = result.image;
      const name = result.name;
      const created = format(new Date(result.created), "LLL dd, yyyy");
      const username = result.username.substring(3);
      return ` <div class="details__posts__cards" role="button">
                <div class="posts__cards__decription">
                  <p class="posts__cards__title">${name}</p>
                  <p class="post__cards__author"><span> ${created}</span> • <span>${username}</span></p>
                </div>
                <div class="post__cards__img"><img src="${image}" alt=""></div>
            </div>`;
    })
    .join("");

  const ratingPercentGames = detailGames.ratings
    .map((rating) => {
      const title = rating.title;
      const percent = rating.percent;
      return `<div class="distribution__bar ${title} greenBox" role="button" style="width:${percent}%";>  
              </div>`;
    })
    .join("");

  const ratingsCountGames = detailGames.ratings
    .map((rating) => {
      const title = rating.title;
      const count = rating.count;
      return `<div class="legend__content greenCircle" role="button">
                <div class="legend__icon ${title}"></div>
                ${rating.title} <span class="text__opacity">${count}</span>
              </div>`;
    })
    .join("");

  const container = document.querySelector("#details") as HTMLElement;
  const formatDateGame = format(new Date(detailGames.released), "LLL dd, yyyy");
  const newDateEl = format(new Date(detailGames.updated), "LLL dd, yyyy");
  const imgGames = imagesGames.results;

  const allDesciptionOfGames = detailGames.description.split("<br />");
  const firstDescriptionDetails = allDesciptionOfGames.slice(0, 3).join("");
  const restDescriptionDetails = allDesciptionOfGames.slice(3).join("");

  const detailsContent = createDOM(
    `<div class="detailsGame__wraper" id="detailsGame__wraper" style="
        background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.341),
        rgba(30, 29, 29, 0.858)
        ),url(${detailGames.background_image})">
      <div class="details__containerOne">
        <div class="details__firstPart">
          <div class="navbar__detailsGame">
            <a href="/">HOME</a> / <a href="/games">GAMES</a>
            /
            <span> ${detailGames.name.toUpperCase()}</span>
          </div>
          <div class="date__detailsGame__wraper">
            <span class="date__detailsGame">${formatDateGame.toUpperCase()}</span>
            <div class="details__paltformsIcons" >${getGamesPlatformsIcons}</div>
            <span class="details_playtime">AVERAGE PLAYTIME: ${
              detailGames.playtime
            } HOURS</span>
          </div>
          <h1 class="title__detailsGame">
            ${detailGames.name_original}
          </h1>
        </div>
        <div class="details__putVideos">
          <div class="putVideos__container">
            <video
              autoplay
              muted
              loop
              class="putVideos__img"
              src="https://media.rawg.io/media/stories/5e4/5e4d63b3fccc2567946ab1228da01ce2.mp4"
            ></video>
            <div class="putVideos__imgs">
              <img
                class="putVideos__img"
                src="${imgGames[0].image}"
                alt=""
              />
              <img
                class="putVideos__img"
                src="${imgGames[1].image}"
                alt=""
              />
              <img
                class="putVideos__img"
                src="${imgGames[2].image}"
                alt=""
              />
              <a
                class="putVideos__img img__seeMore"
                href="/games/the-legend-of-zelda-breath-of-the-wild-sequel/screenshots"
                ><div
                  class="putVideos__img img__hiden"
                  style="
                    background-image: url('https://media.rawg.io/media/resize/640/-/screenshots/c0d/c0dafd15ec182acab8f5879665eaa642.jpg');
                  "
                ></div>
                <span class="img__text__opacity">
                  <span class="text__bold"> ...</span> <br />
                  view all</span
                ></a
              >
            </div>
          </div>
        </div>
        <div class="details__secondPart">
          <div class="secondPart__buttons">
            <button class="details__bttonaddGame">
              <span class="text__opacity btton__textOne">Add to</span>
              <span class="btton__texTwo"
                >My games
                <span class="text__opacity btton__textNumber"> 362</span></span
              >
              <img
                class="btton__addImg"
                src="./images/addbutton__img.svg"
                alt=""
              />
            </button>
            <button class="details__bttonaddGame btton--gift">
              <span class="text__opacity btton__textOne">Add to</span>
              <span class="btton__texTwo"
                >Wishlist
                <span class="text__opacity btton__textNumber"> ${
                  detailGames.added_by_status.toplay
                }</span></span
              >
              <img
                class="btton__addImg addImg--gift"
                src="./icon/gift-icon.svg"
                alt=""
              />
            </button>
            <a class="details__saveCollection" href="">
              <p>
                <span class="text__opacity opacity__save">Save to</span
                >Collection
              </p>
              <img src="./icon/collection-icon.svg" alt=""
            /></a>
          </div>
          <div class="btton__editGame1">
            <a class="details__btton__editGame" href="">
              <img src="./icon/edit-icon.svg" alt="" />
              Edit the game info
            </a>
            <p class="details__textLastModified">Last Modified: ${newDateEl}</p>
          </div>
          <div class="details_ratingChart">
            <div class="ratingChart__title">
              <div class="rating__img">
                <h2>Exceptional</h2>
                <img src="./images/rating-img.png" alt="" />
              </div>
              <span
                role="button"
                class="ratingChart__statics ratingChart__underlineText"
              >
                ${detailGames.reviews_count} RATINGS
              </span>
            </div>
            <div class="ratingChart__statics">
              <div class="ratingChart__statics__top">
                <p class="statics__p">
                  <span class="statics_p_span"> # 1163</span>
                  <span class="ratingChart__underlineText">${detailGames.genres[0].slug.toUpperCase()}</span>
                </p>
                <p class="statics__p">
                  <span class="statics_p_span"> # 9</span>
                  <span class="ratingChart__underlineText">TOP 2023</span>
                </p>
              </div>
            </div>
          </div>
          <div class="ratingChart__distribution">
            <p class="text__opacity opacity__rate">Click to rate</p>
            <div class="distribution__barContainer">
             ${ratingPercentGames}
            </div>
            <div class="distribution__legend">
              ${ratingsCountGames}
            </div>
          </div>
        </div>
        <div class="btton__editGame2">
          <a class="details__btton__editGame" href="">
            <img src="./icon/edit-icon.svg" alt="" />
            Edit the game info
          </a>
          <p class="details__textLastModified">Last Modified: ${newDateEl}</p>
        </div>
        <div class="bttons__writers__wraper">
          <div class="bttons__writers">Write a review ${
            detailGames.reviews_count
          }</div>   
          <div class="bttons__writers" >Write a comment</div>
        </div>
        <div></div>
        <div class="details__description">
          <div class="details__description__container">
           <h3>About</h3>
           <div class="description__paragraf">${firstDescriptionDetails}<span class="description__pointsSus">...</span></div>
           <div class="description__paragraf__second">${restDescriptionDetails}</div>
           <button class="readMore-btn">Read More</button>
          </div>
          <div class="details__description__rest">
            <div class="description__rest__cards">
            Platforms
              <p class="description__rest__p">
              ${detailsPlatforms}
              </p>
            </div>
            <div class="description__rest__cards">
              Metascore
              <p>92</p>
            </div>
            <div class="description__rest__cards">
              Genre
              <p class="description__rest__p">${gnresDetailsAllGames}</p>
            </div>
            <div class="description__rest__cards">
              Release date
              <p class="description__rest__p">${formatDateGame}</p>
            </div>
            <div class="description__rest__cards">
              Developer
              <p class="description__rest__p">${developersContent}</p>
            </div>
            <div class="description__rest__cards">
              Publisher
              <p class="description__rest__p">${publishersOfEachGames}</p>
            </div>
            ${
              detailGames.esrb_rating
                ? `<div class="description__rest__cards">
              Age rating
              <p class="description__rest__p">17+ ${detailGames.esrb_rating.name}</p>
            </div>`
                : "Not rated"
            }
            <div>
              Other games in the series
              <p class="description__rest__p">
              Grand Theft Auto: Chinatown Wars, Grand Theft Auto IV, Grand Theft
              Auto: Vice City Stories, Grand Theft Auto: Liberty City Stories,
              Grand Theft Auto: San Andreas, Grand Theft Auto Advance, Grand Theft
              Auto: Vice City, Grand Theft Auto III, Grand Theft Auto 2, Grand
              Theft Auto
              </p>
            </div>
            <div>
              DLC's and editions
              <p class="description__rest__p">
              Grand Theft Auto V & Grand Theft Auto: San Andreas, Grand Theft Auto
              V & Great White Shark Cash Card, Grand Theft Auto Online
              </p>
            </div>
            <div>
              Tags
              <p class="description__rest__p">
              ${tagsOfEachGames}
              </p>
            </div>
            <div>
              Website
              <p class="description__rest__p">${detailGames.website}</p>
            </div>
          </div>
        </div>
        <div class="details__requirements"><p class="details__requirements__title">System requirements for "PC"</p>
        <div class="details__requirements__description"">{requirementsText}</div>
        <button class="readMore-btn-modified">Read More ...</button>
        </div>     
        <div class="details__store">  
          <p>Where to buy</p>
          <div class="store_buttons_container">
              <div class="store__buttons__wraper">${getStoresOfEachGame}</div>
              <div class="store__buttons__wraper2">${getStoresOfEachGame}</div>
          </div>
        </div>
      </div>
      <div class="details__containerTwo" style="
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.842),
        rgba(1, 1, 1, 0.858)
        ),url(${detailGames.background_image_additional})">
        <div class="details__creators">
          <div class="creators__cards__title">
            <h3 class="details__secondConatiner__titles">${
              detailGames.name
            } Know for</h3>
            <span class="second__containers__count">${
              creatorsGames.count
            } creators</span>
          </div>
          <div class="creators__container">
            <div class="creators__container__wraper">
              ${infoOfEachCreators}
            <div class="creators__cards creators__cards__more">
              <button class="creators__button__more">More</button>
            </div>
          </div>
        </div>
        <div class="details__achievements">
            <div class="creators__cards__title">
              <h3 class="details__secondConatiner__titles">${
                detailGames.name
              } </br>achievements</h3>
              <span class="second__containers__count">${
                achievementsGames.count
              } achievements</span>
            </div>
            <div class="achievements__container">
              ${getAchievementsOfEachGame}
              <div class="achievements__cards cards_moreAchiev">
                <div class="achievements__cards_more"><svg
        class="threepoints"
                width="20"
        height="4"
        viewBox="0 0 20 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3601 4C18.4647 4 19.3601 3.10457 19.3601 2C19.3601 0.89543 18.4647 0 17.3601 0C16.2555 0 15.3601 0.89543 15.3601 2C15.3601 3.10457 16.2555 4 17.3601 4Z"
          fill="gray"
        />
        <path
          d="M9.67993 4C10.7845 4 11.6799 3.10457 11.6799 2C11.6799 0.89543 10.7845 0 9.67993 0C8.57536 0 7.67993 0.89543 7.67993 2C7.67993 3.10457 8.57536 4 9.67993 4Z"
          fill="gray"
        />
        <path
          d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
          fill="gray"
        />
      </svg></div>
                <div class="achievements__cards__details">
                  <p class="achievements__cards__title">view all achievements</p>
                  <p class="achievements__cards__description">${
                    achievementsGames.count
                  } items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="details__posts">
          <div class="creators__cards__title">
            <div>
              <h3 class="details__secondConatiner__titles">${
                detailGames.name
              }</br>post</h3>
              <img src="" alt="" />
            </div>
            <span class="second__containers__count">${
              postGames.count
            } postss</span>
          </div>
          <div class="details__posts__container">
            ${getPostOfEachGame}
            <button class="details__posts__button__more">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>`
  );
  // if (!detailsContent) {
  //   return;
  // }

  container.append(detailsContent);

  const textHidden = document.querySelector(
    ".description__paragraf__second"
  ) as HTMLDivElement;
  const readMoreBtnEl = document.querySelector(
    ".readMore-btn"
  ) as HTMLButtonElement;
  const textPointsEl = document.querySelector(
    ".description__pointsSus"
  ) as HTMLElement;

  readMoreBtnEl.addEventListener("click", function () {
    textHidden.classList.toggle("block");
    textPointsEl.classList.toggle("none");
    if (!textHidden.classList.contains("block")) {
      readMoreBtnEl.textContent = "Read More";
    } else {
      readMoreBtnEl.textContent = "Read Less";
    }
  });

  //barra de likes//
  const barContainerEl = document.querySelectorAll<HTMLElement>(
    ".distribution__barContainer .distribution__bar"
  );
  const legendContainerEl = document.querySelectorAll<HTMLElement>(
    ".distribution__legend .legend__content"
  );
  for (let i = 0; i < barContainerEl.length; i++) {
    barContainerEl[i].addEventListener("mouseenter", function () {
      let index = Array.from(barContainerEl).indexOf(this);
      legendContainerEl[index].classList.add("border");
    });
    barContainerEl[i].addEventListener("mouseleave", function () {
      let index = Array.from(barContainerEl).indexOf(this);
      legendContainerEl[index].classList.remove("border");
    });
  }
  for (let i = 0; i < legendContainerEl.length; i++) {
    legendContainerEl[i].addEventListener("mouseenter", function () {
      let index = Array.from(legendContainerEl).indexOf(this);
      barContainerEl[index].classList.add("shadow");
    });
    legendContainerEl[i].addEventListener("mouseleave", function () {
      let index = Array.from(legendContainerEl).indexOf(this);
      barContainerEl[index].classList.remove("shadow");
    });
  }
}
// }

getDetails();
