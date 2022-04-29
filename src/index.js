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
let strRequest = '';
ref.inputSearch.addEventListener('submit', (e) =>
    {
        e.preventDefault();
        const { elements: { searchQuery } } = e.currentTarget;
        strRequest = ((searchQuery.value).trim()).toLowerCase();
        if (strRequest === '') return;
        ref.divGallery.innerHTML = '';
        const prom = getImg(ref, strRequest, perPage);
        prom
            .then(value =>
            {
                ref.btnLoadMore.classList.add('visually-hidden');
                if (value != 'Error: Request failed with status code 400'
                    || value != 'Error: Network Error at createError')
                {
                    if (!value.data.total)
                    {
                        Notify.warning('Sorry, there are no images matching your search query. Please try again.');
                    }
                    else
                    {
                        ref.btnLoadMore.classList.remove('visually-hidden');
                        maxPage = Math.trunc(value.data.totalHits / perPage);
                        Notify.success(`Hooray! We found ${value.data.totalHits} images.`);
                    }
                }
                else {
                    Notify.failure(value.message);
                }
                searchQuery.value = '';
            })
            .catch(err => {
                Notify.failure(err.message);
            });

    });
ref.btnLoadMore.addEventListener('click', e =>
{
    e.preventDefault();
    if (maxPage > 0)
    {
        getImg(ref, strRequest, perPage, maxPage);
        maxPage--;
    }
    else
    {
        Notify.info('We\'re sorry, but you\'ve reached the end of search results.');
        ref.btnLoadMore.classList.add('visually-hidden');
    };

});

//#endregion

