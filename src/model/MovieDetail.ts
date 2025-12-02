import { Movie } from "./Movie";

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
    belongs_to_collection: object | null;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    imdb_id: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    revenue: number;
    runtime: number | null;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
}
