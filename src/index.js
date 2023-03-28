import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
export const inputEl = document.getElementById('search-box'); 

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const contryListEl = document.querySelector('.country-list');
const contryInfoEl = document.querySelector('.country-info');

inputEl.setAttribute("placeholder", "Type country name by latin");
inputEl.focus();
inputEl.classList.add("style-default");

inputEl.addEventListener('input', debounce(handleInputSearch, DEBOUNCE_DELAY));

function handleInputSearch(event) {
   event.preventDefault();
   const countryName = inputEl.value.trim();

   if (countryName !== "") {
      renderResult(countryName);
   } else {
      contryInfoEl.innerHTML = "";
   }
}

function renderResult(countryName) {
   fetchCountries(countryName)
      .then(countries => {
         if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            contryInfoEl.innerHTML = "";
            return
         }
      if (countries.length === 1) {
         contryInfoEl.innerHTML = makeMarkupCoutryInfo(countries);
         return
      }
      if (countries.length <= 10) {
         contryInfoEl.innerHTML = makeMarkupCoutryList(countries);
         return
      }
      

   })
   .catch(err => {
      console.dir(err);
   });
}

function makeMarkupCoutryInfo(countries) {
   return countries.map(({ name, capital, population, flags, languages }) => {
      return `
         
       <h2 class="card-haeder">
   <img class="flag-image" width="30px"
   src="${flags.svg}"
   alt="flag image"/>
   ${name.official}
   </h2 >
   <ul class="country-info-list">
   <li class="list-item">
   <p class="text-info"><span class="category-name">Capital:</span> ${capital}</p>
   </li>
   <li class="list-item">
   <p class="text-info"><span class="category-name">Population:</span> ${population}</p>
   </li >
   <li class="list-item">
   <p class="text-info"><span class="category-name">Languages:</span> ${Object.values(languages).join(", ")}</p>
   </li>
   </ul>`;
      }).join('');
   }

   function makeMarkupCoutryList(countries) {
   return countries.map(({ name, flags}) => {
      return `
      <li> <h2 class="card-haeder">   
   <p class="text-block"><img class="flag-image" width="30px"
  src="${flags.svg}"
   alt="flag image"/> ${name.official}</p>
   </h2 >
   </li>
    
   `;
      }).join('');
}