const mystorage = window.localStorage

let productid
let cart = []

fetch('https://murmuring-sands-24102.herokuapp.com/show-Vehicle')
.then(response => response.json())
.then(data => {
    console.log(data)
    data['data'].forEach((product) => {
        document.querySelector('.productscontainer').innerHTML += `
        <div class='product' id="${product[0]}">
            <img src='${product[5]}' alt='product img'></img>
            <div class='productdesc'>
                <h2 class='productprice'>R${product[4]}</h2>
                <h3 class='productheading'>${product[1]}</h3>
                <h4 class='producttype'>${product[2]}</h4>
            </div>
            <div class='addtocartcontainer'>
                <input class='cartquantity' type='number' value='1'>
                <div class='${product[0]}' onclick="addtocart"><span>Add to Cart</span></div>
            </div>
        </div>`;
        let addtocartbtns = document.querySelectorAll('.addtocartcontainer div')
        .forEach(button => button.addEventListener('click', addtocart))
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
    fetch(`https://murmuring-sands-24102.herokuapp.com/addtocatalogue/`, {
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

let tohome = document.getElementById('Home').addEventListener('click', redirectTo)
let toprofile = document.getElementById('View-Profile').addEventListener('click', redirectTo)
let tocart = document.getElementById('View-Cart').addEventListener('click', redirectTo)

function redirectTo (e) {
    if (e.target.id == 'Home'){
        window.location.href = './products.html'
    }if(e.target.id == 'View-Profile'){
        window.location.href = './profile.html'
    }if (e.target.id == 'View-Cart') {
        window.location.href = './cart.html'
    }
}

if (mystorage["cart"]) {
    cart = JSON.parse(mystorage["cart"]);
  }

// function addtocart(e){
    // let quantity = e.target.parentNode.querySelector('.cartquantity').value
    // let object = {}
    // productid = e.target.classList[0]
    // console.log(productid)
    // fetch(`https://murmuring-sands-24102.herokuapp.com/select_item/${productid}`, {
        // headers: {
            // 'Authorization': `jwt ${mystorage.getItem('jwt-token')}`
        // }
    // })
    // .then(response => response.json())
    // .then(data => {
        // console.log(data);
        // object['image'] = data['data'][0][5];
        // object['name'] = data['data'][0][1];
        // object['quantity'] = parseInt(quantity);
        // object['totalprice'] = parseInt(quantity) * parseInt(data['data'][0][4]);
        // console.log(object);
        // for (let item in cart){
            // console.log(item)
            // if (object['name'] == cart[item]['name']){
                // cart[item]['quantity'] += object['quantity'];
                // cart[item]['totalprice'] += object['totalprice'];
                // console.log(cart)
                // mystorage.setItem('cart', JSON.stringify(cart))
                // alert('Cart item updated')
                // return
            // };
        // }    
        // cart = cart.concat(object)
        // console.log(cart)
        // mystorage.setItem('cart', JSON.stringify(cart))
        // alert('Item added to cart successfully')
    // })
// }
