const street = document.getElementById('street')
const number = document.getElementById('number')
const neighbourhood = document.getElementById('neighborhood')
const city = document.getElementById('city')
const state = document.getElementById('state')
const complement = document.getElementById('complement')
const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'



document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()

    const body = {
        street: street.value,
        number: number.value,
        neighbourhood: neighbourhood.value,
        city: city.value,
        state: state.value,
        complement: complement.value
    }
    fetch(`${url}/address`, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            auth: localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data=>{
        localStorage.setItem('token', data.token)
        alert('Endereço cadastrado')
        location.href = '../feed/index.html'
    }).catch(e=>{
        alert(e.message)
    })
})