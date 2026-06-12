export interface Movie {
  id: string;
  title: string;
  duration: number;
  budget: number;
  release_date: string;
}

export interface MovieDetails extends Movie {
  box_office: number;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}
