let vehicles = [];
let cart = [];
console.log(cart);

// Get the modal
var modal = document.getElementById("id01");
var modal = document.getElementById("id02");
var modal = document.getElementById("id03");
var modal = document.getElementById("id04");
var modal = document.getElementById("id05");

fetch("https://murmuring-sands-24102.herokuapp.com/show-Vehicle")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    dealership(data);
    vehicles = data;
    dealership(vehicles);
  });

function dealership(vehicles) {
  let vehicleContainer = document.querySelector(".vehicle-container");
  vehicleContainer.innerHTML = "";
  vehicles.data.forEach((car) => {
    vehicleContainer.innerHTML += `
    
    <div class = "vehicle">
    <div class="card">
    <div class="box-image">
    <div class="circle">
      <p id="car-id" class="vehicle-id">${car.id}</p>
      </div>
        <img src="${car.image_url}" class="vehicle-image size1">
        </div>
        <div class="box-content text-center">
        <h4 class="vehicle-name"> ${car.name}</h4>
        <p class="vehicle-brand">Brand:  ${car.brand}</p>
        <p class="vehicle-price">Price: R${car.price} </p>
        <p class="vehicle-type">Type: ${car.type}</p>
        <p class="vehicle-year">Year: ${car.year}</p>
        <button onclick="addToCart(${car.id})" class="purchase text-bold">PURCHASE</button>
        
        </div>
            
    </div>
    
    </div>

    `;
  });
  //* Add to cart functions*//
}
// function addToCart(id) {
//   let vehicle = vehicles.data.find((item) => {
//     return item.id == id;
//   });
//   console.log(vehicle);
//   cart.push(vehicle);
//   console.log(cart);
// }

// ------------------------------       --------------------------------

function searchVehicles() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);
  let foundVehicles = vehicles.data.filter((vehicles) =>
    vehicles.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(foundVehicles);
  let vehicleContainer = document.querySelector(".vehicle-container");
  vehicleContainer.innerHTML = "";
  foundVehicles.forEach((car) => {
    console.log(car);
    vehicleContainer.innerHTML += `
    
    <div class = "vehicle">
    <div class="card">
    <div class="box-image">
    <div class="circle">
      <p id="car-id" class="vehicle-id">${car.id}</p>
      </div>
        <img src="${car.image_url}" class="vehicle-image size1">
        </div>
        <div class="box-content text-center">
        <h4 class="vehicle-name"> ${car.name}</h4>
        <p class="vehicle-brand">Brand:  ${car.brand}</p>
        <p class="vehicle-price">Price: R${car.price} </p>
        <p class="vehicle-type">Type: ${car.type}</p>
        <p class="vehicle-year">Year: ${car.year}</p>
        <button onclick="addToCart(${car.id})" class="addtocart text-bold">PURCHASE</button>
        
        </div>
            
    </div>
    
    </div>

    `;
  });
}
// ----------------------- -------------------------
/* ADD TO CART functions */
/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addToCart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* ADD TO CART functions */

function addToCart(elem) {
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    //cycles siblings for product info near the add button
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "name") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    var product = {
        productname : getproductName,
        price : getprice
    };
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */
    
    if(!sessionStorage.getItem('cart')){
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculate Cart Total */
function updateCartTotal(){
    //init
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++){
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            //get property value of price
            price = parseFloat(x.price.split('R')[1]);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* User Manually empty cart */
function emptyCart() {
    //remove cart session storage object & refresh cart totals
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      //clear message and remove class style
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}