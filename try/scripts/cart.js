const mystorage = window.localStorage

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

let cartitems = JSON.parse(mystorage.getItem('cart'))

function rendercart(){
    cartitems.forEach(item => {
        console.log(item)
        document.querySelector('.cartitemcontainer').innerHTML += `
            <div class='item'>
                <img src='${item['image']}' alt='product img'></img>
                <div class='itemdetails'>
                    <div class='itemname'>
                        <span>
                            Item Name
                        </span>
                        <span>
                            ${item['name']}
                        </span>
                    </div>
                    <div class='itemquantity'>
                        <span>
                            Item Quantity
                        </span>
                        <span>
                            x${item['quantity']}
                        </span>
                    </div>
                    <div class='itemtotalprice'>
                        <span>
                            Total Cost
                        </span>
                        <span>
                            R${item['totalprice']}
                        </span>
                    </div>
                    <div>
                        <i class="fas fa-times removeicon"></i>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.removeicon').addEventListener('click', removeFromCart(item['name']));
    });
    calctotal()
}

rendercart()

function calctotal(){
    let totalcost = 0
    for (let i of cartitems){
        totalcost += i['totalprice']
    }
    console.log(totalcost)
    document.querySelector('.total').innerHTML = `
        <div class='totalcontainer'>
            <div class='totalcost'>
                Total Cost: <span> R${totalcost} </span>
            </div>
            <div class='checkout'>
                <span>Checkout</span>
            </div>
        </div>
    `
}

// function removeFromCart(name){
//     let itemname = name
//     for (let item in cartitems){
//         if (itemname == cartitems[item]['name']){
//             cartitems.splice(item, 1);
//             console.log(cartitems)
//             mystorage['cart'] = JSON.stringify(cartitems)
//             rendercart()
//         }
//     }
// }