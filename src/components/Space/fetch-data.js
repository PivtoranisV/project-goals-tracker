export const fetchData = async (date = '') => {
  const url = 'https://api.nasa.gov/planetary/apod';
  const apiKey = '?api_key=bq9vYGkZD9J3f5eLwDtggyob1TinPuTSL3wGm5Bl';
  //   const date = '&date=1999-02-20';

  const response = await fetch(url + apiKey + date);
  return await response.json();
};
