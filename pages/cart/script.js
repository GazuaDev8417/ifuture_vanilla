const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
const products = localStorage.getItem('bag')
const bag = JSON.parse(products)
const payment = document.getElementById('paymentMethod')



window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(!token){
        location.href = '../../index.html'
    }
})


const getProfile = ()=>{
    fetch(`${url}/profile`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        const user = data.user

        document.querySelector('.sectionOne').innerHTML = `
            <div>Endereço para entrega:<br>${user.address}</div>
            <img
                onclick='location.href="../address/index.html"' 
                class='edit'
                src="../../img/edit.png"
                alt='Edit icon'>
        `

        const id = localStorage.getItem('id')

        fetch(`${url}/restaurants/${id}`, {
            headers: {
                auth: localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data=>{
            const restaurant = data.restaurant

            document.querySelector('.sectionTwo').innerHTML = `
            <div class='restaurante'>${restaurant.name}</div>				
            <div>${restaurant.address}</div>
        `
        })

    }).catch(e=>{
        alert(e.message)
    })
}

getProfile()


const total = ()=>{
    let sum = 0
    for(let value of bag){
        sum += value.price * value.quantity
    }

    return sum
}


const removeFromCart = (item)=>{
    const newBag = bag.filter(bg => bg.id !== item.id)
    localStorage.setItem('bag', JSON.stringify(newBag))
    location.reload()
    
    if(bag.length === 1){
        localStorage.removeItem('productId')
        localStorage.removeItem('quantity')
    }
}


const closePurchase = ()=>{
    const id = localStorage.getItem('id')

    if(bag.length > 0){
        const body = {
            products: bag.map(item=>{
                return {
                    id: item.id,
                    quantity: item.quantity
                }
            }),
            paymentMethod: payment.value
        }

        fetch(`${url}/restaurants/${id}/order`, {
            method:'POST',
            headers: {
                'Content-type': 'application/json',
                auth: localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data=>{
            alert('Compra realizada com sucesso')
            console.log(data)
        }).catch(e=>{
            alert(JSON.stringify(e.message))
        })
    }else{
        alert('Precisa adicionar itens para fechar compra')
    }
}


const activeOrder = ()=>{
    fetch(`${url}/active-order`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        alert(JSON.stringify(data.order))
    }).catch(e=>{
        alert(e.message)
    })
}


document.getElementById('products').innerHTML = bag.map(item=>{
    return`
        <div class='card' key=${item.id}>
            <img src=${item.photoUrl} class='picture'>
            <div class='section'>
                <div style='color: red; font-size: 16pt'>${item.name}</div><br>
                <div style='text-align: left; padding-left: 10px'>
                    <div><b>Descrição:</b> ${item.description}</div>
                    <div><b>Quantidade:</b> ${item.quantity}</div>
                    <div>
                        <b>Preço: </b>R$ ${item.price.toFixed(2)}
                    </div>
                    <div><b>Total: </b>R$ ${(item.price * item.quantity).toFixed(2)}</div>
                </div>                
            </div>
            <button onclick='removeFromCart(${JSON.stringify(item)})'>Remover</button>
        </div>
    `
}).join('')

document.getElementById('total').innerHTML = `TOTAL R$ ${total().toFixed(2)}`
document.querySelector('#purchase').addEventListener('click', closePurchase)
document.querySelector('#active-order').addEventListener('click', activeOrder)
