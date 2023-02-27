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
    fotoServiceApi.fotoArticles().then(({ data }) => refs.container.innerHTML = renderFotoCard(data.hits))
// 
    // fotoServiceApi.fotoArticles().then(data => {renderFotoCard(data)});
    // fotoServiceApi.fotoArticles();

        // .then(hits => {
        //     refs.container.innerHTML = renderFotoCard(hits);
        // }
            
        // );
    
}

function onLoadMore() {
    fotoServiceApi.fotoArticles();
}

function renderFotoCard(searchData) {
    return searchData.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `
            <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${downloads}
                </p>
            </div>
        </div>
    ` }).join('');
};
