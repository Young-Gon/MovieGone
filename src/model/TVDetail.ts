import { Genre, ProductionCompany, ProductionCountry, SpokenLanguage, Video } from "./MovieDetail";
import { TV } from "./TV";

interface Creator {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
}

interface Episode {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string | null;
    episode_number: number;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
}

interface Network {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface Season {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}

export interface TVDetail extends Omit<TV, 'genre_ids'> {
    created_by: Creator[];
    episode_run_time: number[];
    genres: Genre[];
    homepage: string | null;
    in_production: boolean;
    languages: string[];
    last_air_date: string | null;
    last_episode_to_air: Episode | null;
    next_episode_to_air: Episode | null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    type: string;
    videos: {
        results: Video[];
    };
}
