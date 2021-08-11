const mystorage = window.localStorage

function login(){
    fetch('https://murmuring-sands-24102.herokuapp.com/user-registration', {
    method: "POST",
    body: JSON.stringify({
        'username': document.getElementById("lusername").value,
        'password': document.getElementById("lpassword").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    }).then(response => response.json()).then(data => {
        console.log(data)
        console.log(data['access_token'])
        mystorage.setItem('jwt-token', data['access_token'])
    });
}

function register(){
    document.querySelector('.signupcontainer').classList.toggle('active')
}

fetch('https://murmuring-sands-24102.herokuapp.com/')
.then(response => response.json())
.then(data => {
    console.log(data)
})