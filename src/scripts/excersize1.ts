import { getMovie, getCountry } from "./apiCalls";
// prettier-ignore
const injectHtml = (title:string, img:string, actors:string, year:number) :void => {
    // prettier-ignore
  const whereToInject :HTMLDivElement = <HTMLDivElement> document.querySelector(`.movieContainer`);
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
// prettier-ignore
const part2Injector = (country: string, currency: string, flag: string) :void=> {
  // prettier-ignore
  const whereToInject :HTMLDivElement = <HTMLDivElement> document.querySelector(`.country`);
  const html = `
      <div class="country__specs">
      <p class="movie__paragraph movie__paragraph--country">${country}</p>
      <p class="movie__paragraph movie__paragraph--countryAnd">${currency}</p>
      <img src="${flag}" alt="" class="movie__flag" />
      </div>`;
  whereToInject.insertAdjacentHTML(`beforeend`, html);
};

export async function getData(): Promise<void> {
  // prettier-ignore
  const searchInput :HTMLInputElement = <HTMLInputElement>document.getElementById(`searchInput`);
  const movie = await getMovie(searchInput.value);
  const actorNames = movie.actors
    .map((x) => x.split(" ").slice(0, 1))
    .join(", ");

  injectHtml(movie.title, movie.poster, actorNames, movie.year);

  movie.country.forEach(async (country: string) => {
    const countryObj = await getCountry(country);
    part2Injector(country, countryObj.currency, countryObj.flag);
  });
}
