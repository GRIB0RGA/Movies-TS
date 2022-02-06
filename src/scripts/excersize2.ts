import { getMovie, getCountry } from "./apiCalls";

export async function getDataForPart2(): Promise<void> {
  // prettier-ignore
  const minutesHtml: HTMLParagraphElement = <HTMLParagraphElement>(document.querySelector(`.resultsArea--minutes`));
  // prettier-ignore
  const populationHtml: HTMLParagraphElement = <HTMLParagraphElement>(document.querySelector(`.resultsArea--population`));
  // prettier-ignore
  const input1: HTMLInputElement = <HTMLInputElement>(document.querySelector(`.excersize2__input--1`));
  // prettier-ignore
  const input2: HTMLInputElement = <HTMLInputElement>(document.querySelector(`.excersize2__input--2`));
  // prettier-ignore
  const input3: HTMLInputElement = <HTMLInputElement>(document.querySelector(`.excersize2__input--3`));

  const moviesArr = [
    getMovie(input1.value),
    getMovie(input2.value),
    getMovie(input3.value),
  ];

  const getRuntimeAndMovieCountries = await Promise.all(moviesArr).then((x) => {
    return x.map((movie) => ({
      runtime: movie.runtime,
      movieCountry: movie.country,
    }));
  });
  // prettier-ignore
  const uniqueCountryArr = [...new Set(getRuntimeAndMovieCountries.map((x) => x.movieCountry).flat())];

  //: number[] უბრალოდ ჩემთვის კარგად რო იკითხებოდეს მაგითომ მივამატე
  const getPopulations: number[] = await Promise.all(
    uniqueCountryArr.map((country) => getCountry(country))
  ).then((countryObjArr) =>
    countryObjArr.map((countryObj) => countryObj.population)
  );

  const sumOfPopulation = getPopulations.reduce((a, b) => a + b);

  const sumOfRuntimes = getRuntimeAndMovieCountries
    .map((x) => x.runtime)
    .reduce((a, b) => a + b);

  minutesHtml.innerHTML = `Length: ${sumOfRuntimes} min`;
  populationHtml.innerHTML = `Population: ${sumOfPopulation}`;
}
