const itemList = document.querySelector('.items__container')
let items

async function getAPI() {
    const objects = await fetch('https://fakestoreapi.com/products/')
    const objectsData = await objects.json()
    console.log(objectsData)
    return objectsData
    
}

async function renderItems(filter){
    if (!items){
        items = await getAPI()
    }
    if (filter === 'highest-rated'){
        items.sort((a,b) => b.rating.rate - a.rating.rate)
    }
    else if (filter === 'price-low-to-high'){
        items.sort((a,b) => (a.price - b.price))
    }
    else if (filter === 'price-high-to-low'){
        items.sort((a,b) => (b.price - a.price))
    }

    const itemHTML = items.map((object) =>
        `<div class="item">
            <figure class="item__img--wrapper">
                <img class="item__img" src="${object.image}" alt="">
            </figure>
            <div class="item__info">
                <h1 class="item__title">${object.title}</h1>
                <div class="item__sub-info">
                    <h2 class="price">$${object.price}</h2>
                    <div class="stars">
                        ${ratingsHTML(object.rating)}
                    </div>
                </div>
            </div>
        </div>`).join('')
        itemList.innerHTML = itemHTML
}

function ratingsHTML(rating){
    let ratingHTML = ''
    for (let i = 0; i < Math.floor(rating.rate); i++){
        ratingHTML +=`<i class="fa-solid fa-star"></i>`
    }
    if (!Number.isInteger(rating.rate)){
        ratingHTML +=`<i class="fa-solid fa-star-half"></i>`
    }
    return ratingHTML
}

function filterItems(event){
    renderItems(event.target.value)
}
