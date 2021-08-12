const mystorage = window.localStorage

function login(){
    fetch('https://flask-eomp-jesse.herokuapp.com/auth', {
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
        if (data['description'] == "Invalid credentials"){
            alert("Username or password is incorrect. Please enter correct details")
        }else{
            console.log(data['access_token'])
            mystorage.setItem('jwt-token', data['access_token'])
            window.location.href = "./products.html"
        }
    });
}

function register(){
    document.querySelector('.signupcontainer').classList.toggle('active')
}


fetch('https://flask-eomp-jesse.herokuapp.com/viewcatalogue')
.then(response => response.json())
.then(data => {
    console.log(data)
    data['data'].forEach((product) => {
        document.querySelector('.productscontainer').innerHTML += `
        <div class='product'>
            <img src='${product[5]}' alt='product img'></img>
            <div class='productdesc'>
                <h2 class='productprice'>R${product[4]}</h2>
                <h3 class='productheading'>${product[1]}</h3>
                <h4 class='producttype'>${product[2]}</h4>
            </div>
        </div>` 
    });
})

function addproduct(){
    document.querySelector('.addprocontainer').classList.toggle('active')
}

function previewFile() {
    const image = document.querySelector('.imageup');
    const file = document.querySelector('#aimage').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      image.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

function addtocatalogue(){
    // console.log({
    //     "product_id": document.getElementById("aid").value,
    //         "product_name": document.getElementById("aname").value,
    //         "product_type": document.getElementById("atype").value,
    //         "product_quantity": document.getElementById("aquantity").value,
    //         "product_price": document.getElementById("aprice").value,
    //         "product_image": document.getElementById("aimage").files[0],}
    // )
    fetch(`https://flask-eomp-jesse.herokuapp.com/addtocatalogue/`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `jwt ${mystorage.getItem('jwt-token')}`
        },
        body: JSON.stringify({
            "product_id": document.getElementById("aid").value,
            "product_name": document.getElementById("aname").value,
            "product_type": document.getElementById("atype").value,
            "product_quantity": document.getElementById("aquantity").value,
            "product_price": document.getElementById("aprice").value,
            "product_image": document.querySelector('.imageup').src,
        }),
    }).then(response => response.json).then(data => {
        console.log(data);
        console.log('success')})
}
