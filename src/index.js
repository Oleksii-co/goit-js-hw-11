import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { searchImages } from './api';

const form = document.getElementById('search-form');
const divEL = document.querySelector('.gallery');
const addMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchValue = '';

hideLoadMoreBtn();

form.addEventListener('submit', onFormSubmit);

addMoreBtn.addEventListener('click', loadMore);

Notify.init({
  fontSize: '16px',
  width: '300px',
});

async function onFormSubmit(evt) {
  hideLoadMoreBtn();
  evt.preventDefault();

  const query = evt.currentTarget.elements.searchQuery.value.trim();
  searchValue = query;
  page = 1;
  divEL.innerHTML = '';

  const { totalHits, hits } = await searchImages(searchValue, page);

  if (totalHits === 0 || searchValue === '') {
    hideLoadMoreBtn();

    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    form.reset();
    return;
  }

  if (totalHits > 1) {
    Notify.info(`Hooray! We found ${totalHits} images.`);
    renderMarkup(hits);
    showLoadMoreBtn();
    form.reset();
  }
  if (hits.length < 40 && hits.length > 0) {
    hideLoadMoreBtn();
    form.reset();
  }

  // searchImages(searchValue,page).then((res)=>{
  //   if (res.totalHits > 1) {
  //     Notify.info(
  //       `Hooray! We found ${res.totalHits} images.`
  //     );
  //   }
  //     return res;
  //    }).then(({hits})=>{

  //     renderMarkup(hits);
  //     showLoadMoreBtn();

  //     if (hits.length < 40 && hits.length > 0) {
  //       hideLoadMoreBtn()
  //     }
  //       if (hits.length === 0) {
  //         hideLoadMoreBtn();

  //           Notify.failure(
  //               "Sorry, there are no images matching your search query. Please try again."
  //             );
  //       }
  //   })
  // .finally(()=>{
  //   form.reset()
  // })
}

async function loadMore() {
  page += 1;
  const { hits } = await searchImages(searchValue, page);

  renderMarkup(hits);

  if (hits.length < 40 && hits.length > 0) {
    hideLoadMoreBtn();
    Notify.info("We're sorry, but you've reached the end of search results.");

    hideLoadMoreBtn();
  } else if (hits.length === 0) {
    hideLoadMoreBtn();

    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  // searchImages(searchValue,page).then(({hits})=>{

  //     renderMarkup(hits);
  //     showLoadMoreBtn();

  //     if (hits.length < 40 && hits.length > 0) {
  //       hideLoadMoreBtn()
  //       Notify.info(
  //         "We're sorry, but you've reached the end of search results."
  //       );
  //     }
  //       if (hits.length === 0) {
  //         hideLoadMoreBtn();

  //           Notify.failure(
  //               "Sorry, there are no images matching your search query. Please try again."
  //             );
  //       }
  //   })
}

function renderMarkup(img) {
  const markup = img
    .map(img => {
      return `<div class="photo-card">
      <a class="gallery__item" href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
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
      `;
    })
    .join('');

  // divEL.innerHTML = markup;
  divEL.insertAdjacentHTML('beforeend', markup);
}

function showLoadMoreBtn() {
  addMoreBtn.classList.remove('hidden');
}
function hideLoadMoreBtn() {
  addMoreBtn.classList.add('hidden');
}
