async function getVideoGames(): Promise<any> {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=2b650dbbb0f64479b2f2bf63a1d29c13"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

async function getGames(): Promise<void> {
  const videoGame = await getVideoGames();
  const dataGames = videoGame.results;
  getEachGameDetail(dataGames);
}

function createDOM(string: string): Node | null {
  const parser = new DOMParser();
  const HTML = parser.parseFromString(string, "text/html");
  return HTML.body.firstChild;
}

let images: string[] = [];

async function getEachGameDetail(dataGames: any[]): Promise<void> {
  dataGames.forEach((game) => {
    const card = document.querySelector(
      "#card__content__wrapper"
    ) as HTMLElement;

    images.unshift(game.background_image);

    const cardContent = createDOM(`<div class="card__wrapper"  id="gameCard">
        <div class="game__image">
          <img class="videoGamePicture" id="videoGamePicture" src="${images[0]}" alt="">
         
          <button class="play__background" id="iconPlay">
            <img class="play-icon" src="./icon/play-icon.svg" alt="" />
          </button>
        </div>
        <div class="card__content">
          <div class="card__header">
            <div class="games_console">
              <img src="./icon/windows.svg" alt="" />
              <img src="./icon/windows.svg" alt="" />
              <img src="./icon/windows.svg" alt="" />
            </div>
            <span class="game__buy">${game.metacritic}</span>
          </div>
          <div class="card__title">
            <h2 class="game__name">
              ${game.name}
            </h2>
            <img src="./icon/windows.svg" alt="" />
          </div>
          <div class="more__options__button">
            <button class="card__buttons">
              <img src="./icon/windows.svg" alt="" />
              <span class="game_number">${game.ratings_count}</span>
            </button>
            <button class="card__buttons">
              <img src="./icon/windows.svg" alt="" />
            </button>
            <button class="card__buttons">
              <img src="./icon/windows.svg" alt="" />
            </button>
          </div>
          <div class="show__more__details__card">
            <button class="button__details__card">View More</button>
          </div>
        </div>
      </div>`);
    if (!cardContent) {
      return;
    }

    card.append(cardContent);
  });
}

getGames();
