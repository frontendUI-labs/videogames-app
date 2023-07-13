const API_KEY = "2b650dbbb0f64479b2f2bf63a1d29c13";
export type ParentPlatforms = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}[];

export type GenreGameType = [
  results: {
    slug: string;
    name: string;
    playtime: number;
    platforms: {
      id: number;
      name: string;
      slug: string;
    }[];
    stores: {
      store: {
        id: number;
        name: string;
        slug: string;
      };
    }[];
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: {
      id: number;
      name: string;
      count: number;
      percent: number;
    }[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: {
      yet: number;
      owned: number;
      beaten: number;
      toplay: number;
      dropped: number;
      playing: number;
    };
    metacritic: number;
    suggestions_count: number;
    updated: string;
    id: number;
    score: null;
    clip: null;
    tags: {
      id: number;
      name: string;
      slug: string;
      language: string;
      games_count: number;
      image_background: string;
    }[];
    esrb_rating: {
      id: number;
      name: string;
      slug: string;
      name_en: string;
      name_ru: string;
    };
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    short_screenshots: {
      id: number;
      image: string;
    }[];
    parent_platforms: ParentPlatforms;
    genres: {
      id: number;
      name: string;
      slug: string;
    }[];
  }
];

type RatingGames = {
  id: number;
  title: "exceptional" | "recommended" | "meh" | "skip";
  count: number;
  percent: number;
};
type PlatformsGames = {
  platform: {
    id: number;
    name: string;
    slug: string;
    image: any; //TODO:
    year_end: null | number;
    year_start: null | number;
    games_count: number;
    image_background: string;
  };
  released_at: string;
  requirements_en: null | { minimum: string; recomended: string };
  requirements_ru: null | { minimum: string; recomended: string };
}[];

type GnresGamesandContributorsOfGames = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}[];

type StoresGames = {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}[];
type TagsGames = {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}[];
export type Game = {
  id: number;
  score: string;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: "exceptional" | "recommended" | "meh" | "skip";
    count: number;
    percent: number;
  }[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: any; //TODO:
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
      image: any; //TODO:
      year_end: null | number;
      year_start: null | number;
      games_count: number;
      image_background: string;
    };
    released_at: string;
    requirements_en: null | { minimum: string; recomended: string };
    requirements_ru: null | { minimum: string; recomended: string };
  }[];
  parent_platforms: ParentPlatforms;
  genres: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      games_count: number;
      image_background: string;
    };
  }[];
  clip: null;
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  short_screenshots: {
    id: number;
    image: string;
  }[];
};

export type GetAllGamesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};
export type descriptionGameGenreType = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description: string;
};

export async function getAllGames(): Promise<GetAllGamesResponse | undefined> {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    const data: GetAllGamesResponse = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

export async function getAllGamesGenres(): Promise<
  GetAllGamesResponse | undefined
> {
  const { pathname } = window.location;
  if (!pathname.includes("/genres")) return;
  const path = pathname.split("/");
  const gameGenre = path[2];
  if (!gameGenre) return;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&genres=${gameGenre}`
    );
    const data: GetAllGamesResponse = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

export async function getGamesDataBySearch(
  value: string
): Promise<GetAllGamesResponse | undefined> {
  if (value === "") return;
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=2b650dbbb0f64479b2f2bf63a1d29c13&search=${value}`
    );
    const data: GetAllGamesResponse = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

export async function getFiltersDescription(): Promise<
  descriptionGameGenreType | undefined
> {
  const { pathname } = window.location;
  if (!pathname.includes("/genres")) return;
  const path = pathname.split("/");
  const [_, __, gameDescriptionGenre] = path;
  if (!gameDescriptionGenre) return;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/genres/${gameDescriptionGenre}?key=${API_KEY}`
    );
    const data: descriptionGameGenreType = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

//detailPage//
export type GameDetails = {
  [x: string]: any;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: {
    metascore: number;
    url: string;
    platform: {
      platform: number;
      name: string;
      slug: string;
    };
  }[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: RatingGames[];
  reviews_count: number;
  playtime: number;
  parent_platforms: ParentPlatforms;
  platforms: PlatformsGames;
  stores: StoresGames;
  developers: GnresGamesandContributorsOfGames;
  genres: GnresGamesandContributorsOfGames;
  tags: TagsGames;
  publishers: GnresGamesandContributorsOfGames;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
};

export async function getDetailsbyGameSlug(): Promise<GameDetails | undefined> {
  const { pathname } = window.location;
  const path = pathname.split("/");
  const gameSlug = path[2];
  if (!pathname.includes(`/games/${gameSlug}`)) return;
  if (!gameSlug) return;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameSlug}?key=${API_KEY}`
    );
    const data: GameDetails = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}
export type DetailsOfCreators = {
  count: number;
  results: {
    id: number;
    name: string;
    slug: string;
    image: string;
    image_background: string;
    games_count: number;
    positions: {
      id: number;
      name: string;
      slug: string;
    }[];
  }[];
};

export async function getDetailsCreatorsbyGameSlug(): Promise<
  DetailsOfCreators | undefined
> {
  const { pathname } = window.location;
  const path = pathname.split("/");
  const gameSlug = path[2];
  if (!pathname.includes(`/games/${gameSlug}`)) return;
  if (!gameSlug) return;
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameSlug}/development-team?key=${API_KEY}`
    );
    const data: DetailsOfCreators = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

export type AchievementsOfGames = {
  count: number;
  results: {
    id: number;
    name: string;
    description: string;
    image: string;
    percent: number;
  }[];
};
export async function getFirstAchievementsOfGames(): Promise<
  AchievementsOfGames | undefined
> {
  const { pathname } = window.location;
  const path = pathname.split("/");
  const gameSlug = path[2];
  if (!pathname.includes(`/games/${gameSlug}`)) return;
  if (!gameSlug) return;
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameSlug}/achievements?key=${API_KEY}&page=1`
    );
    const data: AchievementsOfGames = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

export type PostOfGames = {
  [x: string]: any;
  count: number;
  results: {
    id: number;
    name: string;
    description: string;
    image: string;
    percent: number;
    url: string;
    username: string;
    username_url: string;
    created: string;
  }[];
};
export async function getFirstPostOfGames(): Promise<PostOfGames | undefined> {
  const { pathname } = window.location;
  const path = pathname.split("/");
  const gameSlug = path[2];
  if (!pathname.includes(`/games/${gameSlug}`)) return;
  if (!gameSlug) return;
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameSlug}/reddit?key=${API_KEY}&page=1`
    );
    const data: PostOfGames = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}

export type imgOfEachGame = {
  results: {
    id: number;
    image: string;
  }[];
};

export async function imagesAllGames(): Promise<imgOfEachGame | undefined> {
  const { pathname } = window.location;
  const path = pathname.split("/");
  const gameSlug = path[2];
  if (!pathname.includes(`/games/${gameSlug}`)) return;
  if (!gameSlug) return;
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameSlug}/screenshots?key=${API_KEY}`
    );
    const data: imgOfEachGame = await response.json();
    return data;
  } catch (err) {
    console.log("Hubo un error en el fetch");
  }
}
