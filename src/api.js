import axios from "axios";

const URL = 'https://pixabay.com/api/';
  const API_KEY = '36692460-95aa8d63e830b1b263bde2e89';

const limit = 40;

export function searchImages(query,page = 1) {
  // const URL = 'https://pixabay.com/api/';
  // const API_KEY = '36692460-95aa8d63e830b1b263bde2e89';

  const params = new URLSearchParams({
    key: '36692460-95aa8d63e830b1b263bde2e89',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: limit,
    page: page, 
  });

  return axios.get(`${URL}?key=${API_KEY}&q=${query}&${params}`).then(({data})=>{
  return data;
  })



//   return fetch(
//     `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`
//   ).then(response => {
//     if (!response.ok) {
//       console.clear();
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
}