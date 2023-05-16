const email = document.getElementById('email')
const password = document.getElementById('password')
const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'



window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(token){
        location.href = './pages/feed/index.html'
    }
})


form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const body = {
        email: email.value,
        password: password.value
    }    

    fetch(`${url}/login`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data=>{
        localStorage.setItem('token', data.token)
        location.href = './pages/feed/index.html'
    }).catch(e=>{
        alert(e.message)
    })
})