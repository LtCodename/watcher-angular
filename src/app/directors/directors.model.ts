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
