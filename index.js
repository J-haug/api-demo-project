const itemList = document.querySelector('.items__container')
let items
const loadingScreen = document.querySelector('.loading-screen')

async function getAPI() {
    const objects = await fetch('https://fakestoreapi.com/products/')
    const objectsData = await objects.json()
    console.log(objectsData)
    return objectsData
    
}

async function update() {
    loadingScreen.classList.add('visible')
    items = await getAPI()

    if (document.querySelector('.category__dropdown').value === 'all'){
        items = await getAPI()
    }
    if (document.querySelector('.category__dropdown').value === 'electronics'){
        items = items.filter(item => item.category === "electronics")
    }
    else if (document.querySelector('.category__dropdown').value === "men's clothing"){
        items = items.filter(item => item.category === "men's clothing")
    }
    else if (document.querySelector('.category__dropdown').value === "women's clothing"){
        items = items.filter(item => item.category === "women's clothing")
    }
    else if (document.querySelector('.category__dropdown').value === "jewelery"){
        items = items.filter(item => item.category === "jewelery")
    }


    if (document.querySelector('.filter__dropdown').value === 'highest-rated'){
       
        items.sort((a,b) => b.rating.rate - a.rating.rate)
    }
    else if (document.querySelector('.filter__dropdown').value === 'price-low-to-high'){
        items.sort((a,b) => (a.price - b.price))
    }
    else if (document.querySelector('.filter__dropdown').value === 'price-high-to-low'){
        items.sort((a,b) => (b.price - a.price))
        
    }
    renderItems()
}

function renderItems(){
    
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
        loadingScreen.classList.remove('visible')
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
    update()
}


update()
