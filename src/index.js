import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { searchImages } from './api';

const form = document.getElementById("search-form");
const inputEl = document.querySelector("input[name=searchQuery]");
const btnEL = document.querySelector("button[type=submit]");
const divEL = document.querySelector(".gallery");


form.addEventListener("submit",onFormSubmit)

Notify.init({
    fontSize: '16px',
    width: '300px',
  });
  


function onFormSubmit(evt) {
    evt.preventDefault();

    const query = evt.currentTarget.elements.searchQuery.value.trim()

searchImages(query).then(({hits})=>{

    if (hits.length === 0) {
        Notify.info(
            "Sorry, there are no images matching your search query. Please try again."
          );
    }

    renderMarkup(hits)  
})
}



function renderMarkup(img) {

    const markup = img.map((img) =>{
        return `<div class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${img.likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${img.views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${img.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${img.downloads}</b>
          </p>
        </div>
      </div>
      `
    }).join('');

    divEL.innerHTML = markup;
}


