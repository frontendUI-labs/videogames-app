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
  if (!pathname.includes("/games")) return;
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
  if (!pathname.includes("/games")) return;
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
