import { getMovie, getCountry, MovieInt } from "./apiCalls";
// prettier-ignore
const injectHtml = (title:string, img:string, actors:string, year:number) => {
    // prettier-ignore
  const whereToInject :HTMLInputElement = <HTMLInputElement> document.querySelector(`.movieContainer`);
  const html = `  
    <div class="movie">
      
      <img src="${img}" alt="" class="movie__img" />
      <h2 class="movie__title">${title}</h2>
      <p class="movie__paragraph movie__paragraph--actors">Actors : ${actors}</p>
      <p class="movie__paragraph movie__paragraph--year">Release year :${year}</p>
     <div class="country">
     <p class="movie__paragraph movie__paragraph--countryTitle">Country : </p>
      </div>
    </div>`;
  whereToInject.innerHTML = ``;
  whereToInject.insertAdjacentHTML(`beforeend`, html);
};

const part2Injector = (country: string, currency: string, flag: string) => {
  // prettier-ignore
  const whereToInject :HTMLInputElement = <HTMLInputElement> document.querySelector(`.country`);
  const html = `
      <div class="country__specs">
      <p class="movie__paragraph movie__paragraph--country">${country}</p>
      <p class="movie__paragraph movie__paragraph--countryAnd">${currency}</p>
      <img src="${flag}" alt="" class="movie__flag" />
      </div>`;
  whereToInject.insertAdjacentHTML(`beforeend`, html);
};

export async function getData() {
  // prettier-ignore
  const searchInput :HTMLInputElement = <HTMLInputElement>document.getElementById(`searchInput`);
  const movie: MovieInt = await getMovie(searchInput.value);
  
  const actors = movie.Actors.split(", ")
    .map((x: string) => x.split(" ").slice(0, 1))
    .join(", ");
  const countriesArr = movie.Country.split(", ");

  injectHtml(movie.Title, movie.Poster, actors, Number(movie.Year));

  for (let country of countriesArr) {
    console.log(123);
    const countryObj = await getCountry(country);
    const currency = Object.keys(countryObj[0].currencies)[0];
    const flags = countryObj[0].flags.png;
    part2Injector(country, currency, flags);
  }
}
