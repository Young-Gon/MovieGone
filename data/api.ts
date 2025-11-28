const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2UzM2QxNGEwNDJkNTRiMjRjZWZiNDdjM2E2NWZkOCIsIm5iZiI6MTc2NDIwMzIwMy40NDUsInN1YiI6IjY5Mjc5YWMzYWI1NWRhZjhkZDM3MTk0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gPZAgokhB0XbPs-7GvI_YJoBfhtw95F6aOitmsOdi-8";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

function getTrendingMovies(timeWindow: 'day' | 'week' = 'week') {
    return fetch(makeApiUrl(`/trending/movie/${timeWindow}`), { ...options, method: 'GET' }).then(res => res.json());
}

function getNowPlayingMovies(params: { language?: string; page?: number; region?: string } = { language: 'ko-KR', page: 1, region: 'KR' }) {
    return fetch(makeApiUrl('/movie/now_playing', params), { ...options, method: 'GET' }).then(res => res.json());
}

function getUpcomingMovies(params: { language?: string; page?: number; region?: string } = { language: 'ko-KR', page: 1, region: 'KR' }) {
    return fetch(makeApiUrl('/movie/upcoming', params), { ...options, method: 'GET' }).then(res => res.json());
}

function getMovieDetails(movieId: number, params: { language?: string } = { language: 'ko-KR' }) {
    return fetch(makeApiUrl(`/movie/${movieId}`, params), { ...options, method: 'GET' }).then(res => res.json());
}

async function fetchData(url: string, customOptions: any = options) {
    try {
        return await (await fetch(url, customOptions)).json()
    } catch (error) {
        console.error(error);
        return [];
    }
};

function makeApiUrl(path: string, queryParams: Record<string, string | number> = {}) {
    const url = new URL(BASE_URL + path);
    Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
    });
    return url.toString();
}

export const movieApi = { getTrendingMovies, getNowPlayingMovies, getUpcomingMovies, getMovieDetails, fetchData };
