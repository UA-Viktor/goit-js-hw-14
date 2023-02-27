import FotoServiceApi from './js/foto-service-api';
// import fotoCardJSON from './templates/foto-card.hbs'

const refs = {
    searchForm: document.querySelector('.search-form'),
    container: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const fotoServiceApi = new FotoServiceApi();

function onSearch(e) {
    e.preventDefault();

    fotoServiceApi.query = e.currentTarget.elements.searchQuery.value;
    fotoServiceApi.resetPage(); 
    fotoServiceApi.fotoArticles();
}

function onLoadMore() {
    fotoServiceApi.fotoArticles();
}


const user = {
    name: 'Viktor',
    age: 36,
}

// function renderFotoCard(fotoCardJSON) {
//     refs.container.innerHTML = fotoCardJSON(fotoCardJSON);
// }

// renderFotoCard(user);