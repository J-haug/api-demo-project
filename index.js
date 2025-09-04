const itemList = document.querySelector('.items__container')
let allItems = null
let items

const sortEl = document.querySelector('.filter__dropdown')
const categoryEl = document.querySelector('.category__dropdown')
const searchEl = document.getElementById('search')
const searchIcon = document.querySelector('.search__button')
const loadingScreen = document.querySelector('.loading-screen')
const noResults = document.querySelector('.no-results')
let query = ''

async function getAPI() {
    const objects = await fetch('https://fakestoreapi.com/products/')
    const objectsData = await objects.json()
    console.log(objectsData)
   
    return objectsData
    
}

async function update() {
    loadingScreen.classList.add('visible')
    if (!allItems){
        allItems = await getAPI()
    }
    items = [...allItems]
    noResults.classList.remove('visible')

    searchEl.addEventListener('keydown',function(event){
        if (event.key === 'Enter'){
            query = searchEl.value.toLowerCase()
            
        }
    })
    searchIcon.addEventListener('click',function(){
        query = searchEl.value.toLowerCase()
    })
    
    
    if (query) {
        items = items.filter(item => item.title.toLowerCase().includes(query))
        
    }

    if (categoryEl.value !== 'all'){
        if (categoryEl.value === 'electronics'){
            items = items.filter(item => item.category === "electronics")
        }
        else if (categoryEl.value === "men's clothing"){
            items = items.filter(item => item.category === "men's clothing")
        }
        else if (categoryEl.value === "women's clothing"){
            items = items.filter(item => item.category === "women's clothing")
        }
        else if (categoryEl.value === "jewelery"){
            items = items.filter(item => item.category === "jewelery")
        }
    }


    if (sortEl.value === 'highest-rated'){
        items.sort((a,b) => b.rating.rate - a.rating.rate)
    }
    else if (sortEl.value === 'price-low-to-high'){
        items.sort((a,b) => (a.price - b.price))
    }
    else if (sortEl.value === 'price-high-to-low'){
        items.sort((a,b) => (b.price - a.price))
        
    }

    renderItems()
    if (items.length === 0){
        noResults.classList.add('visible')
    }
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



update()
