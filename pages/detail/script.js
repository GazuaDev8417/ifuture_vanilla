const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
const modal = document.getElementById('modalContainer')
const selectValue = document.getElementById('selectQnt')




const restMenu = ()=>{
    const id = localStorage.getItem('id')

    fetch(`${url}/restaurants/${id}`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        const menu = data.restaurant
        const products = menu.products

        document.getElementById('title').innerHTML = menu.name
        document.getElementById('image').src = menu.logoUrl
        document.getElementById('category').innerHTML = menu.category
        document.getElementById('description').innerHTML = menu.description
        document.getElementById('delivery').innerHTML += `
            ${menu.deliveryTime} - ${menu.deliveryTime + 10} min
        `
        document.getElementById('deliveryPrice').innerHTML += `
            Frete R$ ${menu.shipping.toFixed(2)}
        `
        document.getElementById('address').innerHTML = menu.address

        document.getElementById('menu').innerHTML = products.map(product=>{
            return`
                <div class='card-products' key=${product.id}>
                    <img src=${product.photoUrl} class='picture' alt'imagem'>
                    <div style='margin: 10px;'>
                        <h4>${product.name}</h4>
                        <p style='font-size: 10pt;'>
                            ${product.description}
                        </p>
                    </div>
                    <button onclick='adicionar(${JSON.stringify(product)})'>
                        Adicionar
                    </button>
                </div>
            `
        }).join('')
    }).catch(e=>{
        alert(e.message)
    })
}

restMenu()


const adicionar = (menu)=>{
    localStorage.setItem('productId', menu.id)
    localStorage.setItem('product', JSON.stringify(menu))

    document.getElementById('modalContainer').style.display = 'block'    
}


document.getElementById('closeModal').addEventListener('click', ()=>{
    modal.style.display = 'none'
})

let bag = []

document.getElementById('addToCart').addEventListener('click', ()=>{
    const product = localStorage.getItem('product')
    bag.push(product)

    localStorage.setItem('bag', JSON.stringify(bag))
})


// selectValue.addEventListener('change', ()=>{
    
// })