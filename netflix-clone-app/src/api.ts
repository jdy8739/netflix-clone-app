const BASE_URL = 'https://api.themoviedb.org/3/movie';
const KEY = '9c36f611665ed3d1958c18199f8785ea';

export interface Dates {
    maximum: string;
    minimum: string;
};

export interface INowPlayingResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export interface INowPlaying {
    dates: Dates;
    page: number;
    results: INowPlayingResult[];
    total_pages: number;
    total_results: number;
};

export async function fetchNowPlaying() {
    const playingList = await fetch(`${BASE_URL}/now_playing?api_key=${KEY}&language=en-US&page=1`);
    const jsoned = await playingList.json();
    return jsoned;
};

export interface ITopRatedResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
};

export interface ITopRated {
    page: number;
    results: ITopRatedResult[];
    total_results: number;
    total_pages: number;
};

export async function fetchTopRated() {
    const latestList = await fetch(`${BASE_URL}/top_rated?api_key=${KEY}&language=en-US&page=1`);
    const jsoned = await latestList.json();
    return jsoned;
};

export interface IUpcomingResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
};

export interface Dates {
    maximum: string;
    minimum: string;
};

export interface IUpcoming {
    page: number;
    results: IUpcomingResult[];
    dates: Dates;
    total_pages: number;
    total_results: number;
};

export async function fetchUpcoming() {
    const upcomingList = await fetch(`${BASE_URL}/upcoming?api_key=${KEY}&language=en-US&page=1`);
    const jsoned = await upcomingList.json();
    return jsoned;
};
