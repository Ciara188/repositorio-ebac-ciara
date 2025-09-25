console.log("hola");

//Seleccionar elementos por su id
const title = document.getElementById("products");
//console.log(title);

//Seleccionar elementos por su clase
const imagen = document.getElementsByClassName("products__img img-fluid");
//console.log(imagen[0]);

//Seleccionar elementos por su nombre de etiqueta
const tags = document.getElementsByTagName("section");
//console.log(tags);

//Seleccionar elementos por su selectr css, solo selecciona 1 elemento, si queremos seleccionar todos agregamos el All: querySelectorAll
const elem = document.querySelector(".products__img");
//console.log(elem);

//Crear elementos
const parent = document.querySelector(".row");
const newElem = document.createElement("div");
newElem.setAttribute("class","new");
parent.append(newElem);
//console.log(newElem);

//Attributes
const logo = document.querySelector(".header__logo");
//logo.setAttribute("scr","img/postre1.jpg") //cambiar el valor de un atributo a otro
console.log(logo.getAttribute("src")); //que te traiga el valor que tiene ese atributo
console.log(logo.hasAttribute("src")); //saber si tiene ese atributo (true/false)
//logo.removeAttribute("src"); // quitar atributo


if (logo.hasAttribute("src")) {
    //alert('tiene src!')    
}

//CSS CLASSES
//Modificar clases
//classlist //propiedad que nos va a devolver una coleccion de metodos
// seleccionar deacuerdo a su posicion y no tienen clases

const parent2 = document.querySelector(".row");
const parent3 = parent2.children[0];
const price = parent3.querySelector("h3");

price.classList.add("red");
price.classList.replace("red","blue");
//price.classList.remove("red");

//Modificar texto
const button = document.getElementsByTagName("button");
console.log(button[0].innerText);
for (let i = 0; i < button.length; i++) {
  button[i].innerText = "Comprar!";
}

//Modificar style
console.log(button[0].style);
//button[0].style.backgroundColor = "pink";

//EVENTOS
//target.addEventListener(event, function);
const elemButton = button[0];
elemButton.addEventListener('click', () => {
    elemButton.classList.toggle("toggle");
})

const iconRemove = document.querySelectorAll(".delete-item");
console.log(iconRemove);

iconRemove.forEach(elem => {
    elem.addEventListener("click", () =>{
        const elemParent = elem.parentElement.parentElement;
        elemParent.remove();
    })
});

const cartIcon = document.querySelector(".header__user .header__icon:first-child");
//const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", ()=>{
    cart.classList.toggle("show");
})

const menuIcon = document.querySelector(".header__logo");
const menu = document.querySelector(".menu");
const menuCloseIcon = document.querySelector(".menu .closeMenu");

menuIcon.addEventListener("click", () => {
  menu.classList.add("show");
  menu.classList.remove("hide");
});

menuCloseIcon.addEventListener("click", () => {
  menu.classList.add("hide");
  menu.classList.remove("show");
});


const products = document.querySelectorAll(".mouse");


products.forEach(product => {
    product.addEventListener("mouseenter", () => {
    const img = document.createElement("img");
    img.src = "img/fill_cart.png"; 
    img.alt = "Imagen extra";
    img.classList.add("hover-image");

    // evitar que se duplique
    if (!product.querySelector(".hover-image")) {
        product.appendChild(img);
    }

    product.style.opacity = ".5";
    });

    product.addEventListener("mouseleave", () => {
    const img = product.querySelector(".hover-image");
    if (img) {
        img.remove();
    }
    product.style.opacity = "1";
    });
});

//AGREGAR PRODUCTOS AL CARRITO
// Seleccionar elementos del header y carrito
const cartIconContainer = document.querySelector(".header__user");
//const cartIcon = document.querySelector(".header__user .header__icon:first-child");
const cartSection = document.querySelector(".cart");

let productCount = 0;

// Seleccionar todos los botones 
const buyButtons = document.querySelectorAll(".products__btn");

buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    productCount++;

    // Cambiar icono del carrito
    cartIcon.src = "./img/fill_cart.png";

    // Crear badge 
    let badge = cartIconContainer.querySelector(".cart-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.classList.add("cart-badge");
      cartIconContainer.appendChild(badge);
    }
    badge.innerText = productCount;

    // Agregar producto al carrito
    const productDiv = button.closest(".mouse"); // el contenedor del producto
    const productImg = productDiv.querySelector(".products__img").src;
    const productTitle = productDiv.querySelector(".products__tittle").innerText;
    const productCost = productDiv.querySelector(".products__cost").innerText;

    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
        
        <img src="${productImg}" alt="${productTitle}" class="products__img img-fluid" />
        <p class="products__tittle">${productTitle}</p>
        <h3 class="products__cost">${productCost}</h3>
        <i><img src="img/basura.png" alt="Icono Quitar" class="delete-item"></i>
       
    `;

    cartSection.appendChild(cartItem);

    // Agregar evento de eliminar al nuevo item
    const deleteIcon = cartItem.querySelector(".delete-item");
    deleteIcon.addEventListener("click", () => {
      cartItem.remove();
      productCount--;
      badge.innerText = productCount;

      // Si no hay productos, opcionalmente volver al icono vacío
      if (productCount === 0) {
        cartIcon.src = "./img/shopping-cart.svg";
        badge.remove();
      }
    });
  });
});

