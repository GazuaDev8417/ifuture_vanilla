const search = document.getElementById('search')
const card = document.querySelector('.card')
const rests = document.getElementById('restaurants')
const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
let restaurantsList = []



window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(!token){
        location.href = '../../index.html'
    }
})


const listaDeRestaurantes = ()=>{
    fetch(`${url}/restaurants`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        
        const restaurants = data.restaurants
        restaurantsList = data.restaurants

        search.addEventListener('input', ()=>{
            const filtered = restaurants.filter(rest=>{
                return rest.name.toLowerCase().includes(search.value.toLowerCase())
            })
    
            rests.innerHTML = filtered.map(restaurant=>{
                return `
                    <div class='card' key=${restaurant.id}>
                        <img
                            class='image'
                            onclick='restaurantDetail("${restaurant.id}")' 
                            src=${restaurant.logoUrl}>
                        <div style="margin: 15px;">
                            ${restaurant.name}
                            <div class='time'>
                                ${restaurant.deliveryTime} - ${restaurant.deliveryTime + 10} min
                                <div>
                                    Frete: R$ ${restaurant.shipping.toFixed(2)}
                                </div> 
                            </div>                    
                        </div>
                    </div>
                `
            }).join('')
        })

        document.getElementById('cat').innerHTML = restaurants.map((rest)=>{
            return `
                <div key=${rest.id} class='card-category' onclick='categoryFilter("${rest.category}")'>
                    ${rest.category}
                </div>
            `
        }).join('')

        rests.innerHTML = restaurants.map(restaurant=>{
            return `
                <div class='card' key=${restaurant.id}>
                    <img
                        class='image'
                        onclick='restaurantDetail("${restaurant.id}")' 
                        src=${restaurant.logoUrl}>
                    <div style="margin: 15px;">
                        ${restaurant.name}
                        <div class='time'>
                            ${restaurant.deliveryTime} - ${restaurant.deliveryTime + 10} min
                            <div>
                                Frete: R$ ${restaurant.shipping.toFixed(2)}
                            </div> 
                        </div>                    
                    </div>
                </div>
            `
        }).join('')
    
    }).catch(e=>{
        alert(e.message)
    })
}

listaDeRestaurantes()


const categoryFilter = (category)=>{
    const filtered = restaurantsList.filter(rest => rest.category === category)

    if(filtered.length === 0){
        rests.style.display = 'none'
    }else{
        rests.style.display = 'block'
    }    

    rests.innerHTML = filtered.map(restaurant=>{
        return `
            <div class='card' key=${restaurant.id}>
                <img
                    class='image'
                    onclick='restaurantDetail("${restaurant.id}")' 
                    src=${restaurant.logoUrl}>
                <div style="margin: 15px;">
                    ${restaurant.name}
                    <div class='time'>
                        ${restaurant.deliveryTime} - ${restaurant.deliveryTime + 10} min
                        <div>
                            Frete: R$ ${restaurant.shipping.toFixed(2)}
                        </div> 
                    </div>                    
                </div>
            </div>
        `
    }).join('')
}


const restaurantDetail = (id)=>{
    localStorage.setItem('id', id)
    location.href = '../detail/index.html'
}
