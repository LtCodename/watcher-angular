/* Directors */

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
    watched: boolean;
    year: number;
    dataFromApi?: object;
}

/* Filming */

export interface IChangeYearWindow {
    changeDataCallback(year: number, name: string): void;
    oldYear: number;
    oldName: string;
}

export interface IFilmingMovie {
    director: string;
    id: string;
    name: string;
    year: number;
    directorData: object;
}

/* Oscars */

export interface IOscarMovie {
    watched: boolean;
    best: boolean;
    name: string;
    id: string;
    year: string;
}

export interface IOscarYear {
    name: string;
    id: string;
    movies: IOscarMovie[]
}

/* Theaters */

export interface ITheatersWindow {
    changeTheatersDataCallback(year: number, name: string, month: number): void;
    oldYear: number;
    oldName: string;
    oldMonth: number;
}

export interface ITheaterMovie {
    id: string;
    month: number;
    name: string;
    priority: boolean;
    releaseYear?: number;
    watched: boolean;
    year: number;
}

export interface ITheaterMonth {
    monthName: string;
    mocies: ITheaterMovie[]
}

export interface ITheaterYear {
    yearName: string;
    months: ITheaterMonth[]
}

/* General */

export interface ISearchResuls {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export interface IConfirmWindow {
    confirm(id?: string): void;
}

export interface imdbMovieRating {
    Source: string;
    Value: string;
}

export interface imdbMovie {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Production: string;
    Rated: string;
    Ratings: imdbMovieRating[];
    Released: string;
    Response: string;
    Runtime: "130 min"
    Title: string;
    Type: string;
    Website: string;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
}