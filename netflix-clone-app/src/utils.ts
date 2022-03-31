
export function makeImagePath(id: string, format?: string) {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
};

export function classifyGenres(id: number) {
    switch (id) {
        case 28:
            return "Action";
            break;
        case 12:
            return "Adventure";
            break;
        case 16:
            return "Animation";
            break;
        case 35:
            return "Comedy";
            break;
        case 80:
            return "Crime";
            break;
        case 99:
            return "Documentary";
            break;
        case 18:
            return "Drama";
            break;
        case 10751:
            return "Family";
            break;
        case 14:
            return "Fantasy";
            break;
        case 36:
            return "History";
            break;
        case 27:
            return "Horror";
            break;
        case 10402:
            return "Music";
            break;
        case 9648:
            return "Mystery";
            break;
        case 10749:
            return "Romance";
            break;
        case 878:
            return "Science Fiction";
            break;
        case 10770:
            return "TV Movie";
            break;
        case 53:
            return "Thriller";
            break;
        case 10752:
            return "War";
            break;
        case 37:
            return "Western";
            break;
        default:
            return "";
    }  
};