import { GeneralResult } from "../model/GeneralResult";
import { Movie } from "../model/Movie";
import { MovieDetail } from "../model/MovieDetail";
import { TV } from "../model/TV";
import { TVDetail } from "../model/TVDetail";
import { loggedFetch } from "./apiHelper";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2UzM2QxNGEwNDJkNTRiMjRjZWZiNDdjM2E2NWZkOCIsIm5iZiI6MTc2NDIwMzIwMy40NDUsInN1YiI6IjY5Mjc5YWMzYWI1NWRhZjhkZDM3MTk0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gPZAgokhB0XbPs-7GvI_YJoBfhtw95F6aOitmsOdi-8";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export type MediaType = 'movie' | 'tv';

function makeApiUrl(path: string, queryParams: Record<string, string | number | boolean> = {}) {
    const url = new URL(BASE_URL + path);
    Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
    });
    return url.toString();
}

function getTrending<R>(mediaType: MediaType, timeWindow: 'day' | 'week' = 'week'): Promise<GeneralResult<R>> {
    return loggedFetch(makeApiUrl(`/trending/${mediaType}/${timeWindow}`), { ...options, method: 'GET' }).then(res => res.json());
}

function getNowPlayingMovies(params: { language?: string; page?: number; region?: string } = { language: 'ko-KR', page: 1, region: 'KR' }): Promise<GeneralResult<Movie>> {
    return loggedFetch(makeApiUrl('/movie/now_playing', params), { ...options, method: 'GET' }).then(res => res.json());
}

function getUpcomingMovies(params: { language?: string; page?: number; region?: string } = { language: 'ko-KR', page: 1, region: 'KR' }): Promise<GeneralResult<Movie>> {
    return loggedFetch(makeApiUrl('/movie/upcoming', params), { ...options, method: 'GET' }).then(res => res.json());
}

function getDetails<R>(mediaType: MediaType, id: number, params: { append_to_response?: string, language?: string } = { append_to_response: 'videos', language: 'ko-KR' }):Promise<R> {
    return loggedFetch(makeApiUrl(`/${mediaType}/${id}`, params), { ...options, method: 'GET' }).then(res => res.json());
}

function getSearch<R>(
    mediaType: MediaType,
    query: string,
    params: {
        language?: string;
        page?: number;
        include_adult?: boolean;
        region?: string
    } = { language: 'ko-KR', page: 1, include_adult: false, region: 'KR' }
): Promise<GeneralResult<R>> {
    return loggedFetch(
        makeApiUrl(`/search/${mediaType}`, { ...params, query }),
        { ...options, method: 'GET' }
    ).then(res => res.json());
}

export const movieApi = {
    getTrendingMovies: () => getTrending<Movie>('movie'),
    getNowPlayingMovies,
    getUpcomingMovies,
    search: (query: string) => getSearch<Movie>('movie', query),
    getMovieDetails: (id: number) => getDetails<MovieDetail>('movie', id),
};

function getAiringToday(params: { language?: string; page?: number; timezone?: string } = { language: 'ko-KR', page: 1, timezone: 'KR' }): Promise<GeneralResult<TV>> {
    return loggedFetch(makeApiUrl('/tv/airing_today', params), { ...options, method: 'GET' }).then(res => res.json());
}

function getTopRatedTVs(params: { language?: string; page?: number; } = { language: 'ko-KR', page: 1, }): Promise<GeneralResult<TV>> {
    return loggedFetch(makeApiUrl('/tv/popular', params), { ...options, method: 'GET' }).then(res => res.json());
}

export const tvApi = {
    getTrendingTVs: () => getTrending<TV>('tv'),
    getAiringToday,
    getTopRatedTVs,
    search: (query: string) => getSearch<TV>('tv', query),
    getTVDetails: (id: number) => getDetails<TVDetail>('tv', id)
};
