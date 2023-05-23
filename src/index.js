import './css/styles.css';

import { searchImages } from './api';

const form = document.getElementById("search-form");
const inputEl = document.querySelector("input[name=searchQuery]");
const btnEL = document.querySelector("button[type=submit]");
const divEL = document.querySelector(".gallery");


form.addEventListener("submit",onFormSubmit)




function onFormSubmit(evt) {
    evt.preventDefault();

    const query = inputEl.value

searchImages(`${query}`).then((res)=>{console.log(res);})
}
