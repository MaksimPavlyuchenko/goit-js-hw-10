import './css/styles.css';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryData = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  const nameCountry = e.target.value;
  fetchCountries(nameCountry)
    .then(data => {
      list.innerHTML = createMarkupList(data);
      //   console.log(data[0].flags.svg);
    })
    .catch(error => console.log(error));
}

function fetchCountries(country) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const URL = `${BASE_URL}${country}`;
  return fetch(URL).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
function createMarkupList(arr) {
  return arr
    .map(
      ({ name: { official }, flags: { svg } }) => `<li> 
      <img width=50 heigth=50 src=${svg}>
      <p>${official}</p>
    </li>`
    )
    .join('');
}
function createMarkupBox(arr) {
  return arr
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages: {},
      }) =>
        ` <div>
      <p>${official}</p>
      <img width=50 heigth=50 src=${svg}>
    </div>
    <p>CAPITAL: ${capital}</p>
    <p>POPULATION: ${population}</p>
    <p>LANGUAGES: ${languages}</p>`
    )
    .join('');
}
