const mystorage = window.localStorage

function login(){
    fetch('https://murmuring-sands-24102.herokuapp.com/auth', {
    method: "POST",
    body: JSON.stringify({
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    }).then(response => response.json()).then(data => {
        console.log(data)
        if (data['description'] == "Invalid credentials"){
            alert("Username or password is incorrect. Please enter correct details")
        }else{
            console.log(data['access_token'])
            mystorage.setItem('jwt-token', data['access_token'])
            mystorage.setItem('username', document.getElementById('username').value)
            window.location.href = "./cars.html"
        }
    });
}

function register(){
    document.querySelector('.signupcontainer').classList.toggle('active')
}