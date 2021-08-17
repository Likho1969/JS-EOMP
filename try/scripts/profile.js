const mystorage = window.localStorage
let useremail

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

let username = mystorage.getItem('username')

fetch(`https://murmuring-sands-24102.herokuapp.com/user-profile/6/${username}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    if (data['data'] == ''){
        alert('Please login first before viewing profile page')
    }else{
        data['data'].forEach((detail) => {
            document.querySelector('.profile').innerHTML += `
            <div class='email'>
                <span>Email Address</span>
                <span class='emailval'>${detail[0]}</span>
            </div>
            <div class='firstname'>
                <span>First Name</span>
                <span>${detail[1]}</span>
            </div>
            <div class='lastname'>
                <span>Last Name</span>
                <span>${detail[2]}</span>
            </div>
            <div class='address'>
                <span>Address</span>
                <span>${detail[3]}</span>
            </div>
            <div class='username'>
                <span>Username</span>
                <span>${detail[4]}</span>
            </div>
            ` ;
            document.getElementById('efirstn').value = detail[1];
            document.getElementById('elastn').value = detail[2];
            document.getElementById('eaddress').value = detail[3];
            document.getElementById('eusername').value = detail[4];
            document.getElementById('epassword').value = detail[5];
            useremail = detail[0];

            fetch(`https://murmuring-sands-24102.herokuapp.com/myproducts/${detail[0]}/`, {
                method: "get",
                headers: {
                    'Authorization' : `jwt ${mystorage.getItem('jwt-token')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data['data'] == ''){
                    document.querySelector('.myproducts').innerHTML = `<div class='noitems'> You have not added any products </div>`
                }else{
                    data['data'].forEach((product) => {
                        document.querySelector('.myproducts').innerHTML += `
                        <div class='product ${product[0]}'>
                            <img src='${product[5]}' alt='product img'></img>
                            <div class='productdesc'>
                                <h2 class='productprice'>R${product[4]}</h2>
                                <h3 class='productheading'>${product[1]}</h3>
                                <h4 class='producttype'>${product[2]}</h4>
                            </div>
                            <div class="edt-delcontainer">
                                <div class="editbutton ${product[0]}">
                                    <span>Edit Item</span>
                                </div>
                                <div class="delbutton ${product[0]}">
                                    <span>Delete Item</span>
                                </div>
                            </div>
                        </div>`  ;
                        editeventadd()
                        deleteeventadd()
                    })
                }
            })
        });
    }
})

function edituserup(){
    document.querySelector('.editusermodal').classList.toggle('active')
    console.log(useremail)
}

function editeventadd(){
    let edititembtns = document.querySelectorAll('.editbutton')
    console.log(edititembtns)
    for (let button of edititembtns){
        console.log(button)
        button.addEventListener('click', edititemup)
    }
}

function deleteeventadd(){
    let delitembtns = document.querySelectorAll('.delbutton')
    console.log(delitembtns)
    for (let button of delitembtns){
        console.log(button)
        button.addEventListener('click', deleteitemup)
    }
}

// let productid

// function edititemup(e){
    // document.querySelector('.edititemmodal').classList.toggle('active');
    // productid = e.target.classList[1];

    // fetch(`https://murmuring-sands-24102.herokuapp.com/select_item/${productid}`, {
        // headers: {
            // 'Authorization': `jwt ${mystorage.getItem('jwt-token')}`
        // }
    // })
    // .then(response => response.json())
    // .then(data => {
        // console.log(data)
        // document.querySelector('#iproductid').value = data['data'][0][0]
        // document.querySelector('#iproductname').value = data['data'][0][1]
        // document.querySelector('#iproducttype').value = data['data'][0][2]
        // document.querySelector('#iproductquantity').value = data['data'][0][3]
        // document.querySelector('#iproductprice').value = data['data'][0][4]
    // })
// }

function deleteitemup(e){
    document.querySelector('.deleteitemmodal').classList.toggle('active')
    productid = e.target.classList[1];
    console.log(productid)
}



// function edituser(){
    // fetch(`https://js-backend.herokuapp.com/edit-user/${useremail}/`, {
        // method: 'PUT',
        // headers: {
            // 'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${mystorage.getItem('jwt-token')}`
        // },
        // body: JSON.stringify({
            // "first_name":document.getElementById('efirstn').value,
            // "last_name":document.getElementById('elastn').value,
            // "address":document.getElementById('eaddress').value,
            // "username":document.getElementById('eusername').value,
            // "password":document.getElementById('epassword').value,
        // }),
    // }).then(response => response.json).then(data => {
        // console.log(data);
        // console.log('success')})
// }

function edititem() {
    let productimage
    if ((document.querySelector('.previewimage').src).includes('127.0.0.1') == true){
        productimage = ''
    }else{
        productimage = document.querySelector('.previewimage').src
    }
    fetch(`https://murmuring-sands-24102.herokuapp.com/edit-car/${productid}/`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `jwt ${mystorage.getItem('jwt-token')}`
        },
        body: JSON.stringify({
            "product_id": document.querySelector('#iproductid').value,
            "product_name": document.querySelector('#iproductname').value,
            "product_type": document.querySelector('#iproducttype').value,
            "product_quantity": document.querySelector('#iproductquantity').value,
            "product_price": document.querySelector('#iproductprice').value,
            "email": document.querySelector('.emailval').innerHTML,
            "product_image": productimage,
        }),
    }).then(response => response.json).then(data => {
        console.log(data);
        console.log('success')})
}

function deleteitem(){
    fetch(`https://murmuring-sands-24102.herokuapp.com/delete-car/12${productid}`, {
        headers: {
            'Authorization' : `jwt ${mystorage.getItem('jwt-token')}`
        },

    }).then(response => response.json).then(data => {
        console.log(data);
        console.log('success')})
}