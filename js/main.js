$(document).ready(function () {


  /*AJAX*/
  const URLGET = "/product.json"

  $("main").append('<img id="img1" value="Show Images" src="img/Banner01.jpg"></img>');
  $("main").append('<input type="text" class="contact__input__new" id="email" placeholder="Correo electrónico"required>');
  $("main").append('<input type="submit"class="contact__submit__new" id ="submit" value="SUSCRIBITE">');

  $("#submit").click(() => {

    $("#img1").hide(200)
    $(".contact__input__new").hide(200)
    $(".contact__submit__new").hide(200)
    $.get(URLGET, function (respuesta, estado) {
      if (estado === "success") {
        let misDatos = respuesta;
        for (const dato of misDatos) {

          $("main").append(`<img id="imgJson" src =${dato.url}></img>`)
          $("main").append(`<p class="valido_text"> Válido hasta el ${dato.valido}</p>`)

        }


      }

    });
  });
})

/*Constructor y Productos*/

function Producto(img, id, nombre, precio, disponible, cantidad) {
  this.img = img;
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.disponible = disponible;
  this.envio = (this.precio > 500) ? 'el envío es gratuito' : 'el costo del envío es de $300';
  this.vender = (this.disponible) ? 'Producto disponible' : 'Producto fuera de stock';
  this.cantidad = cantidad;
}

const producto1 = new Producto("img/Producto01.jpg", 1, "Poster", 300, true, 1)
const producto2 = new Producto("img/Producto02.jpg", 2, "Taza", 600, true, 1)
const producto3 = new Producto("img/Producto03.jpg", 3, "Remera", 700, true, 1)
const producto4 = new Producto("img/Producto04.jpg", 4, "Cuaderno", 400, true, 1)

/*Variables*/

let stockProductos = [producto1, producto2, producto3, producto4];
let carrito = [];
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const contadorCarrito = document.getElementById('contador-carrito')
const precioTotal = document.getElementById('precioTotal')

/*Productos*/

mostrarProductos(stockProductos);

function mostrarProductos(array) {
  contenedorProductos.innerHTML = ''
  array.forEach((producto) => {
    let div = document.createElement('div')
    div.classList.add('container')
    div.innerHTML += `
                <img class="image" src=${producto.img} alt="">
                <p class = "textProduct">${producto.nombre} $${producto.precio}</p>
                <div class= "middle"> <button id="boton${producto.id}" class="btnAñadir">+</button> </div>
               
    `
    contenedorProductos.appendChild(div)

    let boton = document.getElementById(`boton${producto.id}`)

    boton.addEventListener('click', () => {
      añadirAlCarrito(producto.id)
    })
  })
}

/*Carrito*/

function añadirAlCarrito(id) {
  let validar = carrito.some(x => x.id == id)
  if (validar) {
    let count = document.getElementById(`cantidad${id}`)
    carrito.map(x => {
      if (x.id == id)
        count.innerText = `${x.cantidad +=1}`
      actualizarCarrito()
    })
  } else {
    let productoAñadir = stockProductos.filter(x => x.id == id)[0]
    carrito.push(productoAñadir)
    console.log(carrito)
    actualizarCarrito()


    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML += `
        <p class="carrito-text">${productoAñadir.nombre}</p>
        <p class="carrito-text carrito-precio"> $${productoAñadir.precio}</p>
        <p class ="carrito-text carrito-cant" id="cantidad${productoAñadir.id}"> ${productoAñadir.cantidad}</p>
        <button id="eliminar${productoAñadir.id}" class="boton-eliminar"><i class="fa fa-trash"></i></button>
      `
    contenedorCarrito.appendChild(div)
    let botonEliminar = document.getElementById(`eliminar${productoAñadir.id}`)

    botonEliminar.addEventListener('click', () => {
      botonEliminar.parentElement.remove()
      carrito = carrito.filter((x) => x.id != productoAñadir.id)
      actualizarCarrito()
      console.log(carrito)
    })
  }
}

/*Guardar Carrito*/

function actualizarCarrito() {
  contadorCarrito.innerText = carrito.reduce((acc, x) => acc + x.cantidad, 0)
  localStorage.setItem('carrito', JSON.stringify(carrito))
  precioTotal.innerText = carrito.reduce((acc, x) => acc + (x.precio * x.cantidad), 0)
}


function revisarLocal() {
  let carritoLocal = JSON.parse(localStorage.getItem('carrito'))
  if (carritoLocal) {
    carritoLocal.forEach((x) => añadirAlCarrito(x.id))
  }
}

revisarLocal()

/*Ventana Modal*/

const carritoAbrir = document.getElementById('btn-carrito');
const ventanaModal = document.getElementsByClassName('modal-ventana')[0]
const carritoCerrar = document.getElementById('carritoCerrar');
const btnVolver = document.getElementById('btnVolver');

carritoAbrir.addEventListener('click', () => {
  ventanaModal.classList.toggle('modal-active')
})

carritoCerrar.addEventListener('click', () => {
  ventanaModal.classList.toggle('modal-active')
})

btnVolver.addEventListener('click', () => {
  ventanaModal.classList.toggle('modal-active')
})