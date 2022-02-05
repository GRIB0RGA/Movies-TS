import { getData } from "./scripts/excersize1";
// import { getDataForPart2 } from "./scripts/excersize2";
// prettier-ignore
const switchBtn :HTMLButtonElement = <HTMLButtonElement>document.getElementById(`switchExcersize`);
// prettier-ignore
const searchBtn :HTMLButtonElement = <HTMLButtonElement>document.getElementById(`searchBtn`);
// prettier-ignore
const calculateBtn :HTMLButtonElement = <HTMLButtonElement> document.getElementById(`calculateBtn`);
// prettier-ignore
const excersizeConatiner1 :HTMLDivElement = <HTMLDivElement> document.getElementById(`excersize1`);
// prettier-ignore
const excersizeConatiner2 :HTMLDivElement = <HTMLDivElement> document.getElementById(`excersize2`);

// switchBtn.addEventListener(`click`)
const excersizeSwitcher = () => {
  excersizeConatiner1.classList.toggle(`hidden`);
  excersizeConatiner2.classList.toggle(`hidden`);
};

// event handlers
switchBtn.addEventListener(`click`, excersizeSwitcher);
searchBtn.addEventListener(`click`, getData);
// calculateBtn.addEventListener(`click`, getDataForPart2);
console.log(123)