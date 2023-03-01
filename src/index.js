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


function clearContainerGallery() {
    refs.container.innerHTML = '';
};
// mx-auto d-block
function renderFotoCard(searchData) {
    return searchData.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `
        


                <div class="col">
                    <div class="card shadow-sm">
                        <div class="" style="height: 225px;">
                            <img src="${webformatURL}"
                                class="img-fluid bd-placeholder-img card-img-top" width="100%" alt="${tags}" loading="lazy">
                        </div>
                        <div class="card-body d-flex text-center mt-2">

                            <div class="m-1">
                                <p class="card-text">Likes</p>
                                <small class="text-muted">${likes}</small>
                            </div>

                            <div class="m-1">
                                <p class="card-text">Views</p>
                                <small class="text-muted">${views}</small>
                            </div>

                            <div class="m-1">
                                <p class="card-text">Comments</p>
                                <small class="text-muted">${comments}</small>
                            </div>

                            <div class="m-1">
                                <p class="card-text">Downloads</p>
                                <small class="text-muted">${downloads}</small>
                            </div>
                        </div>
                    </div>
                </div>




    ` }).join('');
};


{/* <div class="col">
    <div class="photo-card card shadow-sm">
        <div class="clearfix">
            <img src="${webformatURL}" alt="${tags}" class="img-fluid" loading="lazy" />
        </div>
        <div class="container text-center fs-6">
            <div class="row row-cols-4">
                <div class="col p-1">
                    <p class="in fo-item fw-lighter text-sm-start">
                        <b>Likes</b>
                        ${likes}
                    </p>
                </div>
                <div class="col p-1">
                    <p class="info-item fw-lighter text-sm-start">
                        <b>Views</b>
                        ${views}
                    </p>
                </div>
                <div class="col p-1">
                    <p class="info-item fw-lighter text-sm-start">
                        <b>Comments</b>
                        ${comments}
                    </p>
                </div>

                <div class="col p-1">
                    <p class="info-item fw-lighter text-sm-start">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div> */}