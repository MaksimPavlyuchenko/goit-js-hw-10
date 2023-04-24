import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryData = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  const nameCountry = e.target.value.trim();
  if (nameCountry === '') {
    countryData.innerHTML = '';
    list.innerHTML = '';
    return;
  } else
    fetchCountries(nameCountry)
      .then(data => {
        if ((data.length > 2) & (data.length < 10)) {
          countryData.innerHTML = '';
          return (list.innerHTML = createMarkupList(data));
        } else if (data.length === 1) {
          list.innerHTML = '';
          return (countryData.innerHTML = createMarkupBox(data));
        } else if (data.length > 10) {
          countryData.innerHTML = '';
          list.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter a more specific name!!!'
          );
        }
      })
      .catch(() => {
        countryData.innerHTML = '';
        list.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
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
        languages,
      }) =>
        ` <div>
      <img src=${svg}>
      <p>${official}</p>
    </div>
    <p>CAPITAL:  ${capital}</p>
    <p>POPULATION:  ${population}</p>
    <p>LANGUAGES:  ${Object.values(languages)}</p>
    `
    )
    .join('');
}
