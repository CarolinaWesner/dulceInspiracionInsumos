//carrito
document.addEventListener("DOMContentLoaded", function () {
  cargarCarrito();
});

// Vaciar carrito
document
  .getElementById("vaciar-carrito")
  .addEventListener("click", function () {
    localStorage.removeItem("carrito");
    cargarCarrito();
    actualizarEtiquetaCarrito();
    mensajeCarritoVacio();
  });

//muestra los productos del carrito por pantalla
function cargarCarrito() {
  var listaCarrito = document.getElementById("productos-carrito");
  let listaProductos = `<tr>
        <th>PRODUCTO</th>
        <th>PRECIO</th>
        <th>CANTIDAD</th>
        <th>SUBTOTAL</th>
        <th></th>
      </tr>`;
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  for (var i = 0; i < carrito.length; i++) {
    var producto = carrito[i];
    
    listaProductos= listaProductos +`
    <tr>
      <td>${producto.nombre}</td>
      <td>$${" "+producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td>$${" "+producto.precio * producto.cantidad}</td>
      <td><button class="btn-eliminar" prod-id=${producto.codigo}>
        <i class="fas fa-trash-alt"></i>
      </button</td>
    <tr>`
  }
  listaCarrito.innerHTML=listaProductos;

  //agregar evento boton eliminar
  agregarEventoBotonEliminar();

  //armar total
  var totalCarrito = document.getElementById("totalCarrito");
  var h3 = document.getElementById("total");
  h3.innerText = "Total: $" + actualizarTotal(carrito);
  totalCarrito.appendChild(h3);

  if(carrito.length == 0){
    mensajeCarritoVacio();
  }
}

function actualizarTotal(carrito) {
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  return total;
}

//mensaje de carrito vacio cuando no hay productos agregados
function mensajeCarritoVacio(){
  const seccionCarrito = document.getElementById("seccion-principal");
  seccionCarrito.innerHTML= `<h2 id="msj-vacio">Tu carrito está vacío!</h2> 
  <button onclick="window.history.back()" id="btn-volver" >Volver</button>`;
}

//eliminar un producto del carrito
function eliminarProducto(event) {
  var boton = event.target.closest(".btn-eliminar");
  var codigoProd = boton.getAttribute("prod-id"); // Obtengo el código del producto

  actualizarCantidad(codigoProd, 1);
  alert("¡Producto eliminado!");

  actualizarEtiquetaCarrito();
  cargarCarrito();
}

//agregar evento eliminarProducto a botones de eliminar
function agregarEventoBotonEliminar(){
  var botonesEliminar = document.getElementsByClassName("btn-eliminar");
  for (var i = 0; i < botonesEliminar.length; i++) {
    //recorre los botones
    botonesEliminar[i].addEventListener("click", eliminarProducto); //agrega un evento al boton

  }
}

function actualizarCantidad(codigoProducto, cantidadADisminuir) {
  // Obtener el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito"));

  // Encontrar el producto en el carrito
  const productoAEliminar = carrito.find((item) => item.codigo == codigoProducto);

  // Actualizar la cantidad
  productoAEliminar.cantidad -= cantidadADisminuir;

  // Eliminar el producto si la cantidad es 0 o menor
  if (productoAEliminar.cantidad <= 0) {
    carrito = carrito.filter((item) => item.codigo != codigoProducto); 
  }
  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  console.log(carrito);
}

