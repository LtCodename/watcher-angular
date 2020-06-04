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
    oldYear: any;
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