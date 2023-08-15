const body = document.querySelector('body')

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault()

    const form = new FormData(event.target)

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: form.get('username'),
            password: form.get('password'),
        }),
    }

    const response = await fetch('http://localhost:3000/users/register', options)
    const data = await response.json()

    if (response.status == 201) {
        window.location.assign('login.html')
    } else {
        const para = body.appendChild(document.createElement('p'))
        para.textContent = data.error
    }
})
