import FotoServiceApi from './js/foto-service-api';
import LoadMoreStatusBtn from './js/load-more-btn';

const refs = {
    searchForm: document.querySelector('.search-form'),
    container: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onSearch);

const loadMoreStatusBtn = new LoadMoreStatusBtn({
    selector: '.load-more',
    hidden: true,
});

loadMoreStatusBtn.refs.button.addEventListener('click', onLoadMore);

const fotoServiceApi = new FotoServiceApi();

function onSearch(e) {
    e.preventDefault();

    fotoServiceApi.query = e.currentTarget.elements.searchQuery.value.trim();

    if (fotoServiceApi.query === '') {
        return alert('Пусто. Введите что то');
    }

    loadMoreStatusBtn.show();
    loadMoreStatusBtn.disable();

    fotoServiceApi.resetPage(); 

    fotoServiceApi.fotoArticles().then(hits => {
        if (hits.length === 0) {
            return alert('Ничего не нашли');
        } else {
            clearContainerGallery();
            renderCard(hits);
            loadMoreStatusBtn.enable();
        };
    });
};

function onLoadMore() {
    loadMoreStatusBtn.disable();
    fotoServiceApi.fotoArticles().then(hits => { 
        renderCard(hits);
        loadMoreStatusBtn.enable();
    })
};

function renderCard( data ) {
    refs.container.insertAdjacentHTML('beforeend', renderFotoCard(data))
};

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

function clearContainerGallery() {
    refs.container.innerHTML = '';
};