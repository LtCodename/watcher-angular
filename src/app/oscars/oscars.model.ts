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
    movies: []
}