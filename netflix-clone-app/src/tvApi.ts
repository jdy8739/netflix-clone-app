const BASE_URL = 'https://api.themoviedb.org/3/tv';
const KEY = '9c36f611665ed3d1958c18199f8785ea';

export interface ITvPopularResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
};

export interface ITvPopular {
    page: number;
    results: ITvPopularResult[];
    total_results: number;
    total_pages: number;
};

export async function fetchTvPopular() {
    const tvPopular = await fetch(`${BASE_URL}/popular?api_key=${KEY}&language=en-US&page=1`);
    const jsoned = await tvPopular.json();
    return jsoned;
};

export async function fetchAiringToday() {
    const tvPopular = await fetch(`${BASE_URL}/airing_today?api_key=${KEY}&language=en-US&page=1`);
    const jsoned = await tvPopular.json();
    return jsoned;
};

export async function fetchTvLatest() {
    const tvPopular = await fetch(`${BASE_URL}/top_rated?api_key=${KEY}&language=en-US&page=1`);
    const jsoned = await tvPopular.json();
    return jsoned;
};