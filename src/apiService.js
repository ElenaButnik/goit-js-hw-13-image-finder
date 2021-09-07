import {refs} from './refs.js';
import { renderCollection } from './index.js';
import { hideButton } from './index.js';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

export default class NewsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;

  }
  fetchArticles() {
 //console.log(this);
const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23276068-4a413a2f7a08bb1d67038a93d`;
    
return fetch (URL)
.then(response =>  response.json())
.then(data => {
  if(data.hits.length === 0){
    hideButton() 
    alert ( 'Введите корректные данные для поиска')
  }
  renderCollection(data.hits)
}
  )
.then(data => this.incrementPage())
.catch(err => console.log(err));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query (newQuery) {
    this.searchQuery = newQuery;
  }
}


 