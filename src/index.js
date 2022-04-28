//#region Import #
//import './sass/main.scss';
import { ref } from './js/helpers/ref';
import { getImg } from './js/api/pixabayApi'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації


//#endregion #

//#region Varyables #
const IMAGE_PER_PAGE = Number(20);

//#endregion #

//#region Main
const perPage = 40;
let maxPage = 0;
ref.btnLoadMore.classList.add('visually-hidden');
ref.inputSearch.addEventListener('submit', (e) =>
    {
        e.preventDefault();
        const { elements: { searchQuery } } = e.currentTarget;
        const str = (searchQuery.value).trim();
        if (str === '') return;
        ref.divGallery.innerHTML = '';
        const prom = getImg(searchQuery.value, perPage);
        prom.then(value =>
        {
            maxPage = Math.trunc(value.data.totalHits / perPage);
            if (!value.data.total)
            {
                Notify.warning('Sorry, there are no images matching your search query. Please try again.');
            }
        });
        ref.btnLoadMore.classList.remove('visually-hidden');
    });
ref.btnLoadMore.addEventListener('click', e =>
{
    e.preventDefault();
    const str = ref.inputSearch[0].value;
    if (str === '') return;
    if (maxPage > 0)
    {
        getImg(str, perPage, maxPage);
        maxPage--;
    }
    else
    {
        Notify.info('We\'re sorry, but you\'ve reached the end of search results.');
        ref.btnLoadMore.classList.add('visually-hidden');
    };

});

//#endregion

