const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
const edit = document.getElementById('edit')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')



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
            <p style='padding-left: 10px;'>${user.name}<br>
            ${user.email}<br>
            ${user.cpf}</p>
            <img
                onclick='showForm()' 
                class='edit' 
                src="../../img/edit.png"
                alt="edit">
        `
        document.querySelector('.sectionTwo').innerHTML = `
            <div style='padding-left: 10px;'>Endereço cadastrado:<br>
                ${user.address}
            </div>
            <img
                onclick="location.href='../address/index.html'" 
                class='edit'
                src="../../img/edit.png"
                alt="edit">
        `
    }).catch(e=>{
        alert(e.message)
    })
}

getProfile()


const showForm = ()=>{
    edit.style.display = 'block'
}

const hideForm = ()=>{
    edit.style.display = 'none'
}

document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()

    const body = {
        name: userName.value,
        email: email.value,
        cpf: cpf.value
    }
    fetch(`${url}/profile`, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            auth: localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(()=>{
        getProfile()
        userName.value = ''
        email.value = ''
        cpf.value = ''
    }).catch(e=>{
        alert(e.message)
    })
})


const ordersHistory = ()=>{
    fetch(`${url}/orders/history`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        const orders = data.orders

        document.getElementById('orders').innerHTML = orders.map(order=>{
            return`
                <div class='orders' key=${order.createdAt}>
                    <div style='color: red; font-size: 15pt;'>
                        ${order.restaurantName}
                    </div>  
                    Pedido feito em: ${new Date(order.createdAt).toLocaleDateString()}
                    <div style='font-weight: bolder; font-size: 10pt;'>
                        TOTAL: R$ ${order.totalPrice}
                    </div>
                </div>
            `
        }).join('')
    }).catch(e=>{
        alert(e.message)
    })
}

ordersHistory()


document.querySelector('.header-icon').addEventListener('click', ()=>{
    const decide = window.confirm('Tem certeza que deseja se deslogar?')

    if(decide){
        localStorage.clear()
        location.href = '../../index.html'
    }
})