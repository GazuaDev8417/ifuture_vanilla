const userName = document.getElementById('name')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const password = document.getElementById('password')
const confirmPass = document.getElementById('confirmPass')
const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'



document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()

    const body = {
        name: userName.value,
        email: email.value,
        cpf: cpf.value,
        password: password.value
    }
    if(password.value !== confirmPass.value){
        alert('As senhas não correspondem')
    }else{
        fetch(`${url}/signup`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data=>{
            localStorage.setItem('token', data.token)
            location.href = '../address/index.html'
        }).catch(e=>{
            alert(e.message)
        })
    }
})