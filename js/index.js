//cuando se carga el documento actualiza el valor del carrito
document.addEventListener("DOMContentLoaded", () => {
  actualizarEtiquetaCarrito();
  agregarEventoAgregarCarrito();
});

//mostrar los productos en la seccion principal cuando clickeo en boton "productos"
const productosRef = document.getElementById("productos-ref");
productosRef.addEventListener("click", () => {
  //arma el html para mostrar los productos
  let productosDisponibles = ` 
      <div class="mostrar-productos">`;
  for (let i = 0; i < productos.length; i++) {
    productosDisponibles =
      productosDisponibles +
      `
    <div class="producto">
        <div class="img_producto">
            <img src=${productos[i].imagen} alt=${productos[i].nombre} />
        </div>
        <div class="info_producto">
            <h4>${productos[i].nombre}</h4>
            <h5>$${productos[i].precio}</h5>
            <button class="agregar-carrito" data-id=${productos[i].codigo}>Añadir al carrito</button>
        </div>
    </div>
    `;
  }
  productosDisponibles =
    productosDisponibles +
    `</div>
    `;
  //los reemplaza en seccion principal
  const contenedorProductos = document.getElementById("seccion-principal");
  contenedorProductos.innerHTML = productosDisponibles;
  agregarEventoAgregarCarrito()
  
});

//agrega el producto al carrito cuando se hace click en "añadir al carrito"
function agregarProducto(event) {
  var codigo = event.target.getAttribute("data-id"); //obtengo el codigo a agregar
  var productoAgregado = productos.find((item) => item.codigo == codigo); //obtengo el producto a agregar
  var carrito = JSON.parse(localStorage.getItem("carrito")) || []; //obtiene el carrito guardado

  // Verifica si el producto ya está en el carrito
  const productoEnCarrito = carrito.find((item) => item.codigo == codigo);

  if (productoEnCarrito) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    productoEnCarrito.cantidad += 1;
  } else {
    // Si no está en el carrito, agrega un nuevo producto con cantidad inicial 1
    const producto = {
      codigo: productoAgregado.codigo,
      nombre: productoAgregado.nombre,
      precio: productoAgregado.precio,
      imagen: productoAgregado.imagen,
      cantidad: 1, // Inicializa la cantidad
    };
    carrito.push(producto);
  }
  alert("¡Producto agregado al carrito!");

  //guarda el carrito y actualiza etiqueta
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
  actualizarEtiquetaCarrito();
}

//actualiza el conteo del icono del carrito
function actualizarEtiquetaCarrito(){
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var cantAmostrar= 0;
  for (let i = 0; i < carrito.length; i++){
    cantAmostrar = cantAmostrar+carrito[i].cantidad;
  }
  document.querySelector(".badge").textContent = cantAmostrar;
}

function agregarEventoAgregarCarrito(){
  var botonesAgregar = document.getElementsByClassName("agregar-carrito");
  for (var i = 0; i < botonesAgregar.length; i++) {
    //recorre los botones
    botonesAgregar[i].addEventListener("click", agregarProducto); //agrega un evento al boton

  }
}


