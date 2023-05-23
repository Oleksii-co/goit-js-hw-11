const URL = 'https://pixabay.com/api/';
const API_KEY = '36692460-95aa8d63e830b1b263bde2e89'

export function searchImages(query) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      console.clear();
      throw new Error(response.status);
    }
    return response.json();
  });
}