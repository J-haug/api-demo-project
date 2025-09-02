const itemList = document.querySelector('.items__container')


async function getAPI() {
    const objects = await fetch('https://fakestoreapi.com/products/')
    const objectsData = await objects.json()
    console.log(objectsData)
    itemList.innerHTML = objectsData.map((object) =>
        `<div class="item">
            <figure class="item__img--wrapper">
                <img class="item__img" src="${object.image}" alt="">
            </figure>
            <div class="item__info">
                <h1 class="item__title">${object.title}</h1>
                <div class="item__sub-info">
                    <h2 class="price">$${object.price}</h2>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
            </div>
        </div>`).join('')
}



getAPI()