import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33842682-eca7b00e850c4a3ea440c3225';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=5';
        
export default class FotoServiceApi{

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };

    async fotoArticles() {
        return await axios.get(`${BASE_URL}/?key=${KEY}&q=${this.searchQuery}&${OPTIONS}&page=${this.page}`)
            .then(response => {
                this.incrementPage();
                return response.data.hits;
            });
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
};

