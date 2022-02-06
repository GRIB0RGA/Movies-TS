interface MovieInt {
  actors: string[];
  title: string;
  poster: string;
  year: number;
  country: string[];
  runtime: number;
}

interface CountryInt {
  currency: string;
  flag: string;
  population: number;
}

export const getMovie = async (title: string): Promise<MovieInt> => {
  // prettier-ignore
  const fetchMovie  = await fetch(`http://www.omdbapi.com/?t=${title}&&apikey=6d659266`);
  const movieObj = await fetchMovie.json();
  return {
    actors: movieObj.Actors.split(", "),
    title: movieObj.Title,
    poster: movieObj.Poster,
    year: Number(movieObj.Year),
    country: movieObj.Country.split(", "),
    runtime: parseInt(movieObj.Runtime),
  };
};

export const getCountry = async (country: string): Promise<CountryInt> => {
  // prettier-ignore
  const fetchCountry = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  let countryObj = await fetchCountry.json();
  countryObj = countryObj[0];

  return {
    currency: Object.keys(countryObj.currencies)[0],
    flag: countryObj.flags.png,
    population: countryObj.population,
  };
};
