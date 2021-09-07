import * as basicLightbox from 'basiclightbox';
import './apiService.js';
import {refs} from './refs.js';
import NewsApiService from './apiService';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './sass/main.scss';


const instance = basicLightbox.create(`
	<h1>Dynamic Content</h1>
	<p>You can set the content of the lightbox with JS.</p>
`)
// instance.show();
//

const newApiService = new NewsApiService();
//console.log(newApiService)
hideButton();

const handlerSubmit = (e) => {
   e.preventDefault ();
   //const form = e.currentTarget;
   refs.gallery.innerHTML = "";
    newApiService.query = refs.inpit.value;
    //newApiService.query = form.elements.query.value;
   
    showButton();
    newApiService.resetPage();
    newApiService.fetchArticles();
    onScrollPage();
  }

refs.form.addEventListener('submit', handlerSubmit);
refs.loardMoreBtn.addEventListener('click', loadMore);



function loadMore(e) {
  e.preventDefault ();
  newApiService.fetchArticles();
  onScrollPage();
}

 function createItem ({webformatURL, tags, likes, views, comments, downloads}) {
  const picture = `<li>
  <div class="photo-card">
   <img src="${webformatURL}" alt="${tags}" />
 
   <div class="stats">
     <p class="stats-item">
       <i class="material-icons">thumb_up</i>
      ${likes}
     </p>
     <p class="stats-item">
       <i class="material-icons">visibility</i>
     ${views}
     </p>
     <p class="stats-item">
       <i class="material-icons">comments</i>
      ${comments}
     </p>
     <p class="stats-item">
       <i class="material-icons">cloud_download</i>
     ${downloads}
     </p>
   </div>
 </div>
 </li>`
 
 refs.gallery.insertAdjacentHTML('beforeend',  picture)
 }
 
 export function renderCollection (arr) {
     arr.forEach(el => createItem (el));
 }

 export function hideButton() {
  refs.loardMoreBtn.classList.add('is-hidden');
 }

 function showButton() {
  refs.loardMoreBtn.classList.remove('is-hidden');
 }

 function onScrollPage() {
   setTimeout (() => {
     refs.loardMoreBtn.scrollIntoView({
        block: 'end',
        behavior: 'smooth', });

   }, 500);
   
 }