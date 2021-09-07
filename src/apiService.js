import {refs} from './refs.js';
import { renderCollection } from './index.js';

export default class NewsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;

  }
  fetchArticles() {
    console.log(this);
const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&${this.page}&per_page=12&key=23276068-4a413a2f7a08bb1d67038a93d`;
    
return fetch (URL)
.then(response => response.json())
.then(data => renderCollection(data.hits))
.then(data => this.incrementPage())
.catch(err => console.log(err));
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query (newQuery) {
    this.searchQuery = newQuery;
  }

  
}


 