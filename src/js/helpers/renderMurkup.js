export const renderMurkup = (gallaryObj) =>
{
    const str = gallaryObj
        .map(
            ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
                `
            <a class="gallery__item" href="${largeImageURL}">
                <div class="photo-card">
                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}"/>
                        <ul class="info">
                            <li class="info-item">
                                <b>Likes</b>
                                <p>${likes}</p>
                            </li>
                            
                            <li class="info-item">
                                <b>Views</b>
                                <p>${views}</p>
                            </li>
                            
                            <li class="info-item">
                                <b>Comments</b>
                                <p>${comments}</p>
                            </li>
                            
                            <li class="info-item">
                                <b>Downloads</b>
                                <p>${downloads}</p>
                            </li>
                        </ul>
                </div>
            </a>
                `
        )
        .join('\n');
    return str;
}