const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
const products = localStorage.getItem('bag')
const bag = JSON.parse(products)
console.log(bag)


const getProfile = ()=>{
    fetch(`${url}/profile`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        const user = data.user

        document.querySelector('.sectionOne').innerHTML = `
            <div>Endereço para entrega:<br>${user.address}</div>
            <img class='edit'  src="../../img/edit.png" alt='Edit icon'>
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
        console.log(e.message)
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

document.getElementById('products').innerHTML = bag.map(item=>{
    return`
        <div class='card' key=${item.id}>
            <img src=${item.photoUrl} class='picture'>
            <div class='section'>
                <div style='color: red; font-size: 16pt'>${item.name}</div>
                <div style='text-align: left'>
                    <div><b>Descrição:</b> ${item.description}</div>
                    <div><b>Quantidade:</b> ${item.quantity}</div>
                    <div>
                        <b>Preço: </b>R$ ${item.price.toFixed(2)}
                    </div>
                    <div><b>Total: </b>R$ ${(item.price * item.quantity).toFixed(2)}</div>
                </div>                
            </div>
            <button>Remover</button>
        </div>
    `
}).join('')

document.getElementById('total').innerHTML = `TOTAL R$ ${total().toFixed(2)}`
