import { inputEl } from './temp';
import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(countryName) {
   return fetch(`${BASE_URL}${countryName}?fields=name,capital,population,flags,languages`)
      .then(resp => {
         // console.log(resp);

         return handleResponse(resp);

      });
}
function handleResponse(resp) {
         if (!resp.ok) {
            setTimeout(function () { inputEl.classList.remove("style-error") }, 3000);

            inputEl.classList.add("style-error");
            throw new Error(Notiflix.Notify.failure('Oops, there is no country with that name'));
         } else {
            return resp.json();
         }
}