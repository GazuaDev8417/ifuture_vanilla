const search = document.getElementById('search')
const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
let restaurants = []



const listaDeRestaurantes = ()=>{
    return new Promise((resolve,  reject)=>{

        fetch(`${url}/restaurants`, {
            headers: {
                auth: localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data=>{
            restaurants = data
            resolve()
        }).catch(e=>{
            reject(e)
        })
    })

}

listaDeRestaurantes()


search.addEventListener('input', ()=>{
    listaDeRestaurantes().then(()=>{
        const rests = restaurants.restaurants
    
        const filtered = rests.filter(rest=>{
            return rest.name.toLowerCase().includes(search.value.toLowerCase())
        })

        document.getElementById('restaurants').innerHTML = filtered.map(restaurant=>{
            return `
                <div class='card' key=${restaurant.id}>
                    <img src=${restaurant.logoUrl} class='image'>
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
})


const categoryFilter = (category)=>{
    listaDeRestaurantes().then(()=>{
        const rests = restaurants.restaurants

        const filtered = rests.filter(rest => rest.category === category)

        document.getElementById('restaurants').innerHTML = filtered.map(restaurant=>{
            return `
                <div class='card' key=${restaurant.id}>
                    <img src=${restaurant.logoUrl} class='image'>
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
}


listaDeRestaurantes().then(()=>{
    const rests = restaurants.restaurants 
    document.getElementById('cat').innerHTML = rests.reduce((accumulator, rest)=>{
        return `
            <div key=${rest.id} class='card-category' onclick='categoryFilter("${rest.category}")'>
                ${accumulator}
                ${rest.category}
            </div>
        `
    }, '')

})


listaDeRestaurantes().then(()=>{
    console.log(restaurants.restaurants)
    const rests = restaurants.restaurants
    restaurants = Array.isArray(restaurants) ? restaurants : []
    document.getElementById('restaurants').innerHTML = rests.map(restaurant=>{
        return `
            <div class='card' key=${restaurant.id}>
                <img src=${restaurant.logoUrl} class='image'>
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
    console.log(e.message)
})

