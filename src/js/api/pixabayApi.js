//#region Import
import { renderMurkup } from '../helpers/renderMurkup';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

//#region Value
const URL = 
{
    BASE_URL: 'https://pixabay.com/api/',

}
const perPage = { p3: '3', p20: '20', p40: '40' };
const paramValue =
{
    API_KEY: '26957762-d57e139ef4e468b63f7952cc1',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    
};
const paramType =
{
    key: 'key=',
    search: 'q=',
    image_type: 'image_type=',
    orientation: 'orientation=',
    safesearch: 'safesearch=',
    perPage: 'per_page=',
    page: 'page='
};

import axios from 'axios';
//#endregion

//#region Func
export const getImg = (ref, searchValue, imgPerPage, page = 1) =>
{
    const fulllUrl =
        `${URL.BASE_URL}?${paramType.key + paramValue.API_KEY}&${paramType.search + searchValue}&${paramType.image_type + paramValue.image_type}&${paramType.orientation + paramValue.orientation}&${paramType.safesearch + paramValue.safesearch}&${paramType.perPage + imgPerPage}&${paramType.page + page}`;

    return axios.get(fulllUrl)
        .then(response => {
            ref.divGallery.insertAdjacentHTML('beforeend', renderMurkup(response.data.hits));
            //#region SimpleLightbox
            let gallery = new SimpleLightbox('.gallery a',
            {
                captionType: 'attr',
                captionsData: 'title',
                captionPosition: 'bottom',
                captionDelay: 250,
            });
            //#endregion #
        return response;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}
//#endregion

