const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
const modal = document.getElementById('modalContainer')
const quantity = document.getElementById('selectQnt')
const main = document.querySelector('.main')



window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(!token){
        location.href = '../../index.html'
    }
})


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
                    <div class='description'>
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


quantity.addEventListener('change', ()=>{
    console.log(quantity)
})


const adicionar = (menu)=>{
    localStorage.setItem('quantity', quantity.value)
    localStorage.setItem('productId', menu.id)
    localStorage.setItem('product', JSON.stringify(menu))

    modal.style.display = 'block'
    modal.style.backgroundColor = 'rgba(255,255,255,.8)'
    main.style.pointerEvents = 'none'
    document.body.style.backgroundColor = 'rgba(0,0,0,.9)'
}


document.getElementById('closeModal').addEventListener('click', ()=>{
    localStorage.removeItem('product')
    
    modal.style.display = 'none'
    main.style.pointerEvents = 'auto'
    document.body.style.backgroundColor = 'white'
})

let bag = []

document.getElementById('addToCart').addEventListener('click', ()=>{
    const product = localStorage.getItem('product')
    const parseProduct = JSON.parse(product)

    parseProduct.quantity = quantity.value
    bag.push(parseProduct)

    localStorage.setItem('bag', JSON.stringify(bag))
    location.href = '../cart'
})