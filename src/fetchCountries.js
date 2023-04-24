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
export { fetchCountries };
