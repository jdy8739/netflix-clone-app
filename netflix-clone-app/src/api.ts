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