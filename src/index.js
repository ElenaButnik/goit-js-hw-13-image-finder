import * as basicLightbox from 'basiclightbox';
import './apiService.js';
import {refs} from './refs.js';
import NewsApiService from './apiService';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './sass/main.scss';


const instance = basicLightbox.create(`
	<h1>Dynamic Content</h1>
	<p>You can set the content of the lightbox with JS.</p>
`)
// instance.show();


const newApiService = new NewsApiService();
console.log(newApiService)


const handlerSubmit = (e) => {
   e.preventDefault ();
   refs.gallery.innerHTML = "";
    newApiService.query = refs.inpit.value;

    newApiService.fetchArticles();
  }

refs.form.addEventListener('submit', handlerSubmit);
refs.loardMoreBtn.addEventListener('click', loadMore);


function loadMore(e) {
  e.preventDefault ();
  newApiService.fetchArticles();
}

 function createItem ({webformatURL, tags, likes, views, comments, downloads}) {
  const picture = `<li>
  <div class="photo-card">
   <img src="${webformatURL}" alt="${tags}" />
 
   <div class="stats">
     <p class="stats-item">
       <i class="material-icons">thumb_up:</i>
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