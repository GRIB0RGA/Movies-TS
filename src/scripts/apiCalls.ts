export interface MovieInt {
  Actors: string;
  Title: string;
  Poster: string;
  Year: string;
  Country: string;
}

export const getMovie = (title: string) =>
  fetch(`http://www.omdbapi.com/?t=${title}&&apikey=6d659266`).then((obj) =>
    obj.json()
  );



export const getCountry = (country: string) =>
  fetch(`https://restcountries.com/v3.1/name/${country}`).then((obj) =>
    obj.json()
  );
