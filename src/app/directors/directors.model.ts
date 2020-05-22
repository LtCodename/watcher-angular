export interface IDirector {
    id: string;
    name: string;
    movies: IMovie[]
}

export interface IMovie {
    bookmarked: boolean;
    director: string;
    id: string;
    name: string;
    watched: boolean
    year: number;
}

export interface IMovieApiData {
    year?: string;
    awards?: string;
    director?: string;
    metascore?: string;
    imdbRating?: string;
}
