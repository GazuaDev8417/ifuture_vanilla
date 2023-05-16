const url = 'https://us-central1-missao-newton.cloudfunctions.net/fourFoodB'
const edit = document.getElementById('edit')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')


const getProfile = ()=>{
    fetch(`${url}/profile`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    }).then(res => res.json()).then(data=>{
        const user = data.user
        console.log(user)

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
            <img class='edit' src="../../img/edit.png" alt="edit">
        `
    }).catch(e=>{
        alert(e.message)
        console.log(e.message)
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
        console.log(e.message)
    })
})