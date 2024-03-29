export const fetchData = async (date = '') => {
  const url = 'https://api.nasa.gov/planetary/apod';
  const apiKey = '?api_key=bq9vYGkZD9J3f5eLwDtggyob1TinPuTSL3wGm5Bl';

  const response = await fetch(url + apiKey + date);
  if (!response.ok) {
    throw Error(
      `Failed to fetch space data. Response status code: ${response.status}`
    );
  }
  return await response.json();
};
